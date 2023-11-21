import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useValue } from "../../../Context/ContextProvider";
import { updateProfile } from "../../../actions/user";

const UpdateUser = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);

  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  console.log(currentUser);

  const [formData, setFormData] = useState({
    name: currentUser ? currentUser.name : '',
    age: currentUser ? currentUser.age : '',
    address: currentUser ? currentUser.address : '',
    telephone: currentUser ? currentUser.telephone : '',
  });

  const [originalData, setOriginalData] = useState({
    name: currentUser ? currentUser.name : '',
    age: currentUser ? currentUser.age : '',
    address: currentUser ? currentUser.address : '',
    telephone: currentUser ? currentUser.telephone : '',
  });

  const [isEditing, setIsEditing] = useState(false); // Tambah state untuk mengontrol mode edit

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true); // Ketika tombol "Edit" diklik, ubah state menjadi true
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Ketika tombol "Cancel Edit" diklik, kembali ke mode tampilan saja
    setFormData(originalData);
  };

  const handleSubmit = async () => {
    try {
      await updateProfile(currentUser, formData, dispatch);
      setIsEditing(false); // Setelah penyimpanan berhasil, kembali ke mode tampilan saja
    } catch (error) {
      console.error('Failed to update profile:', error.message);
      // Tindakan untuk menangani kesalahan jika terjadi
    }
  };

  useEffect(() => {
    // Reset form data setiap currentUser berubah
    setFormData({
      name: currentUser ? currentUser.name : '',
      age: currentUser ? currentUser.age : '',
      address: currentUser ? currentUser.address : '',
      telephone: currentUser ? currentUser.telephone : '',
    });
    setOriginalData({
      name: currentUser ? currentUser.name : '',
      age: currentUser ? currentUser.age : '',
      address: currentUser ? currentUser.address : '',
      telephone: currentUser ? currentUser.telephone : '',
    });
  }, [currentUser]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Biodata User</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Nama" name="name" value={formData.name} onChange={handleInputChange} fullWidth disabled={!isEditing}  />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Umur" name="age" value={formData.age} onChange={handleInputChange} fullWidth disabled={!isEditing}  />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Alamat" name="address" value={formData.address} onChange={handleInputChange} fullWidth disabled={!isEditing}  />
      </Grid>
      <Grid item xs={12}>
        <TextField label="No. Telepon" name="telephone" value={formData.telephone} onChange={handleInputChange} fullWidth disabled={!isEditing}  />
      </Grid>
      {/* Add other form fields as needed */}
      <Grid item xs={12}>
      {isEditing ? (
          <>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="contained" onClick={handleCancelEdit}>
              Cancel Edit
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default UpdateUser;
