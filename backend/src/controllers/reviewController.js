import Review from '../models/Review.js';
import { generateCodeReview } from '../utils/aiClient.js';

const inferLanguageFromFilename = (originalName) => {
  if (!originalName) return 'plaintext';
  const lower = originalName.toLowerCase();
  if (lower.endsWith('.js') || lower.endsWith('.jsx') || lower.endsWith('.ts') || lower.endsWith('.tsx')) return 'javascript';
  if (lower.endsWith('.py')) return 'python';
  if (lower.endsWith('.cpp') || lower.endsWith('.cc') || lower.endsWith('.cxx') || lower.endsWith('.hpp')) return 'cpp';
  if (lower.endsWith('.java')) return 'java';
  if (lower.endsWith('.cs')) return 'csharp';
  if (lower.endsWith('.php')) return 'php';
  if (lower.endsWith('.rb')) return 'ruby';
  if (lower.endsWith('.go')) return 'go';
  return 'plaintext';
};

export const analyzeCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ message: 'Code and language are required' });
    }

    const reviewOutput = await generateCodeReview(code, language);

    const review = await Review.create({
      userId: req.user.id,
      code,
      language,
      reviewOutput,
    });

    return res.status(201).json({ review });
  } catch (error) {
    console.error('Error in analyzeCode controller:', error);
    return res.status(500).json({
      message: 'Failed to analyze code',
      details: error.message,
    });
  }
};

export const uploadCodeFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const code = req.file.buffer.toString('utf-8');
    const language = req.body.language || inferLanguageFromFilename(req.file.originalname);

    if (!code.trim()) {
      return res.status(400).json({ message: 'Uploaded file is empty' });
    }

    const reviewOutput = await generateCodeReview(code, language);

    const review = await Review.create({
      userId: req.user.id,
      code,
      language,
      reviewOutput,
    });

    return res.status(201).json({ review });
  } catch (error) {
    console.error('Error in uploadCodeFile controller:', error);
    return res.status(500).json({
      message: 'Failed to analyze uploaded file',
      details: error.message,
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || userId !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to access this history' });
    }

    const history = await Review.find({ userId })
      .sort({ createdAt: -1 })
      .select('-__v');

    return res.status(200).json({ history });
  } catch (error) {
    console.error('Error in getHistory controller:', error);
    return res.status(500).json({ message: 'Failed to load history' });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findOne({
      _id: id,
      userId: req.user.id,
    }).select('-__v');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    return res.status(200).json({ review });
  } catch (error) {
    console.error('Error in getReviewById controller:', error);
    return res.status(500).json({ message: 'Failed to load review' });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Review.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Review not found' });
    }

    return res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error in deleteReview controller:', error);
    return res.status(500).json({ message: 'Failed to delete review' });
  }
};
