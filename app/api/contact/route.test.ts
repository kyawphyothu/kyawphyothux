import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "./route";

// Avoid sending real emails; each test that needs success will set env and use this mock
const sendMailMock = vi.fn().mockResolvedValue({ messageId: "test-id" });
vi.mock("nodemailer", () => ({
  default: {
    createTransport: () => ({
      sendMail: sendMailMock,
    }),
  },
}));

/** Build a Request for the contact API. Use a unique IP per test to avoid rate limiting. */
function contactRequest(body: Record<string, unknown>, ip = "127.0.0.1") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

/** Valid payload with _formLoadedAt in the past so it passes the timing check. */
function validPayload(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    name: "Jane Doe",
    email: "jane@example.com",
    subject: "Hello",
    message: "Test message",
    _honeypot: "",
    _formLoadedAt: Date.now() - 10_000,
    ...overrides,
  };
}

describe("POST /api/contact", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns 400 when required fields are missing", async () => {
    const res = await POST(
      contactRequest(
        { _formLoadedAt: Date.now() - 10_000 },
        "1.1.1.1"
      )
    );
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Missing required fields");
  });

  it("returns 400 for invalid email", async () => {
    const res = await POST(
      contactRequest(validPayload({ email: "not-an-email" }), "1.1.1.2")
    );
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Invalid email address");
  });

  it("returns 400 when fields exceed max length", async () => {
    const res = await POST(
      contactRequest(
        validPayload({
          name: "a".repeat(201),
          email: "a@b.co",
          subject: "s",
          message: "m",
        }),
        "1.1.1.3"
      )
    );
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("exceed maximum length");
  });

  it("returns 200 and pretends success when honeypot is filled (bot)", async () => {
    const res = await POST(
      contactRequest(validPayload({ _honeypot: "filled" }), "1.1.1.4")
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it("returns 200 and pretends success when form submitted too fast", async () => {
    const res = await POST(
      contactRequest({
        ...validPayload(),
        _formLoadedAt: Date.now(), // just now
      }, "1.1.1.5")
    );
    expect(res.status).toBe(200);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it("returns 503 when email env is not configured", async () => {
    delete process.env.GMAIL_USER;
    delete process.env.GMAIL_APP_PASSWORD;
    delete process.env.GMAIL_USER_RECEIVER;

    const res = await POST(contactRequest(validPayload(), "1.1.1.6"));
    expect(res.status).toBe(503);
    const data = await res.json();
    expect(data.error).toContain("not configured");
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it("returns 200 and sends email when env is set and payload valid", async () => {
    process.env.GMAIL_USER = "sender@gmail.com";
    process.env.GMAIL_APP_PASSWORD = "app-pass";
    process.env.GMAIL_USER_RECEIVER = "receiver@gmail.com";

    const res = await POST(contactRequest(validPayload(), "1.1.1.7"));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(sendMailMock).toHaveBeenCalledTimes(1);
    const [mailOptions] = sendMailMock.mock.calls[0];
    expect(mailOptions.to).toBe("receiver@gmail.com");
    expect(mailOptions.replyTo).toBe("jane@example.com");
    expect(mailOptions.subject).toContain("Hello");
    expect(mailOptions.html).toContain("Jane Doe");
    expect(mailOptions.html).not.toContain("<script>"); // escaped
  });

  it("escapes HTML in email body to prevent XSS", async () => {
    process.env.GMAIL_USER = "sender@gmail.com";
    process.env.GMAIL_APP_PASSWORD = "app-pass";
    process.env.GMAIL_USER_RECEIVER = "receiver@gmail.com";

    const res = await POST(
      contactRequest(
        validPayload({
          name: "<script>alert(1)</script>",
          message: "Hi <b>there</b>",
        }),
        "1.1.1.8"
      )
    );
    expect(res.status).toBe(200);
    const [mailOptions] = sendMailMock.mock.calls[0];
    expect(mailOptions.html).toContain("&lt;script&gt;");
    expect(mailOptions.html).not.toContain("<script>alert(1)</script>");
  });

  it("returns 429 when rate limit exceeded", async () => {
    process.env.GMAIL_USER = "sender@gmail.com";
    process.env.GMAIL_APP_PASSWORD = "app-pass";
    process.env.GMAIL_USER_RECEIVER = "receiver@gmail.com";

    const sameIp = "1.1.1.9";
    // Exceed limit (5 requests in same window)
    for (let i = 0; i < 6; i++) {
      const res = await POST(contactRequest(validPayload(), sameIp));
      if (i < 5) {
        expect(res.status).toBe(200);
      } else {
        expect(res.status).toBe(429);
        const data = await res.json();
        expect(data.error).toContain("Too many requests");
      }
    }
  });
});
