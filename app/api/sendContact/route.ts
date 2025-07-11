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

  

  const mailOptions = {
    from: `"Sanidhya Mehra" <${process.env.EMAIL_USER}>`,
    to: email,
    replyTo: "mymail@gmail.com",
    subject: "We received your message",
    text: `Thanks ${name}, we received your message.\nSubject: ${subject}\nMessage: ${message}`,
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>We've Received Your Message!</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 0;
            color: #333333;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .email-container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
          }
          .header {
            background: linear-gradient(135deg, #7c3aed, #06b6d4);
            padding: 35px 25px;
            text-align: center;
            color: white;
          }
          .header img.logo {
            max-width: 150px;
            margin-bottom: 15px;
          }
          .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 600;
          }
          .content {
            padding: 30px 35px;
            line-height: 1.65;
          }
          .content h2 {
            color: #7c3aed;
            font-size: 22px;
            margin-top: 0;
            margin-bottom: 20px;
          }
          .content p {
            margin-bottom: 18px;
            font-size: 16px;
            color: #4A5568;
          }
          .message-details-card {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-top: 10px;
            margin-bottom: 25px;
            border-left: 5px solid #06b6d4;
          }
          .message-details-card p {
            margin-bottom: 10px;
            font-size: 15px;
          }
          .message-details-card p:last-child {
            margin-bottom: 0;
          }
          .message-details-card strong {
            color: #2D3748;
          }
          .message-quote {
            background-color: #f0f9ff;
            padding: 15px;
            border-left: 4px solid #06b6d4;
            font-style: italic;
            color: #0f172a;
            border-radius: 4px;
            margin-top: 5px;
            font-size: 15px;
            line-height: 1.7;
          }
          .response-time-info {
            padding: 18px;
            background-color: #eefcff;
            border: 1px solid #c1efff;
            border-radius: 8px;
            margin-top: 20px;
            margin-bottom: 25px;
            text-align: center;
          }
          .response-time-info p {
            margin:0;
            font-size: 16px;
            color: #056a80;
          }
          .response-time-info strong {
            color: #7c3aed;
          }
          .salutation p {
            margin-bottom: 5px;
          }
          .footer {
            background: #f9fafb;
            padding: 25px 30px;
            text-align: center;
            font-size: 13px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
          }
          .footer a {
            color: #7c3aed;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
          @media screen and (max-width: 600px) {
            .email-container { margin: 20px 15px; border-radius: 8px; }
            .content { padding: 25px 20px; }
            .header { padding: 30px 20px; }
            .header h1 { font-size: 24px; }
            .content h2 { font-size: 20px; }
            .content p { font-size: 15px; }
            .message-details-card { padding: 15px; }
            .message-quote { padding: 12px; font-size: 14px; }
            .response-time-info { padding: 15px; }
            .response-time-info p { font-size: 15px; }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Thanks for Reaching Out, ${name}!</h1>
          </div>
          <div class="content">
            <h2>We've Received Your Message! <span style="font-size: 20px;">📬</span></h2>
            <p>Hello ${name},</p>
            <p>Thank you for getting in touch with us. We confirm that your message has been successfully received, and our team is currently reviewing your inquiry.</p>
            <div class="message-details-card">
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Your message:</strong></p>
              <div class="message-quote">
                "${message}"
              </div>
            </div>
            <div class="response-time-info">
              <p>We value your query and are working to address it promptly. You can expect a response from our team <br><strong>within 48 business hours</strong>.</p>
            </div>
            <p>If you need to add more details or have further questions in the meantime, please don't hesitate to reply directly to this email..</p>
            <div class="salutation">
                <p>We appreciate your patience!</p>
                <p>Best regards,<br><strong>Sanidhya Mehra</strong></p>
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} sanidhya's portfolio. All rights reserved.</p>
            <p>
                <a href="https://sanidhyamehra.vercel.app">Visit Our Website</a> | 
                <a href="tel:8955465833">Contact Us</a>
            </p>
          </div>
        </div>
      </body>
    </html>
    `,
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    console.log(response);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
