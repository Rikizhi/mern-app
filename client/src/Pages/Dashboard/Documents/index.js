import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Visibility, Edit } from "@mui/icons-material";
import { getDocuments } from "../../../actions/document";
import { useValue } from "../../../Context/ContextProvider";
import moment from "moment";
import { grey } from "@mui/material/colors";
import AddDocument from "./AddDocument";
import EditDocument from "./EditDocument";

const DocumentTable = ({ setSelectedLink, link }) => {
  const { state, dispatch } = useValue();
  const { documents } = state;
  const [selectedDocument, setSelectedDocument] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [showEditDocument, setShowEditDocument] = useState(false);

  useEffect(() => {
    setSelectedLink(link);
    getDocuments(dispatch);
  }, [dispatch, setSelectedLink, link]);

  const handlePreview = (document) => {
    setSelectedDocument(document);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setSelectedDocument(null);
    setShowPreview(false);
  };

  const handleEditDocument = (document) => {
    setSelectedDocument(document);
    setShowEditDocument(true);
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
      field: "size",
      headerName: "Ukuran File",
      width: 150,
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
          <IconButton onClick={() => handlePreview(params.row.id)}>
            <Visibility />
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
            <Button variant="contained" onClick={() => setShowAddDocument(true)}>Tambah Dokumen</Button>
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
    </Box>
  );
};

export default DocumentTable;
