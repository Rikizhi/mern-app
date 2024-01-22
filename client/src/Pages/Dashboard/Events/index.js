import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";
import { deleteEvent, getEvents } from "../../../actions/event";
import { useValue } from "../../../Context/ContextProvider";
import moment from "moment";
import { Delete, Edit } from "@mui/icons-material";

const Events = ({ setSelectedLink, link }) => {
  const { state, dispatch } = useValue();
  const { events } = state;
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showEditEvent, setShowEditEvent] = useState(false);

  useEffect(() => {
    setSelectedLink(link);
    getEvents(dispatch).then((data) => {
      if (data) {
      }
    });
  }, [dispatch, setSelectedLink, link]);

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEditEvent(true);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId, dispatch);

      // Ambil kembali data terbaru dari server setelah penghapusan berhasil
      const updatedEvents = await getEvents(dispatch);
      dispatch({ type: "UPDATE_EVENTS", payload: updatedEvents });
    } catch (error) {
      console.error("Error deleting event:", error.message);
    }
  };
  

  const columns = [
    {
      field: "name",
      headerName: "Nama Kegiatan",
      width: 250,
    },
    {
      field: "date",
      headerName: "Tanggal Kegiatan",
      width: 250,
      renderCell: (params) => moment(params.row.date).format("MM-DD-YYYY"),
    },
    {
      field: "photoURL",
      headerName: "Foto Kegiatan",
      width: 300,
      renderCell: (params) => (
        <img
          src={params.row.photoURL}
          alt="Event"
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
      field: "desc",
      headerName: "Deskripsi",
      width: 300,
    },
    {
      field: "done",
      headerName: "Terlaksana",
      type: "boolean",
      width: 100,
    },
    {
      field: "location",
      headerName: "Lokasi",
      width: 300,
    },
    {
      field: "id",
      headerName: "ID",
      width: 300,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
        <IconButton onClick={() => handleEditEvent(params.row)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => handleDeleteEvent(params.row.id)}>
        <Delete />
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
      {!showAddEvent && !showEditEvent ? (
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
            getRowHeight={() => 'auto'}
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
      ) : showAddEvent ? (
        <AddEvent setSelectedLink={setSelectedLink} link={link} setShowAddEvent={setShowAddEvent} />
      ) : (
        <EditEvent selectedEvent={selectedEvent} setShowEditEvent={setShowEditEvent} dispatch={dispatch} />
      )}
    </Box>
  );
};

export default Events;
