import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import tryCatch from "./utils/tryCatch.js";

export const register = tryCatch(async (req, res) => {
  const { name, email, password } = req.body;
  if (password.length < 6)
    return res.status(400).json({
      success: false,
      message: "Kata sandi harus terdiri dari 6 karakter atau lebih",
    });
  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (existedUser) return res.status(400).json({ success: false, message: "User sudah tersedia!" });
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email: emailLowerCase,
    password: hashedPassword,
  });
  const { _id: id, photoURL, role, active } = user;
  const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({
    success: true,
    result: { id, name, email: user.email, photoURL, token, role, active },
  });
});

export const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (!existedUser) return res.status(404).json({ success: false, message: "User tidak tersedia!" });
  const correctPassword = await bcrypt.compare(password, existedUser.password);
  if (!correctPassword) return res.status(400).json({ success: false, message: "Pengisian tidak valid" });
  const { _id: id, name, photoURL, age, address, telephone, role, active } = existedUser;
  if (!active) return res.status(400).json({ success: false, message: "Akun ini telah disuspend! Coba untuk kontak Admin" });
  const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({
    success: true,
    result: { id, name, email: emailLowerCase, photoURL, age, address, telephone, token, role, active },
  });
});

export const updateProfile = tryCatch(async (req, res) => {
  const { name, age, address, telephone, photoURL } = req.body;
  const updateUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });
  const { _id: id } = updateUser;

  const token = jwt.sign({ id, name, photoURL, age, address, telephone }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({ success: true, result: { name, photoURL, age, address, telephone, token } });
});

export const getUsers = tryCatch(async (req, res) => {
  const users = await User.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: users });
});

export const updateStatus = tryCatch(async (req, res) => {
  const { name, email, role, active, division, age, address, telephone } = req.body;
  await User.findByIdAndUpdate(req.params.userId, { name, email, role, active, division, age, address, telephone });
  res.status(200).json({ success: true, result: { _id: req.params.userId } });
});

export const addUser = tryCatch(async (req, res) => {
  const { name, email, password, role, active, division, age, address, telephone, photoURL } = req.body;
  if (password.length < 6)
    return res.status(400).json({
      success: false,
      message: "Kata sandi harus terdiri dari 6 karakter atau lebih",
    });

  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (existedUser) {
    return res.status(400).json({ success: false, message: "User already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    name,
    email: emailLowerCase,
    password: hashedPassword,
    role,
    active,
    division,
    age,
    address,
    telephone,
    photoURL,
  });

  const savedUser = await newUser.save();

  // Kirim respons yang sesuai, misalnya memberikan token JWT kepada pengguna yang baru terdaftar
  res.status(201).json({
    success: true,
    result: savedUser,
  });
});
