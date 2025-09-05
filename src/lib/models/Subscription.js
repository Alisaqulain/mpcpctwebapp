import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["learning", "skill", "exam"], required: true },
  status: { type: String, enum: ["active", "expired", "cancelled"], default: "active" },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  plan: { type: String, enum: ["basic", "premium", "lifetime"], required: true },
  price: { type: Number, required: true },
  paymentId: { type: String },
}, { timestamps: true });

// Index for efficient queries
SubscriptionSchema.index({ userId: 1, type: 1, status: 1 });

export default mongoose.models.Subscription || mongoose.model("Subscription", SubscriptionSchema);
