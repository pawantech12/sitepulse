import mongoose from "mongoose";

const ScanSchema = new mongoose.Schema(
  {
    url: String,

    overallScore: Number,

    totalPages: Number,

    scanDuration: String,

    status: {
      type: String,
      default: "completed",
    },

    pages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
      },
    ],

    summary: {
      performance: Number,
      seo: Number,
      accessibility: Number,
      bestPractices: Number,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Scan || mongoose.model("Scan", ScanSchema);
