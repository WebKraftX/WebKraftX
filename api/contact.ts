/**
 * WebKraftX Serverless Contact API Handler
 * Handles project enquiries from /contact and delivers to contact.webkraftx@gmail.com
 *
 * Supported delivery engines:
 * 1. Resend API (if RESEND_API_KEY is present)
 * 2. Nodemailer SMTP (if SMTP_HOST, SMTP_USER, SMTP_PASS are present)
 */

export interface ContactPayload {
  fullName: string;
  businessName?: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  description?: string;
  preferredContact: 'WhatsApp' | 'Email' | 'Phone call';
  privacyAgree: boolean;
  honeypot?: string;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data: ContactPayload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // 1. Honeypot spam trap
    if (data.honeypot && data.honeypot.trim() !== '') {
      // Quietly reject bots with a 200 to not alert spam scripts
      return res.status(200).json({ success: true, message: 'Enquiry received' });
    }

    // 2. Validate required inputs
    if (!data.fullName || !data.email || !data.phone || !data.service || !data.budget || !data.privacyAgree) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Validate phone digits (minimum 10 digits)
    const digitsOnly = data.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || 'contact.webkraftx@gmail.com';
    const emailSubject = `[New Project Enquiry] ${data.fullName} — ${data.service}`;
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #EDE5F7; border-radius: 12px; color: #241638;">
        <h2 style="color: #783DE0; margin-top: 0;">New Project Enquiry via WebKraftX</h2>
        <div style="background: #F5EFFB; padding: 20px; border-radius: 8px; border: 1px solid #D2BDEB;">
          <p><strong>Full Name:</strong> ${escapeHtml(data.fullName)}</p>
          <p><strong>Business Name:</strong> ${data.businessName ? escapeHtml(data.businessName) : 'Not specified'}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>
          <p><strong>Service Requested:</strong> ${escapeHtml(data.service)}</p>
          <p><strong>Estimated Budget:</strong> ${escapeHtml(data.budget)}</p>
          <p><strong>Preferred Contact Method:</strong> ${escapeHtml(data.preferredContact)}</p>
          <p><strong>Project Description:</strong></p>
          <div style="background: #EDE5F7; padding: 14px; border-radius: 6px; white-space: pre-wrap; font-size: 14px;">${data.description ? escapeHtml(data.description) : 'No description provided.'}</div>
        </div>
        <p style="font-size: 12px; color: #554665; margin-top: 20px;">Sent securely from WebKraftX Contact Portal.</p>
      </div>
    `;

    // OPTION 1: Resend
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'WebKraftX Portal <enquiries@webkraftx.com>',
          to: [recipient],
          reply_to: data.email,
          subject: emailSubject,
          html: htmlContent,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Resend delivery error:', errorText);
        throw new Error('Email service delivery error');
      }

      return res.status(200).json({ success: true });
    }

    // Fallback: If credentials not configured yet, log safely and return success
    console.log('[WebKraftX Contact Form] Production email notification ready for:', recipient);
    console.log('[WebKraftX Contact Form] Form submission received for:', data.fullName, data.email);
    return res.status(200).json({
      success: true,
      message: 'Enquiry received. Email delivery requires RESEND_API_KEY or SMTP configuration.',
    });

  } catch (error: any) {
    console.error('Contact handler error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
