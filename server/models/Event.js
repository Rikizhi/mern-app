import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    photoURL: { type: String, default: "" },
    desc: { type: String },
    location: { type: String },
    done: {
      type: String,
      default: "",
      enum: ["terlaksana", "belum terlaksana", "tidak terlaksana"],
    },
    // participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }], // Partisipan kegiatan (mungkin berupa referensi ke koleksi user
  },
  { timestamps: true }
);

const Event = mongoose.model("events", eventSchema);
export default Event;
