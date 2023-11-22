import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Grid, Typography, Avatar } from "@mui/material";
import { useValue } from "../../../Context/ContextProvider";
import { updateProfile } from "../../../actions/user";
import uploadFile from "../../../firebase/uploadFile";

const UpdateUser = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);

  const {
    state: { currentUser, profile },
    dispatch,
  } = useValue();

  const fileInputRef = useRef();

  console.log(currentUser);

  const [formData, setFormData] = useState({
    name: currentUser ? currentUser.name : "",
    age: currentUser ? currentUser.age : "",
    address: currentUser ? currentUser.address : "",
    telephone: currentUser ? currentUser.telephone : "",
    photoURL: currentUser ? currentUser.photoURL : "",
  });

  const [originalData, setOriginalData] = useState({
    name: currentUser ? currentUser.name : "",
    age: currentUser ? currentUser.age : "",
    address: currentUser ? currentUser.address : "",
    telephone: currentUser ? currentUser.telephone : "",
    photoURL: currentUser ? currentUser.photoURL : "",
  });

  const [isEditing, setIsEditing] = useState(false); // Tambah state untuk mengontrol mode edit

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Jika yang diubah adalah input photoURL
    if (name === "photoURL") {
      // Lakukan sesuatu dengan value baru, seperti menyetel value pada state formData
      setFormData({
        ...formData,
        photoURL: value,
      });
    } else {
      // Jika input lain yang diubah, lanjutkan seperti biasa
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        [name]: value,
      });
    }
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
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error.message);
    }
  };

  useEffect(() => {
    // Reset form data setiap currentUser berubah
    setFormData({
      name: currentUser ? currentUser.name : "",
      age: currentUser ? currentUser.age : "",
      address: currentUser ? currentUser.address : "",
      telephone: currentUser ? currentUser.telephone : "",
      photoURL: currentUser ? currentUser.photoURL : "",
    });
    setOriginalData({
      name: currentUser ? currentUser.name : "",
      age: currentUser ? currentUser.age : "",
      address: currentUser ? currentUser.address : "",
      telephone: currentUser ? currentUser.telephone : "",
      photoURL: currentUser ? currentUser.photoURL : "",
    });
  }, [currentUser]);

  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const photoURL = await uploadFile(file, `profile/${currentUser?.id}/${file.name}`);
        setFormData({
          ...formData,
          photoURL: photoURL,
        });
        dispatch({
          type: "UPDATE_PROFILE",
          payload: { ...profile, file, photoURL },
        });
      } catch (error) {
        console.error("Failed to upload profile photo:", error.message);
      }
    }
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Biodata User</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Nama" name="name" value={formData.name} onChange={handleInputChange} fullWidth disabled={!isEditing} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Umur" name="age" value={formData.age} onChange={handleInputChange} fullWidth disabled={!isEditing} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Alamat" name="address" value={formData.address} onChange={handleInputChange} fullWidth disabled={!isEditing} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="No. Telepon" name="telephone" value={formData.telephone} onChange={handleInputChange} fullWidth disabled={!isEditing} />
      </Grid>
      <Grid item xs={12}>
        <label htmlFor="profilePhoto">
          <Avatar src={profile.photoURL} sx={{ width: 75, height: 75, cursor: "pointer" }} />
          <input accept="image/*" id="profilePhoto" type="file" style={{ display: "none" }} onChange={handleProfileChange} ref={fileInputRef} onClick={clearFileInput} disabled={!isEditing} />
        </label>
      </Grid>
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
