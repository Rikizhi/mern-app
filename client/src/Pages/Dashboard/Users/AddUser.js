import React, { useRef, useState } from "react";
import { TextField, Button, Grid, Typography, Avatar, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { useValue } from "../../../Context/ContextProvider";
import uploadFile from "../../../firebase/uploadFile";
import { v4 as uuidv4 } from "uuid";
import Users from ".";
import { addUser } from "../../../actions/user";

const AddUser = ({ setSelectedLink, link }) => {
  const [showAddUser, setShowAddUser] = useState(true);
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    active: false,
    division: "",
    age: "",
    address: "",
    telephone: "",
    photoURL: "",
  });

  const {
    state: { currentUser, profile },
    dispatch,
  } = useValue();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleBack = () => {
    setShowAddUser(false);
  };

  const handleSubmit = async () => {
    try {
      // Validasi semua field harus diisi sebelum menyimpan
      const fieldsToValidate = ["name", "email", "password", "role", "division", "age", "address", "telephone"];

      const isFormValid = fieldsToValidate.every((field) => formData[field].trim() !== "");

      if (!isFormValid) {
        throw new Error("Tolong isi semua kolom terlebih dahulu");
      }

      const newUserData = {
        _id: uuidv4(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        active: formData.active,
        division: formData.division,
        age: formData.age,
        address: formData.address,
        telephone: formData.telephone,
        photoURL: formData.photoURL,
      };

      dispatch({
        type: "ADD_USER",
        payload: newUserData, // Menggunakan data dari form untuk menambahkan user baru
      });

      await addUser(newUserData, dispatch);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        active: false,
        division: "",
        age: "",
        address: "",
        telephone: "",
        photoURL: "",
      });

      // Menampilkan kembali tabel user setelah user ditambahkan
      setShowAddUser(false);
    } catch (error) {
      console.error("Gagal menambahkan user:", error.message);
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
        console.error("Gagal mengunggah foto profil:", error.message);
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
      {showAddUser ? (
        <>
          <Grid item xs={6}>
            <Typography variant="h5">Tambah User</Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            <Button variant="contained" onClick={handleBack}>
              Kembali
            </Button>
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="profilePhoto">
              <Avatar src={profile.photoURL} sx={{ width: 100, height: 100, cursor: "pointer" }} />
              <input accept="image/*" id="profilePhoto" type="file" style={{ display: "none" }} onChange={handleProfileChange} ref={fileInputRef} onClick={clearFileInput} />
            </label>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Nama" name="name" value={formData.name} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Umur" name="age" value={formData.age} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Email" name="email" value={formData.email} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select labelId="role-label" id="role" name="role" value={formData.role} label="Role" onChange={handleInputChange}>
                <MenuItem value={"member"}>member</MenuItem>
                <MenuItem value={"admin"}>admin</MenuItem>
                <MenuItem value={"superadmin"}>superadmin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="division-label">Division</InputLabel>
              <Select labelId="division-label" id="division" name="division" value={formData.division} label="Division" onChange={handleInputChange}>
                <MenuItem value={"anggota"}>anggota</MenuItem>
                <MenuItem value={"sekretaris"}>sekretaris</MenuItem>
                <MenuItem value={"bendahara"}>bendahara</MenuItem>
                <MenuItem value={"wakil"}>wakil</MenuItem>
                <MenuItem value={"ketua"}>ketua</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Alamat" name="address" value={formData.address} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="No. Telepon" name="telephone" value={formData.telephone} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={formData.active} onChange={handleCheckboxChange} name="active" />} label="Active" />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </>
      ) : (
        <Grid item xs={12}>
          <Users setSelectedLink={setSelectedLink} link={link} /> {/* Menampilkan kembali tabel user jika showAddUser bernilai false */}
        </Grid>
      )}
    </Grid>
  );
};

export default AddUser;
