import mongoose from "mongoose";

const AiPageReportSchema =
  new mongoose.Schema(
    {
      pageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",

        required: true,

        unique: true,
      },

      content: {
        type: String,

        required: true,
      },

      generatedAt: {
        type: Date,

        default: Date.now,
      },
    },
    {
      timestamps: true,
    },
  );

export default mongoose.models.AiPageReport ||
  mongoose.model(
    "AiPageReport",
    AiPageReportSchema,
  );