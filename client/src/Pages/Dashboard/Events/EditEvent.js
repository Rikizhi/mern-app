import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { getEvents, updateEvent } from "../../../actions/event";

const EditEvent = ({ selectedEvent, setShowEditEvent, dispatch }) => {
  const [editedEvent, setEditedEvent] = useState(selectedEvent);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleUpdateEvent = async () => {
    try {
      // Panggil fungsi untuk mengupdate event dengan data yang telah diubah
      await updateEvent(editedEvent, editedEvent.id, dispatch);
  
      // Setelah berhasil diupdate, kembalikan ke tampilan tabel event
      setShowEditEvent(false);
  
      // Panggil kembali getEvents untuk mendapatkan data terbaru
      getEvents(dispatch); // Pastikan getEvents telah didefinisikan di sini
    } catch (error) {
      console.error('Error updating event:', error.message);
      // Handle error state or display error message to the user
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h5">Edit Event</Typography>
      </Grid>
      <Grid item xs={6} container justifyContent="flex-end">
        <Button variant="contained" onClick={() => setShowEditEvent(false)}>
          Batal
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Nama Kegiatan" name="name" value={editedEvent.name} onChange={handleInputChange} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Tanggal Kegiatan"
          type="date"
          name="date"
          value={editedEvent.date.split("T")[0]} // Ambil bagian tanggal saja
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          inputProps={{
            inputMode: "numeric",
            pattern: "\\d{2}-\\d{2}-\\d{4}",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Deskripsi" name="desc" value={editedEvent.desc} onChange={handleInputChange} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Lokasi" name="location" value={editedEvent.location} onChange={handleInputChange} fullWidth />
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" onClick={handleUpdateEvent}>
          Simpan Perubahan
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditEvent;
