import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getDocuments, updateDocument } from "../../../actions/document";
import uploadFile from "../../../firebase/uploadFile";

const EditDocument = ({ selectedDocument, setShowEditDocument, handleFileChange, dispatch }) => {
  const [editedDocument, setEditedDocument] = useState(selectedDocument);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setEditedDocument(selectedDocument);
  }, [selectedDocument]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDocument({ ...editedDocument, [name]: value });
  };

  const handleUpdateDocument = async () => {
    try {
      let updatedFields = { ...editedDocument };
      if (selectedFile) {
        const fileURL = await uploadFile(selectedFile, `document/${selectedFile.name}`);
        updatedFields = { ...editedDocument, fileURL };
      }
  
      // Pastikan _id terdefinisi dan valid di updatedFields sebelum permintaan PATCH
      if (updatedFields._id) {
        await updateDocument(updatedFields, updatedFields._id, dispatch);
        setShowEditDocument(false);
        const updatedDocuments = await getDocuments(dispatch);
        dispatch({ type: "UPDATE_DOCUMENTS", payload: updatedDocuments });
      } else {
        console.error("ID not defined or invalid");
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
