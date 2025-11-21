import mongoose from 'mongoose';

const reviewOutputSchema = new mongoose.Schema(
  {
    errors: { type: [String], default: [] },
    improvements: { type: [String], default: [] },
    security_issues: { type: [String], default: [] },
    clean_code: { type: [String], default: [] },
    complexity: { type: String, default: '' },
    refactor_code: { type: String, default: '' },
    summary: { type: String, default: '' },
  },
  { _id: false, suppressReservedKeysWarning: true }
);

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    reviewOutput: {
      type: reviewOutputSchema,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
