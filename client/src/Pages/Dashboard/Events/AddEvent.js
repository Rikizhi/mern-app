import React, { useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { useValue } from "../../../Context/ContextProvider";
import uploadFile from "../../../firebase/uploadFile";
import { addEvent, getEvents } from "../../../actions/event";

const AddEvent = ({ setSelectedLink, link, setShowAddEvent }) => {
  const { state, dispatch } = useValue();
  const [selectedFile, setSelectedFile] = useState(null);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    photoURL: "",
    desc: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handlePhotoChange = (e) => {
    // Memperoleh file yang dipilih tanpa melakukan unggahan ke Firebase
    const file = e.target.files[0];

    // Simpan file tersebut dalam state atau variabel yang sesuai
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAddEvent = async () => {
    try {
      if (selectedFile) {
        try {
          // Mengunggah foto ke Firebase hanya saat tombol simpan ditekan
          const photoURL = await uploadFile(selectedFile, `eventPhotos/${selectedFile.name}`);

          // Simpan URL foto kegiatan ke dalam state atau variabel yang sesuai
          const updatedEvent = {
            ...newEvent,
            photoURL: photoURL,
          };

          // Setelah berhasil diunggah, simpan data kegiatan ke database
          await addEvent(updatedEvent, dispatch);

          // Clear input fields or perform any other necessary actions
          setNewEvent({
            name: "",
            date: "",
            photoURL: "",
            desc: "",
            location: "",
          });

          setSelectedFile(null); // Reset file yang dipilih setelah pengungahan
          setShowAddEvent(false); // Menghilangkan tampilan form AddEvent setelah berhasil menambah event

          // Ambil kembali data terbaru dari server setelah penambahan berhasil
          const updatedEvents = await getEvents(dispatch); // Gunakan fungsi getEvents untuk mendapatkan data terbaru

          // Update tampilan dengan data yang baru ditambahkan
          dispatch({ type: "UPDATE_EVENTS", payload: updatedEvents });
        } catch (error) {
          console.error("Error uploading photo to Firebase:", error.message);
          // Handle error state or display error message to the user
        }
      } else {
        // Jika tidak ada foto yang dipilih, mungkin tampilkan pesan atau lakukan tindakan yang sesuai
        console.warn("Mohon pilih foto untuk diunggah");
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error state or display error message to the user
    }
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
          value={newEvent.date.split("T")[0]}
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
        <input accept="image/*" id="eventPhoto" type="file" onChange={handlePhotoChange} />
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
