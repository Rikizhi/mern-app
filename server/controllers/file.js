import File from "../models/File.js";
import tryCatch from "./utils/tryCatch.js";

export const createFile = async (req, res) => {
    try {
      const { name, type, size, fileUrl } = req.body; // Sesuaikan dengan struktur data yang diterima dari client
      const newFile = await File.create({
        name,
        type,
        size,
        fileUrl, // Ubah sesuai dengan key yang sesuai di model File
      });
      res.status(201).json({ success: true, file: newFile });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  export const deleteFile = async (req, res) => {
    try {
      const fileId = req.params.id;
      const deletedFile = await File.findByIdAndDelete(fileId);
      if (!deletedFile) {
        return res.status(404).json({ success: false, message: "File not found" });
      }
      res.status(200).json({ success: true, message: "File deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  