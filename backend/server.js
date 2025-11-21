import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';

// Load primary env vars from .env (if present)
dotenv.config();
// Fallback to .env.example for any vars not set in .env
dotenv.config({ path: '.env.example', override: false });

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const allowedOrigins = [
  CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
];

app.use(cors({ 
  origin: allowedOrigins, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'AI Code Review & Bug Finder API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/review', reviewRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to DB connection error', err);
    process.exit(1);
  });
