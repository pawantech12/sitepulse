import mongoose from "mongoose";
import User from "./User";
const ScanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
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

    discoveredPages: {
      type: [String],
      default: [],
    },

    completedPages: {
      type: Number,
      default: 0,
    },

    failedPages: {
      type: Number,
      default: 0,
    },

    currentPage: {
      type: String,
      default: "",
    },

    stage: {
      type: String,
      default: "initializing",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Scan || mongoose.model("Scan", ScanSchema);
