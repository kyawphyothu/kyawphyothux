import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Minimum time (seconds) a human would need to fill the form; reject faster submissions
const MIN_SUBMIT_SECONDS = 3;

export async function POST(request: Request) {
  try {
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

    // Validate the input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Configure nodemailer with Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Use an app password, not your regular password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER_RECEIVER, // Send to your own email address
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
  <h2 style="color: #333;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
  <p><strong>Subject:</strong> ${subject}</p>
  <h3>Message:</h3>
  <p style="white-space: pre-wrap;">${message}</p>
</div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
