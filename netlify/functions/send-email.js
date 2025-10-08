// netlify/functions/send-email.js
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASS
      }
    });

    // Email to restaurant
    await transporter.sendMail({
      from: process.env.MY_EMAIL,
      to: process.env.MY_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `
    });

    // Auto-reply to customer
    await transporter.sendMail({
      from: process.env.MY_EMAIL,
      to: email,
      subject: 'Thank you for contacting Gastronomique',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">Thank you for your message!</h2>
          <p>Dear ${name},</p>
          <p>We've received your inquiry and will get back to you within 24 hours.</p>
          <p><strong>Your message:</strong><br>${message}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Gastronomique Restaurant</strong><br>
          123 Gourmet Avenue, Culinary District, NY 10001<br>
          Phone: +1 (555) 123-4567<br>
          Email: reservations@gastronomique.com</p>
          <p style="color: #888; font-size: 12px;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
};