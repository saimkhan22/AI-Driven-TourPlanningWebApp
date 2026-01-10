/**
 * Notification Service for SMS and Email
 * Sends tour confirmation messages to users
 */

import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password',
  },
});

// SMS Service (using Twilio or similar)
// For production, integrate with Twilio, MSG91, or local SMS gateway
async function sendSMS(phone: string, message: string) {
  try {
    // For demo purposes, we'll log the SMS
    // In production, integrate with actual SMS service
    console.log('📱 SMS Notification:');
    console.log(`To: ${phone}`);
    console.log(`Message: ${message}`);
    
    // Example Twilio integration (uncomment when configured):
    /*
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    */
    
    return { success: true, message: 'SMS sent successfully (demo mode)' };
  } catch (error) {
    console.error('SMS Error:', error);
    return { success: false, error: 'Failed to send SMS' };
  }
}

// Email Service
async function sendEmail(to: string, subject: string, html: string) {
  try {
    const mailOptions = {
      from: `"SMM Travel" <${process.env.EMAIL_USER || 'noreply@smmtravel.com'}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email Error:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

// Tour Confirmation Email Template
function getTourConfirmationEmailHTML(tourDetails: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f97316 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .detail-box { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #f97316; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .detail-label { font-weight: bold; color: #6b7280; }
        .detail-value { color: #111827; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; padding: 12px 30px; background: #f97316; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .highlight { color: #f97316; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Tour Confirmed!</h1>
          <p>Your adventure awaits</p>
        </div>
        <div class="content">
          <h2>Hello ${tourDetails.userName}!</h2>
          <p>Great news! Your tour has been successfully confirmed. Here are your trip details:</p>
          
          <div class="detail-box">
            <h3 style="margin-top: 0; color: #f97316;">📍 Trip Details</h3>
            <div class="detail-row">
              <span class="detail-label">Destination:</span>
              <span class="detail-value">${tourDetails.destination}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Duration:</span>
              <span class="detail-value">${tourDetails.duration} days</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Travelers:</span>
              <span class="detail-value">${tourDetails.travelers} person(s)</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Estimated Cost:</span>
              <span class="detail-value highlight">PKR ${tourDetails.estimatedCost?.toLocaleString() || 'N/A'}</span>
            </div>
            ${tourDetails.startDate ? `
            <div class="detail-row">
              <span class="detail-label">Start Date:</span>
              <span class="detail-value">${tourDetails.startDate}</span>
            </div>
            ` : ''}
          </div>

          ${tourDetails.itinerary ? `
          <div class="detail-box">
            <h3 style="margin-top: 0; color: #3b82f6;">🗓️ Itinerary Highlights</h3>
            ${tourDetails.itinerary.map((day: any, idx: number) => `
              <p><strong>Day ${idx + 1}:</strong> ${day.activities?.join(', ') || day}</p>
            `).join('')}
          </div>
          ` : ''}

          <div class="detail-box">
            <h3 style="margin-top: 0; color: #10b981;">✅ What's Next?</h3>
            <ul>
              <li>Review your itinerary in the dashboard</li>
              <li>Book accommodations and transport</li>
              <li>Check weather forecasts</li>
              <li>Pack according to destination requirements</li>
            </ul>
          </div>

          <center>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" class="button">
              View Full Details
            </a>
          </center>

          <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
            Need help? Contact us at support@smmtravel.com or call +92-XXX-XXXXXXX
          </p>
        </div>
        <div class="footer">
          <p>© 2026 SMM Travel - Your AI-Powered Travel Companion</p>
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Tour Confirmation SMS Template
function getTourConfirmationSMS(tourDetails: any) {
  return `SMM Travel: Tour Confirmed! 🎉
Destination: ${tourDetails.destination}
Duration: ${tourDetails.duration} days
Travelers: ${tourDetails.travelers}
Cost: PKR ${tourDetails.estimatedCost?.toLocaleString() || 'N/A'}
Check your email for full details. Happy travels!`;
}

// Main function to send tour confirmation
export async function sendTourConfirmation(userDetails: any, tourDetails: any) {
  const results = {
    email: { success: false, error: null as any },
    sms: { success: false, error: null as any },
  };

  // Send Email
  if (userDetails.email) {
    const emailHTML = getTourConfirmationEmailHTML({
      userName: userDetails.name,
      ...tourDetails,
    });
    
    const emailResult = await sendEmail(
      userDetails.email,
      `🎉 Tour Confirmed - ${tourDetails.destination}`,
      emailHTML
    );
    
    results.email = emailResult;
  }

  // Send SMS
  if (userDetails.phone) {
    const smsText = getTourConfirmationSMS(tourDetails);
    const smsResult = await sendSMS(userDetails.phone, smsText);
    results.sms = smsResult;
  }

  return results;
}

export { sendEmail, sendSMS };

