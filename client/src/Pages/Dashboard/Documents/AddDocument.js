import React, { useState } from "react";
import { Grid, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useValue } from "../../../Context/ContextProvider";
import uploadFile from "../../../firebase/uploadFile";
import { addDocument, getDocuments } from "../../../actions/document";

const AddDocument = ({ setShowAddDocument }) => {
  const { dispatch } = useValue();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [newDocument, setnewDocument] = useState({
    name: "",
    desc: "",
    type: "",
    size: "",
    fileURL: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewDocument({ ...newDocument, [name]: value });
  };

  const handleFileChange = (e) => {
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

  const handleAddDocument = async () => {
    try {
      if (selectedFile) {
        try {
          // Mengunggah foto ke Firebase hanya saat tombol simpan ditekan
          const fileURL = await uploadFile(selectedFile, `document/${selectedFile.name}`);

          // Simpan URL foto kegiatan ke dalam state atau variabel yang sesuai
          const updatedDocument = {
            ...newDocument,
            fileURL: fileURL,
          };

          // Setelah berhasil diunggah, simpan data kegiatan ke database
          await addDocument(updatedDocument, dispatch);

          // Clear input fields or perform any other necessary actions
          setnewDocument({
            name: "",
            desc: "",
            type: "",
            size: "",
            fileURL: "",
          });

          setSelectedFile(null); // Reset file yang dipilih setelah pengungahan
          setShowAddDocument(false); // Menghilangkan tampilan form AddDocument setelah berhasil menambah event

          // Ambil kembali data terbaru dari server setelah penambahan berhasil
          const updatedDocuments = await getDocuments(dispatch); // Gunakan fungsi getEvents untuk mendapatkan data terbaru

          // Update tampilan dengan data yang baru ditambahkan
          dispatch({ type: "UPDATE_DOCUMENTS", payload: updatedDocuments });
        } catch (error) {
          console.error("Error uploading file to Firebase:", error.message);
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
    setShowAddDocument(false); // Menghilangkan tampilan form AddDocument
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h5">Tambah Dokumen</Typography>
      </Grid>
      <Grid item xs={6} container justifyContent="flex-end">
        <Button variant="contained" onClick={handleBack}>
          Kembali
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Nama File" name="name" value={newDocument.name} onChange={handleInputChange} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Deskripsi" name="desc" value={newDocument.desc} onChange={handleInputChange} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="type-label">Jenis File</InputLabel>
          <Select labelId="type-label" id="type" name="type" value={setnewDocument.type} label="Type" onChange={handleInputChange}>
            <MenuItem value={"dokumen"}>dokumen</MenuItem>
            <MenuItem value={"surat keterangan"}>surat keterangan</MenuItem>
            <MenuItem value={"surat resmi"}>surat resmi</MenuItem>
            <MenuItem value={"proposal"}>proposal</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        {previewURL && <img src={previewURL} alt="Preview" style={{ maxWidth: 250, maxHeight: 250, width: "auto", height: "auto" }} />}
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" component="label">
          Upload Dokumen
          <input type="file" accept="file/*" style={{ display: "none" }} onChange={handleFileChange} />
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" onClick={handleAddDocument}>
          Simpan
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddDocument;
