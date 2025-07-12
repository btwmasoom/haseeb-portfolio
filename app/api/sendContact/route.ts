import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT!),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email for user confirmation
  const userMailOptions = {
    from: `"Haseeb Asif" <${process.env.EMAIL_USER}>`,
    to: email,
    replyTo: "mymail@gmail.com",
    subject: "We received your message",
    text: `Thanks ${name}, we received your message.\nSubject: ${subject}\nMessage: ${message}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We've Received Your Message!</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6; margin: 0; padding: 0; color: #333333; }
    .email-container { max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07); }
    .header { background: linear-gradient(135deg, #7c3aed, #06b6d4); padding: 35px 25px; text-align: center; color: white; }
    .header h1 { margin: 0; font-size: 26px; font-weight: 600; }
    .content { padding: 30px 35px; line-height: 1.65; }
    .content h2 { color: #7c3aed; font-size: 22px; margin-top: 0; margin-bottom: 20px; }
    .content p { margin-bottom: 18px; font-size: 16px; color: #4A5568; }
    .message-details-card { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 10px; margin-bottom: 25px; border-left: 5px solid #06b6d4; }
    .message-details-card p { margin-bottom: 10px; font-size: 15px; }
    .message-quote { background-color: #f0f9ff; padding: 15px; border-left: 4px solid #06b6d4; font-style: italic; color: #0f172a; border-radius: 4px; font-size: 15px; }
    .response-time-info { padding: 18px; background-color: #eefcff; border: 1px solid #c1efff; border-radius: 8px; text-align: center; }
    .response-time-info p { font-size: 16px; color: #056a80; }
    .salutation p { margin-bottom: 5px; }
    .footer { background: #f9fafb; padding: 25px 30px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e5e7eb; }
    .footer a { color: #7c3aed; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header"><h1>Thanks for Reaching Out, ${name}!</h1></div>
    <div class="content">
      <h2>We've Received Your Message! 📬</h2>
      <p>Hello ${name},</p>
      <p>Thank you for contacting us. Here's a copy of your message:</p>
      <div class="message-details-card">
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <div class="message-quote">"${message}"</div>
      </div>
      <div class="response-time-info">
        <p>You can expect a response <strong>within 48 business hours</strong>.</p>
      </div>
      <div class="salutation">
        <p>We appreciate your patience!</p>
        <p>Best regards,<br><strong>Haseeb Asif</strong></p>
      </div>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} haseeb's portfolio. All rights reserved.</p>
      <p><a href="https://my-portfolio-haseeb-dev.vercel.app">Visit Our Website</a> | <a href="tel:03115620712">Contact Us</a></p>
    </div>
  </div>
</body>
</html>`
  };

  // Email for you (admin)
  const adminMailOptions = {
    from: `"Portfolio Bot" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `📩 New Message from ${name} (${email})`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br />${message}</p>
    `,
  };

  try {
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
