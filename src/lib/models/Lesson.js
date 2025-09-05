import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    sectionId: { type: String, required: true, index: true },
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
    estimatedTime: { type: Number, default: 10 },
    content: { type: String },
    isFree: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema);
