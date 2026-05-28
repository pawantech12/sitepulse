import mongoose from "mongoose";

const PageSchema = new mongoose.Schema(
  {
    scanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scan",
    },

    url: String,

    performance: Number,

    seo: Number,

    accessibility: Number,

    bestPractices: Number,

    metrics: Object,

    issues: Object,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Page ||
  mongoose.model("Page", PageSchema);