import React, { useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { useValue } from "../../../Context/ContextProvider";
import uploadFile from "../../../firebase/uploadFile";
import { createEvent } from "../../../actions/event";

const AddEvent = ({ setSelectedLink, link, setShowAddEvent }) => {
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    photoURL: '',
    desc: '',
    location: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const photoURL = await uploadFile(file, 'eventPhotos/' + file.name);
        setNewEvent({ ...newEvent, photoURL });
      } catch (error) {
        console.error('Error uploading image:', error);
        // Tambahkan logika untuk menangani kesalahan pengunggahan gambar
      }
    }
  };

  const handleAddEvent = () => {
    // Logika untuk menambahkan event ke database
    // Misalnya, panggil fungsi atau API untuk menyimpan event baru
    console.log('Menambahkan event ke database:', newEvent);
    // Kembalikan ke tampilan tabel event
    setSelectedLink(link);
  };

  const handleBack = () => {
    setShowAddEvent(false); // Menghilangkan tampilan form AddEvent
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h5">Tambah Kegiatan</Typography>
      </Grid>
      <Grid item xs={6} container justifyContent="flex-end">
        <Button variant="contained" onClick={handleBack}>
          Kembali
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Nama Kegiatan" name="name" value={newEvent.name} onChange={handleInputChange} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Tanggal Kegiatan"
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
          fullWidth
          InputLabelProps={{ shrink: true }} // Menghindari tumpang tindih antara label dan format
          inputProps={{
            inputMode: "numeric",
            pattern: "\\d{2}-\\d{2}-\\d{4}", // Menambahkan pola untuk format "dd-mm-yyyy"
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <input accept="image/*" id="eventPhoto" type="file" onChange={handleImageUpload} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Deskripsi" name="desc" value={newEvent.desc} onChange={handleInputChange} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Lokasi" name="location" value={newEvent.location} onChange={handleInputChange} fullWidth />
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" onClick={handleAddEvent}>
          Simpan
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddEvent;
