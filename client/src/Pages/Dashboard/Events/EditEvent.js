import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { getEvents, updateEvent } from "../../../actions/event";
import uploadFile from "../../../firebase/uploadFile";

const EditEvent = ({ selectedEvent, setShowEditEvent, dispatch }) => {
  const [editedEvent, setEditedEvent] = useState(selectedEvent);
  const [previewURL, setPreviewURL] = useState(selectedEvent.photoURL);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Membuat pratinjau gambar yang dipilih
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateEvent = async () => {
    try {
      if (selectedFile) {
        // Mengunggah foto baru ke Firebase Storage
        const photoURL = await uploadFile(selectedFile, `eventPhotos/${selectedFile.name}`);

        // Update URL gambar event di database dengan URL yang baru diunggah
        const updatedEvent = { ...editedEvent, photoURL }; // Gunakan URL baru untuk gambar event
        await updateEvent(updatedEvent, editedEvent.id, dispatch);

        // Setelah berhasil diupdate, kembalikan ke tampilan tabel event
        setShowEditEvent(false);

        // Panggil kembali getEvents untuk mendapatkan data terbaru
        getEvents(dispatch); // Pastikan getEvents telah didefinisikan di sini
      } else {
        // Jika tidak ada gambar yang dipilih, lanjutkan dengan pembaruan lainnya tanpa mengubah gambar
        const updatedEvent = { ...editedEvent };
        await updateEvent(updatedEvent, editedEvent.id, dispatch);

        // Setelah berhasil diupdate, kembalikan ke tampilan tabel event
        setShowEditEvent(false);

        // Panggil kembali getEvents untuk mendapatkan data terbaru
        getEvents(dispatch); // Pastikan getEvents telah didefinisikan di sini
      }
    } catch (error) {
      console.error("Error updating event:", error.message);
      // Handle error state or display error message to the user
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h5">Edit Kegiatan</Typography>
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
      <Grid item xs={12}>
        {previewURL && <img src={previewURL} alt="Preview" style={{ maxWidth: 250, maxHeight: 250, width: "auto", height: "auto" }} />}
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" component="label">
          Upload Foto
          <input type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoChange} />
        </Button>
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
