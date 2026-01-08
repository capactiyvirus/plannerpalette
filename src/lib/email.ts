// src/lib/email.ts
import nodemailer from 'nodemailer';

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface SendProductEmailParams {
  customerEmail: string;
  customerName: string;
  productTitle: string;
  downloadUrl: string;
}

export async function sendProductEmail({
  customerEmail,
  customerName,
  productTitle,
  downloadUrl,
}: SendProductEmailParams) {
  const mailOptions = {
    from: `Literary Haven <${process.env.GMAIL_USER}>`,
    to: customerEmail,
    subject: `Your Digital Product: ${productTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #2c3b3a 0%, #6e725a 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: #f9f6f0;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .button {
              display: inline-block;
              background: #6e725a;
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-family: 'Playfair Display', serif;">Literary Haven</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your purchase!</p>
          </div>

          <div class="content">
            <h2 style="color: #2c3b3a; margin-top: 0;">Hi ${customerName || 'there'}!</h2>

            <p>Your order has been confirmed and your digital product is ready for download.</p>

            <p><strong>Product:</strong> ${productTitle}</p>

            <div style="text-align: center;">
              <a href="${downloadUrl}" class="button">Download Your Product</a>
            </div>

            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              <strong>Note:</strong> This download link will remain active, so you can access your product anytime.
              We recommend saving this email for future reference.
            </p>

            <p style="margin-top: 30px;">
              If you have any questions or issues with your download, please don't hesitate to reach out.
            </p>

            <p>Happy writing!<br>
            <strong>The Literary Haven Team</strong></p>
          </div>

          <div class="footer">
            <p>This email was sent because you completed a purchase at Literary Haven.</p>
            <p>If you didn't make this purchase, please contact us immediately.</p>
          </div>
        </body>
      </html>
    `,
    text: `
Hi ${customerName || 'there'}!

Thank you for your purchase from Literary Haven!

Your digital product is ready for download:
Product: ${productTitle}
Download Link: ${downloadUrl}

This link will remain active so you can access your product anytime.

If you have any questions, please don't hesitate to reach out.

Happy writing!
The Literary Haven Team
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
