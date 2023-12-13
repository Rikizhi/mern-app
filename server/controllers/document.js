import Document from "../models/Document.js";
import tryCatch from "./utils/tryCatch.js";

export const getDocuments = tryCatch(async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, result: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export const addDocument = tryCatch(async (req, res) => {
  const { name, desc, type, size, fileURL } = req.body;

  try {
    const newDocument = new Document({ name, desc, type, size, fileURL });
    const savedDocument = await newDocument.save();
    const updatedDocuments = await Document.find().sort({ createdAt: -1 }); // Ambil data event terbaru setelah penambahan

    res.status(201).json({ success: true, result: updatedDocuments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export const updateDocument = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { name, desc, type, size, fileURL } = req.body;

  try {
    const updatedDocument = await Document.findByIdAndUpdate(id, { name, desc, type, size, fileURL }, { new: true });
    res.status(200).json({ success: true, result: updatedDocument });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});