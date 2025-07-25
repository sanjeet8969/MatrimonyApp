const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send welcome email
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Welcome to MatrimonyApp - Find Your Perfect Match!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3b82f6; text-align: center;">Welcome to MatrimonyApp!</h1>
          <p>Dear ${userName},</p>
          <p>Thank you for joining MatrimonyApp! We're excited to help you find your perfect life partner.</p>
          
          <h2>Next Steps:</h2>
          <ol>
            <li>Complete your profile with photos and detailed information</li>
            <li>Set your partner preferences</li>
            <li>Start browsing compatible matches</li>
            <li>Send interest requests to profiles you like</li>
          </ol>
          
          <p>Our advanced matching algorithm will help you find the most compatible partners based on your preferences.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/dashboard" 
               style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              Complete Your Profile
            </a>
          </div>
          
          <p>Best regards,<br>The MatrimonyApp Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Welcome email sent successfully' };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, message: error.message };
  }
};

// Send interest notification email
const sendInterestNotification = async (receiverEmail, senderName, senderProfile) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: receiverEmail,
      subject: `New Interest from ${senderName} - MatrimonyApp`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3b82f6; text-align: center;">New Interest Received!</h1>
          <p>You have received an interest request from <strong>${senderName}</strong>.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Profile Highlights:</h3>
            <p><strong>Name:</strong> ${senderName}</p>
            <p><strong>Location:</strong> ${senderProfile.city}, ${senderProfile.state}</p>
            <p><strong>Education:</strong> ${senderProfile.education}</p>
            <p><strong>Profession:</strong> ${senderProfile.profession}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/matches" 
               style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-right: 10px;">
              View Profile
            </a>
            <a href="${process.env.CLIENT_URL}/matches" 
               style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              Respond Now
            </a>
          </div>
          
          <p>Don't keep them waiting - respond to show your interest!</p>
          
          <p>Best regards,<br>The MatrimonyApp Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Interest notification sent successfully' };
  } catch (error) {
    console.error('Error sending interest notification:', error);
    return { success: false, message: error.message };
  }
};

// Send match confirmation email
const sendMatchConfirmation = async (userEmail, partnerName, partnerProfile) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: userEmail,
      subject: `Congratulations! You have a new match with ${partnerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10b981; text-align: center;">🎉 It's a Match!</h1>
          <p>Congratulations! <strong>${partnerName}</strong> has accepted your interest request.</p>
          
          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #059669; margin-top: 0;">You can now:</h3>
            <ul style="color: #065f46;">
              <li>Send messages to each other</li>
              <li>Exchange contact information</li>
              <li>Plan to meet in person</li>
              <li>Take the next step in your relationship</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/messages" 
               style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              Start Conversation
            </a>
          </div>
          
          <p>We wish you both the very best in your journey together!</p>
          
          <p>Best regards,<br>The MatrimonyApp Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Match confirmation sent successfully' };
  } catch (error) {
    console.error('Error sending match confirmation:', error);
    return { success: false, message: error.message };
  }
};

// Send password reset email
const sendPasswordResetEmail = async (userEmail, resetToken) => {
  try {
    const transporter = createTransporter();
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Password Reset Request - MatrimonyApp',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3b82f6; text-align: center;">Password Reset Request</h1>
          <p>You have requested to reset your password for your MatrimonyApp account.</p>
          
          <p>Click the button below to reset your password. This link will expire in 1 hour.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              Reset Password
            </a>
          </div>
          
          <p>If you didn't request this password reset, please ignore this email.</p>
          
          <p>For security reasons, this link will expire in 1 hour.</p>
          
          <p>Best regards,<br>The MatrimonyApp Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Password reset email sent successfully' };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, message: error.message };
  }
};

module.exports = {
  sendWelcomeEmail,
  sendInterestNotification,
  sendMatchConfirmation,
  sendPasswordResetEmail
};
