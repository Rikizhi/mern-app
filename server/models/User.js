import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, min: 2, max: 50, required: true },
    email: { type: String, min: 5, max: 50, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    photoURL: { type: String, default: "" },
    age: { type: Number, default: "" },
    address: { type: String, default: "" },
    telephone: { type: String, min: 10, max: 13, default: "", unique: true, trim: true },
    division: {
      type: String,
      default: "",
      enum: ["anggota", "sekretaris", "bendahara", "wakil", "ketua"],
    },
    role: {
      type: String,
      default: "member",
      enum: ["member", "admin", "superadmin"],
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
export default User;
