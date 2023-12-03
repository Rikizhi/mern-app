import mongoose from "mongoose";

const fileSchema = mongoose.Schema(
  {
    name: { type: String, default: "", unique: true, required: true },
    desc: { type: String, min: 10, max: 50, default: "" },
    type: { type: String, default: "" },
    size: { type: Number, default: 0 },
    fileUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const File = mongoose.model("files", fileSchema);
export default File;
