const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cvRoutes = require('./routes/cvRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const clientOrigin = process.env.CLIENT_URL;
const allowedOrigin = clientOrigin ? new URL(clientOrigin).origin : 'http://localhost:5173';

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || origin === allowedOrigin) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS.'));
  },
}));
app.use(express.json({ limit: '10kb', type: 'application/json' }));
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
}));
app.use('/api/cv', cvRoutes);
app.use('/api/contact', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
}), contactRoutes);
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error.type === 'entity.parse.failed') return res.status(400).json({ message: 'Request body must be valid JSON.' });
  if (error.message === 'Origin is not allowed by CORS.') return res.status(403).json({ message: error.message });
  console.error('API request failed:', error.message);
  return res.status(500).json({ message: 'An unexpected server error occurred.' });
});

module.exports = app;
