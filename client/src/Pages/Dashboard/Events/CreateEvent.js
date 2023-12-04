import React, { useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { useValue } from "../../../Context/ContextProvider";
import uploadFile from "../../../firebase/uploadFile";
import { createEvent } from "../../../actions/event";

const CreateEvent = ({ handleBack, handleCreateEvent }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    photoURL: "",
    desc: "",
    location: "",
  });

  const [file, setFile] = useState(null); // New state to store the selected file
  const { dispatch } = useValue();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
   const selectedFile = e.target.files[0];
   setFile(selectedFile);
 };

  const handleSubmit = async () => {
    try {

      if (file) {
         const photoURL = await uploadFile(file, `events/${file.name}`);
         setFormData({
           ...formData,
           photoURL,
         });
       }

      // dispatch action to handle event creation
      dispatch({
        type: "CREATE_EVENT",
        payload: formData, // consider sending only necessary data
      });

      // additional logic or API call to create event on the server
      await createEvent(formData, dispatch);

      // reset form data after submission
      setFormData({
        name: "",
        date: "",
        photoURL: "",
        desc: "",
        location: "",
      });

      // handle display or navigation after event creation
      handleCreateEvent(formData);
      
    } catch (error) {
      console.error("Gagal membuat event:", error.message);
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: error.message,
        },
      });
    }
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
        <TextField label="Nama Kegiatan" name="name" value={formData.name} onChange={handleChange} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Tanggal Kegiatan"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }} // Menghindari tumpang tindih antara label dan format
          inputProps={{
            inputMode: "numeric",
            pattern: "\\d{2}-\\d{2}-\\d{4}", // Menambahkan pola untuk format "dd-mm-yyyy"
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <input accept="image/*" id="eventPhoto" type="file" name="photoURL" onChange={handleFileChange} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Deskripsi" name="desc" value={formData.desc} onChange={handleChange} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Lokasi" name="location" value={formData.location} onChange={handleChange} fullWidth />
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" onClick={handleSubmit}>
          Simpan
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateEvent;
