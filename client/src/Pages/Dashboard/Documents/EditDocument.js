import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { getDocuments, updateDocument } from "../../../actions/document";
import uploadFile from "../../../firebase/uploadFile";

const EditDocument = ({ selectedDocument, setShowEditDocument, handleFileChange, dispatch }) => {
  const [editedDocument, setEditedDocument] = useState(selectedDocument);
  const [previewURL, setPreviewURL] = useState(selectedDocument.fileURL);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDocument({ ...editedDocument, [name]: value });
  };

  const handleUpdateDocument = async () => {
    try {
      if (selectedFile) {
        // Mengunggah foto baru ke Firebase Storage
        const fileURL = await uploadFile(selectedFile, `document/${selectedFile.name}`);

        // Update URL gambar event di database dengan URL yang baru diunggah
        const updatedDocument = { ...editedDocument, fileURL }; // Gunakan URL baru untuk gambar Document
        await updateDocument(updatedDocument, editedDocument.id, dispatch);

        // Setelah berhasil diupdate, kembalikan ke tampilan tabel Document
        setShowEditDocument(false);

        // Panggil kembali getEvents untuk mendapatkan data terbaru
        getDocuments(dispatch); // Pastikan getDocuments telah didefinisikan di sini
      } else {
        // Jika tidak ada gambar yang dipilih, lanjutkan dengan pembaruan lainnya tanpa mengubah gambar
        const updatedDocument = { ...editedDocument };
        await updateDocument(updatedDocument, editedDocument.id, dispatch);

        // Setelah berhasil diupdate, kembalikan ke tampilan tabel Document
        setShowEditDocument(false);

        // Panggil kembali getDocuments untuk mendapatkan data terbaru
        getDocuments(dispatch); // Pastikan getEvents telah didefinisikan di sini
      }
    } catch (error) {
      console.error("Error updating document:", error.message);
    }
  };

  return (
   <Grid container spacing={2}>
     <Grid item xs={6}>
       <Typography variant="h5">Edit Dokumen</Typography>
     </Grid>
     <Grid item xs={6} container justifyContent="flex-end">
       <Button variant="contained" onClick={() => setShowEditDocument(false)}>
         Kembali
       </Button>
     </Grid>
     <Grid item xs={12}>
       <TextField label="Nama File" name="name" value={editedDocument.name} onChange={handleInputChange} fullWidth />
     </Grid>
     <Grid item xs={12}>
       <TextField label="Deskripsi" name="desc" value={editedDocument.desc} onChange={handleInputChange} fullWidth />
     </Grid>
     <Grid item xs={12}>
       <FormControl fullWidth>
         <InputLabel id="type-label">Jenis File</InputLabel>
         <Select labelId="type-label" id="type" name="type" value={editedDocument.type} label="Type" onChange={handleInputChange}>
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
       <Button variant="contained" onClick={handleUpdateDocument}>
         Simpan
       </Button>
     </Grid>
   </Grid>
 );
};

export default EditDocument;
