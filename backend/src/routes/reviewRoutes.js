import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';
import {
  analyzeCode,
  uploadCodeFile,
  getHistory,
  getReviewById,
  deleteReview,
} from '../controllers/reviewController.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
});

router.post('/analyze', auth, analyzeCode);
router.post('/upload', auth, upload.single('file'), uploadCodeFile);
router.get('/history/:userId', auth, getHistory);
router.get('/:id', auth, getReviewById);
router.delete('/:id', auth, deleteReview);

export default router;
