import Event from "../models/Event.js";
import tryCatch from "./utils/tryCatch.js";

export const createEvent = tryCatch(async (req, res) => {
  const { name, date, photoURL, desc, location } = req.body;

  try {
    // Pastikan properti yang diisi sesuai dengan properti pada model
    const newEvent = await Event.create({
      name,
      date,
      photoURL,
      desc,
      location,
    });

    res.status(201).json({ success: true, event: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});