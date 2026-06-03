import mongoose from "mongoose";

const ScanLogSchema = new mongoose.Schema(
  {
    scanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scan",
      index: true,
    },

    message: {
      type: String,
      required: true,
    },

    pageUrl: String,

    type: {
      type: String,
      enum: ["main", "sub"],
      default: "main",
    },

    parent: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["running", "success", "error"],
      default: "running",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.ScanLog ||
  mongoose.model("ScanLog", ScanLogSchema);
