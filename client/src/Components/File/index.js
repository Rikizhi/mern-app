import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Modal, Grid, TablePagination, TableSortLabel, Checkbox, Typography, Tooltip, Toolbar } from "@mui/material";
import FilePreview from "./FilePreview";
import uploadFile, { deleteFile } from "../../firebase/uploadFile";
import { v4 as uuidv4 } from "uuid";
import { useValue } from "../../Context/ContextProvider";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Delete, Download, Edit, Visibility } from "@mui/icons-material";

// Function to compare values for sorting
function getComparator(order, orderBy) {
  return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const FileTable = () => {
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedFile, setSelectedFile] = useState([]);
  const [openPreview, setOpenPreview] = useState(false);
  const { dispatch } = useValue();
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [sortedFiles, setSortedFiles] = useState([]);

  useEffect(() => {
    // Menambahkan pengaturan awal untuk sortedFiles
    setSortedFiles(files);
  }, [files]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    // Menyimpan hasil sorting pada state sortedFiles
    const sorted = stableSort(files, getComparator(order, orderBy));
    setSortedFiles(sorted);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected([...sortedFiles]);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, file) => {
    const selectedIndex = selected.findIndex((selectedFile) => selectedFile.id === file.id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, file);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (file) => selected.indexOf(file) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
  }, []);

  const handleFileUpload = async (event) => {
    try {
      dispatch({ type: "START_LOADING" });

      const newFiles = event.target.files;
      const filesArray = [];
      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        try {
          const url = await uploadFile(file, `documents/${file.name}`);
          const fileObject = {
            id: uuidv4(),
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

      dispatch({ type: "END_LOADING" });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "File uploaded successfully!",
        },
      });
    } catch (error) {
      console.error("Failed to upload file:", error.message);
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: "Failed to upload file!",
        },
      });
    }
  };

  const getFileExtension = (fileName) => {
    const fileParts = fileName.split(".");
    return fileParts[fileParts.length - 1];
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

  const handleDeleteSelected = async () => {
    try {
      dispatch({ type: "START_LOADING" });

      const deletePromises = selected.map(async (fileToDelete) => {
        await deleteFile(fileToDelete.url); // Menghapus file dari Firebase
        localStorage.removeItem(`file_${fileToDelete.id}`); // Menghapus dari localStorage
      });

      await Promise.all(deletePromises);

      const updatedFiles = files.filter((file) => !selected.includes(file));
      setFiles(updatedFiles); // Mengupdate state untuk menghapus file dari tampilan UI

      setSelected([]); // Kosongkan array selected setelah penghapusan
      dispatch({ type: "END_LOADING" });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Files deleted successfully!",
        },
      });
    } catch (error) {
      console.error("Failed to delete files:", error.message);
      dispatch({ type: "END_LOADING" });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: "Failed to delete files!",
        },
      });
    }
  };

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    const handleDelete = () => {
      handleDeleteSelected();
    };

    return (
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        {numSelected > 0 ? (
          <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
            Dokumen
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton sx={{ ml: "auto" }} onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Tooltip>
        ) : null}
      </Toolbar>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    // ... (seleksi semua dan handler yang sudah ada)
                  />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleRequestSort("name")}
                  >
                    Nama File
                  </TableSortLabel>
                </TableCell>
                <TableCell>Tipe File</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "size"}
                    direction={orderBy === "size" ? order : "asc"}
                    onClick={() => handleRequestSort("size")}
                  >
                    Ukuran File
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "uploadDate"}
                    direction={orderBy === "uploadDate" ? order : "asc"}
                    onClick={() => handleRequestSort("uploadDate")}
                  >
                    Tanggal Unggah
                  </TableSortLabel>
                </TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      // ... (seleksi per baris dan handler yang sudah ada)
                    />
                  </TableCell>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>{file.type}</TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>{file.uploadDate}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handlePreview(file)}>
                      <Visibility />
                    </IconButton>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
    </Grid>
  );
};

export default FileTable;
