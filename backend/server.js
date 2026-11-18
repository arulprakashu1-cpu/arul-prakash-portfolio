// Portfolio backend API — Express with DevSecOps-minded defaults.
// Endpoints:
//   GET  /api/health   -> liveness probe
//   GET  /api/profile  -> public profile summary (JSON)
//   POST /api/contact  -> contact form intake (validated, rate-limited, persisted)

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

app.use(helmet());
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json({ limit: '10kb' }));
app.disable('x-powered-by');

// Simple in-memory rate limiter: max 5 contact posts per IP per 10 minutes.
const hits = new Map();
function rateLimit(req, res, next) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const key = req.ip;
  const entry = hits.get(key) || [];
  const recent = entry.filter((t) => now - t < windowMs);
  if (recent.length >= 5) {
    return res.status(429).json({ error: 'Too many requests. Try again later.' });
  }
  recent.push(now);
  hits.set(key, recent);
  next();
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/api/profile', (req, res) => {
  res.json({
    name: 'Arul Prakash U',
    title: 'Senior Full-Stack Web Consultant · Cloud & DevSecOps Architect',
    location: 'Remote (Global)',
    experienceYears: 5,
    stack: {
      frontend: ['Angular 13/15', 'AngularJS', 'React.js', 'TypeScript', 'RxJS'],
      backend: ['Node.js', 'Express.js', 'REST / Swagger'],
      cloud: ['Docker', 'Kubernetes', 'AWS EKS', 'Azure DevOps', 'CI/CD'],
      data: ['MySQL', 'MongoDB', 'Quickbase']
    },
    links: {
      linkedin: 'https://www.linkedin.com/in/arulprakashu',
      portfolio: 'https://arulprakashu1-cpu.github.io/arul-prakash-portfolio/'
    }
  });
});

app.post('/api/contact', rateLimit, (req, res) => {
  const { name, email, message } = req.body || {};

  // Input validation — lengths bounded, email shape checked, strings only.
  if (
    typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string' ||
    !name.trim() || name.length > 80 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120 ||
    !message.trim() || message.length > 2000
  ) {
    return res.status(400).json({ error: 'Invalid input. Provide name, valid email, and message.' });
  }

  const record = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString(),
    ip: req.ip
  };

  // Persist to a local JSON file (swap for a DB or nodemailer transport in production).
  let messages = [];
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
    }
  } catch (err) {
    messages = [];
  }
  messages.push(record);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));

  console.log('[contact] message from %s <%s>', record.name, record.email);
  res.status(201).json({ ok: true });
});

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log('Portfolio API listening on http://localhost:' + PORT);
});
