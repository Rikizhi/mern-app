import mongoose from "mongoose";

const documentSchema = mongoose.Schema(
  {
    name: { type: String, default: "", unique: true, required: true },
    desc: { type: String, min: 10, max: 50, default: "" },
    type: {
      type: String,
      default: "",
      enum: ["dokumen", "surat keterangan", "surat resmi", "proposal"],
    },
    size: { type: Number, default: 0 },
    fileURL: { type: String, default: "" },
  },
  { timestamps: true }
);

const Document = mongoose.model("documents", documentSchema);
export default Document;
