import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    photoURL: { type: String, default: "" },
    desc: { type: String, max: 50 },
    location: { type: String },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }], // Partisipan kegiatan (mungkin berupa referensi ke koleksi user)
  },
  { timestamps: true }
);

const Event = mongoose.model("events", eventSchema);
export default Event;
