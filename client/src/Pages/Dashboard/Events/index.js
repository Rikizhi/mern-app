import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";
import { getEvents } from "../../../actions/event";
import { useValue } from "../../../Context/ContextProvider";
import moment from "moment";

const Events = ({ setSelectedLink, link }) => {
  const { state, dispatch } = useValue();
  const [showEditEvent, setShowEditEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);

  const { events } = state;

  useEffect(() => {
    setSelectedLink(link);
    getEvents(dispatch).then((data) => {
      if (data) {
      }
    });
  }, [dispatch, setSelectedLink, link]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "name",
      headerName: "Nama Kegiatan",
      width: 200,
    },
    {
      field: "date",
      headerName: "Tanggal Kegiatan",
      width: 150,
      renderCell: (params) => moment(params.row.date).format("MM-DD-YYYY"),
    },
    {
      field: "photoURL",
      headerName: "Foto Kegiatan",
      width: 150,
      renderCell: (params) => (
        <img src={params.row.photoURL} alt="Event" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      field: "desc",
      headerName: "Deskripsi",
      width: 150,
    },
    {
      field: "location",
      headerName: "Lokasi",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" onClick={() => handleEditEvent(params.row)}>
          Edit
        </Button>
      ),
    },
  ];

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEditEvent(true);
  };

  return (
    <Box
      sx={{
        width: "90vw",
        height: "100%",
      }}
    >
      {!showEditEvent && !showAddEvent ? (
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
              Manage Events
            </Typography>
            <Button variant="contained" onClick={() => setShowAddEvent(true)}>
              Tambah Kegiatan
            </Button>
          </Box>
          <DataGrid
            columns={columns}
            rows={events}
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
      ) : showEditEvent ? (
        <EditEvent selectedEvent={selectedEvent} setShowEditEvent={setShowEditEvent} dispatch={dispatch} />
      ) : (
        <AddEvent setSelectedLink={setSelectedLink} link={link} setShowAddEvent={setShowAddEvent} />
      )}
    </Box>
  );
};

export default Events;
