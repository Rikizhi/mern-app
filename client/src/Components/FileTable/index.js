import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Modal, Grid } from "@mui/material";
import FilePreview from "./FilePreview"; // Komponen FilePreview yang telah dibuat sebelumnya
import uploadFile, { deleteFile } from "../../firebase/uploadFile";
import { v4 as uuidv4 } from "uuid";
import { useValue } from "../../Context/ContextProvider";

const FileTable = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openPreview, setOpenPreview] = useState(false); // State to manage modal open/close
  const { state, dispatch } = useValue();

  const loadFilesFromLocalStorage = () => {
    const storedFiles = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("file_")) {
        const file = JSON.parse(localStorage.getItem(key));
        storedFiles.push(file);
      }
    }
    setFiles(storedFiles);
  };

  useEffect(() => {
    loadFilesFromLocalStorage();
  }, []); // Memastikan hanya dijalankan sekali saat komponen dimuat pertama kali

  const handleFileUpload = async (event) => {
    try {
      dispatch({ type: "START_LOADING" }); // Memulai loading saat upload dimulai

      const newFiles = event.target.files;
      const filesArray = [];
      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        try {
          const url = await uploadFile(file, `documents/${file.name}`);
          const fileObject = {
            id: uuidv4(), // Menggunakan UUID sebagai id
            name: file.name,
            type: file.type,
            size: file.size,
            uploadDate: new Date().toLocaleDateString(),
            file: file,
            url: url,
          };
          filesArray.push(fileObject);
          localStorage.setItem(`file_${fileObject.id}`, JSON.stringify(fileObject));
        } catch (error) {
          console.error("Failed to upload file:", error.message);
        }
      }
      setFiles([...files, ...filesArray]); // Gunakan setFiles untuk memperbarui state files

      dispatch({ type: "END_LOADING" }); // Mengakhiri loading setelah upload selesai
      dispatch({
        type: "UPDATE_ALERT",
        payload: { open: true, severity: "success", message: "File uploaded successfully!" },
      }); // Menampilkan notifikasi sukses
    } catch (error) {
      console.error("Failed to upload file:", error.message);
      dispatch({
        type: "UPDATE_ALERT",
        payload: { open: true, severity: "error", message: "Failed to upload file!" },
      }); // Menampilkan notifikasi error
    }
  };

  const bytesToMB = (bytes) => {
    if (bytes === 0) return "0 MB";
    const mb = bytes / (1024 * 1024);
    return `${Math.round(mb * 100) / 100} MB`;
  };

  const handlePreview = (file) => {
    setSelectedFile(file);
    setOpenPreview(true); // Open modal for file preview
  };

  const handleClosePreview = () => {
    setSelectedFile(null);
    setOpenPreview(false); // Close modal for file preview
  };

  const handleDownload = (file) => {
    const url = URL.createObjectURL(file.file);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  const handleDelete = async (fileToDelete) => {
    try {
      await deleteFile(fileToDelete.url); // Menghapus file dari Firebase
      localStorage.removeItem(`file_${fileToDelete.id}`); // Menghapus dari localStorage
      const updatedFiles = files.filter((file) => file.id !== fileToDelete.id);
      setFiles(updatedFiles); // Mengupdate state untuk menghapus file dari tampilan UI
    } catch (error) {
      console.error("Failed to delete file:", error.message);
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" component="label" style={{ marginBottom: "20px" }}>
            Upload File
            <input type="file" onChange={handleFileUpload} hidden multiple accept=".pdf,.doc,.docx,.jpg,.png" />
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nama File</TableCell>
                  <TableCell>Tipe File</TableCell>
                  <TableCell>Ukuran File</TableCell>
                  <TableCell>Tanggal Unggah</TableCell>
                  <TableCell>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>{file.name}</TableCell>
                    <TableCell>{file.type}</TableCell>
                    <TableCell>{bytesToMB(file.size)}</TableCell>
                    <TableCell>{file.uploadDate}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handlePreview(file)}>Preview</IconButton>
                      <IconButton onClick={() => handleDownload(file)}>Download</IconButton>
                      <IconButton onClick={() => handleDelete(file)}>Delete</IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Modal for file preview */}
      <Modal
        open={openPreview}
        onClose={handleClosePreview}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            width: "75%",
            height: "75vh",
            maxWidth: "90%", // Sesuaikan dengan lebar maksimum yang diinginkan
            maxHeight: "90vh", // Sesuaikan dengan tinggi maksimum yang diinginkan
            overflow: "auto",
          }}
        >
          {selectedFile && <FilePreview file={selectedFile} />}
        </div>
      </Modal>
    </div>
  );
};

export default FileTable;
