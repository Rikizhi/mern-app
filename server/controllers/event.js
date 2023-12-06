import Event from "../models/Event.js"

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, result: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addEvent = async (req, res) => {
  const { name, date, photoURL, desc, location } = req.body;

  try {
    const newEvent = new Event({ name, date, photoURL, desc, location });
    const savedEvent = await newEvent.save();
    res.status(201).json({ success: true, result: savedEvent });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, date, photoURL, desc, location } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, { name, date, photoURL, desc, location }, { new: true });
    res.status(200).json({ success: true, result: updatedEvent });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await Event.findByIdAndDelete(id);
    res.status(200).json({ success: true, result: "Event deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
