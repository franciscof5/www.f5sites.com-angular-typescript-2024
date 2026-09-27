require('dotenv').config();

const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

const escapeHtml = (value) =>
  String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO || process.env.EMAIL_FROM,
      replyTo: email,
      subject,
      text,
      html,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return res
      .status(500)
      .json({ ok: false, error: 'Failed to send email.' });
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
