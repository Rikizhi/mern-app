import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { Visibility, Edit } from "@mui/icons-material";
import { getDocuments } from "../../../actions/document";
import { useValue } from "../../../Context/ContextProvider";
import moment from "moment";
import { grey } from "@mui/material/colors";
import AddDocument from "./AddDocument";
import EditDocument from "./EditDocument";
import Preview from "../../../Components/File/Preview";

const DocumentTable = ({ setSelectedLink, link }) => {
  const { state, dispatch } = useValue();
  const { documents } = state;
  const [selectedDocument, setSelectedDocument] = useState(false);
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [showEditDocument, setShowEditDocument] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    setSelectedLink(link);
    getDocuments(dispatch).then((data) => {
      if (data) {
      }
    });
  }, [dispatch, setSelectedLink, link]);

  const handleEditDocument = (document) => {
    setSelectedDocument(document);
    setShowEditDocument(true);
  };

  const handlePreviewFile = (fileUrl, fileType) => {
    setSelectedFile(fileUrl);
    setSelectedFileType(fileType);
    setShowPreviewModal(true);
  };

  const handleClosePreview = () => {
    setSelectedFile(null);
    setShowPreviewModal(false);
  };

  const columns = [
    {
      field: "name",
      headerName: "Nama File",
      width: 200,
    },
    {
      field: "type",
      headerName: "Jenis File",
      type: "singleSelect",
      valueOptions: ["dokumen", "surat keterangan", "surat resmi", "proposal"],
      width: 150,
    },
    {
      field: "desc",
      headerName: "Deskripsi",
      width: 200,
    },
    {
      field: "size",
      headerName: "Ukuran File",
      width: 150,
    },
    {
      field: "fileType",
      headerName: "Tipe File",
      width: 150,
    },
    {
      field: "fileURL",
      headerName: "FIle",
      width: 150,
      renderCell: (params) => (
        <embed
          src={params.row.fileURL}
          alt="File"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: 200,
            maxHeight: 200,
          }}
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Tanggal Unggah",
      width: 200,
      renderCell: (params) => moment(params.row.createdAt).format("DD-MM-YYYY"),
    },
    {
      field: "actions",
      headerName: "Aksi",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton>
            <Visibility onClick={() => handlePreviewFile(params.row.fileURL)} />
          </IconButton>
          <IconButton onClick={() => handleEditDocument(params.row.id)}>
            <Edit />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "90vw",
        height: "100%",
      }}
    >
      {!showAddDocument && !showEditDocument ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              marginBottom: 3,
            }}
          >
            <Typography variant="h3" component="h3" sx={{ textAlign: "center" }}>
              Manage Documents
            </Typography>
            <Button variant="contained" onClick={() => setShowAddDocument(true)}>
              Tambah Dokumen
            </Button>
          </Box>
          <DataGrid
            columns={columns}
            rows={documents}
            autoHeight
            autoWidth
            getRowId={(row) => row._id}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            sx={{
              "& .MuiDataGrid-row": {
                bgcolor: (theme) => (theme.palette.mode === "light" ? grey[200] : grey[900]),
              },
            }}
          />
        </>
      ) : showAddDocument ? (
        <AddDocument setSelectedLink={setSelectedLink} link={link} setShowAddDocument={setShowAddDocument} />
      ) : (
        <EditDocument selectedDocument={selectedDocument} setShowEditDocument={setShowEditDocument} dispatch={dispatch} />
      )}
      {showPreviewModal && (
      <Modal
        open={showPreviewModal}
        onClose={handleClosePreview}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          maxWidth: '90%',
          maxHeight: '90%',
          overflow: 'auto',
        }}>
          {selectedFile && <Preview fileURL={selectedFile} />} {/* Mengirim URL file untuk ditampilkan */}
          <Button onClick={handleClosePreview}>Close Preview</Button>
        </div>
      </Modal>
    )}
    </Box>
  );
};

export default DocumentTable;
