import mongoose from "mongoose";

const financeSchema = mongoose.Schema(
  {
    date: { type: Date, required: true },
    income: { type: Number, default: 0 },
    incomeSource: { type: String },
    expense: { type: Number, default: 0 },
    expensePurpose: { type: String },
    desc: { type: String, max: 50 },
  },
  { timestamps: true }
);

const Finance = mongoose.model("finances", financeSchema);
export default Finance;
