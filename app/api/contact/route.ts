import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.CORPORATE_EMAIL,
    subject: subject,
    text: `Message from: ${name}\n\n${message}`,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send message.' }, { status: 500 });
  }
}
