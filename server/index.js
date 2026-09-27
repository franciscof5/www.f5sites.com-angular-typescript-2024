require('dotenv').config();

const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

// Accepts either RESEND_API_KEY or the existing SMTP_PASS (both hold the re_ key).
const RESEND_API_KEY = process.env.RESEND_API_KEY || process.env.SMTP_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM;

const extractAddress = (value) => {
  if (!value) return '';
  const match = String(value).match(/<([^>]+)>/);
  return (match ? match[1] : String(value)).trim();
};

const EMAIL_TO = process.env.EMAIL_TO || extractAddress(EMAIL_FROM);

if (!RESEND_API_KEY) {
  console.error(
    '[contact] Missing RESEND_API_KEY (or SMTP_PASS) env var - contact form will fail.'
  );
}
if (!EMAIL_FROM) {
  console.error('[contact] Missing EMAIL_FROM env var - contact form will fail.');
}
if (!EMAIL_TO) {
  console.error('[contact] Missing EMAIL_TO env var - contact form will fail.');
}

const escapeHtml = (value) =>
  String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

app.post('/api/contact', async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    phone,
    street,
    company,
    site,
    language,
  } = req.body || {};

  if (!email || !language) {
    return res
      .status(400)
      .json({ ok: false, error: 'Email and language are required.' });
  }

  if (!RESEND_API_KEY || !EMAIL_FROM || !EMAIL_TO) {
    return res
      .status(500)
      .json({ ok: false, error: 'Email service is not configured.' });
  }

  const fullName = [firstName, lastName].filter(Boolean).join(' ');
  const subject = `New contact${fullName ? ` - ${fullName}` : ''}`;

  const rows = [
    ['Email', email],
    ['First Name', firstName],
    ['Last Name', lastName],
    ['Phone Number', phone],
    ['Street Address', street],
    ['Company', company],
    ['Site', site],
    ['Language', language],
  ];

  const text = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');

  const html = `
    <h2>New contact</h2>
    <table cellpadding="6" cellspacing="0" border="0">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(
              value
            )}</td></tr>`
        )
        .join('')}
    </table>
  `;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [EMAIL_TO],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('[contact] Resend error:', response.status, data);
      return res.status(502).json({
        ok: false,
        error: 'Failed to send email.',
        detail: data && (data.message || data.error),
      });
    }

    return res.json({ ok: true, id: data.id });
  } catch (error) {
    console.error('[contact] Request failed:', error);
    return res.status(502).json({
      ok: false,
      error: 'Failed to send email.',
      detail: error.message,
    });
  }
});

const distPath = path.join(__dirname, '..', 'dist', 'f5sites-angular');

app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }
  return res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
