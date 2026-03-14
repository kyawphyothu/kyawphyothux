import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Minimum time (seconds) a human would need to fill the form; reject faster submissions
const MIN_SUBMIT_SECONDS = 3;

// Rate limit: max requests per window per IP
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

// Input limits (characters)
const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_SUBJECT = 500;
const MAX_MESSAGE = 10_000;

// In-memory rate limit store: IP -> { count, resetAt }
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

/** Escape string for safe use in HTML content (prevents XSS in email body). */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Get client IP from request headers (works behind proxies). Returns null if missing or empty/whitespace. */
function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip");
  if (real) {
    const trimmed = real.trim();
    if (trimmed) return trimmed;
  }
  return null;
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry) return false;
  if (now >= entry.resetAt) {
    rateLimitStore.delete(ip);
    return false;
  }
  return entry.count >= RATE_LIMIT_MAX;
}

function recordRequest(ip: string): void {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return;
  }
  if (now >= entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return;
  }
  entry.count++;
}

/** Basic email format check. */
function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length > MAX_EMAIL) return false;
  // Simple RFC-style check: local@domain
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(trimmed);
}

export async function POST(request: Request) {
  try {
    // Rate limit by IP (empty string from malformed headers is treated as unknown)
    const clientIp = getClientIp(request) ?? "unknown";
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, _honeypot, _formLoadedAt } = body;

    // Bot check 1: honeypot — hidden field must be empty (bots often fill all fields)
    if (_honeypot && String(_honeypot).trim() !== "") {
      return NextResponse.json({
        success: true,
        message: "Email sent successfully",
      });
    }

    // Bot check 2: form must be open for at least MIN_SUBMIT_SECONDS
    const loadedAt = typeof _formLoadedAt === "number" ? _formLoadedAt : 0;
    const now = Date.now();
    if (loadedAt <= 0 || now - loadedAt < MIN_SUBMIT_SECONDS * 1000) {
      return NextResponse.json({
        success: true,
        message: "Email sent successfully",
      });
    }

    // Validate presence and type
    const rawName = typeof name === "string" ? name.trim() : "";
    const rawEmail = typeof email === "string" ? email.trim() : "";
    const rawSubject = typeof subject === "string" ? subject.trim() : "";
    const rawMessage = typeof message === "string" ? message.trim() : "";

    if (!rawName || !rawEmail || !rawSubject || !rawMessage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!isValidEmail(rawEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (
      rawName.length > MAX_NAME ||
      rawEmail.length > MAX_EMAIL ||
      rawSubject.length > MAX_SUBJECT ||
      rawMessage.length > MAX_MESSAGE
    ) {
      return NextResponse.json(
        { error: "One or more fields exceed maximum length" },
        { status: 400 }
      );
    }

    // Env validation — fail with clear message if email is not configured
    const gmailUser = process.env.GMAIL_USER?.trim();
    const gmailPass = process.env.GMAIL_APP_PASSWORD?.trim();
    const gmailReceiver = process.env.GMAIL_USER_RECEIVER?.trim();

    if (!gmailUser || !gmailPass || !gmailReceiver) {
      console.error(
        "Contact API: Missing email config. Set GMAIL_USER, GMAIL_APP_PASSWORD, and GMAIL_USER_RECEIVER."
      );
      return NextResponse.json(
        { error: "Email service is not configured. Please try again later." },
        { status: 503 }
      );
    }

    // Sanitize for HTML email body (plain text version stays as-is for readability)
    const safeName = escapeHtml(rawName);
    const safeEmail = escapeHtml(rawEmail);
    const safeSubject = escapeHtml(rawSubject);
    const safeMessage = escapeHtml(rawMessage);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const mailOptions = {
      from: gmailUser,
      to: gmailReceiver,
      replyTo: rawEmail,
      subject: `Portfolio Contact: ${rawSubject.slice(0, 100)}`,
      text: `
Name: ${rawName}
Email: ${rawEmail}
Message: ${rawMessage}
      `.trim(),
      html: `
<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
  <h2 style="color: #333;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${safeName}</p>
  <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
  <p><strong>Subject:</strong> ${safeSubject}</p>
  <h3>Message:</h3>
  <p style="white-space: pre-wrap;">${safeMessage}</p>
</div>
      `.trim(),
    };

    await transporter.sendMail(mailOptions);

    recordRequest(clientIp);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
