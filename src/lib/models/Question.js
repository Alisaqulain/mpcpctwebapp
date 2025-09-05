import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    examId: { type: String, required: true, index: true },
    sectionId: { type: String, required: true, index: true },
    id: { type: String, required: true, unique: true },
    question_en: { type: String, required: true },
    question_hi: { type: String },
    options_en: [{ type: String, required: true }],
    options_hi: [{ type: String }],
    correctAnswer: { type: Number, required: true },
    explanation_en: { type: String },
    explanation_hi: { type: String },
    passage_en: { type: String },
    passage_hi: { type: String },
    isFree: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Question || mongoose.model("Question", QuestionSchema);


