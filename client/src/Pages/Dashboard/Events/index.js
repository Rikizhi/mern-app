import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import CreateEvent from "./CreateEvent";

const Events = ({ setSelectedLink, link }) => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/event');
    
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
    
        const data = await response.json();
        console.log('Data received:', data); // Tambahkan ini untuk log respons yang diterima
        setEvents(data || []); // Ubah setEvents menjadi data langsung jika strukturnya array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleShowForm = () => {
    setShowCreateEvent(true);
  };

  const handleBack = () => {
    setShowCreateEvent(false);
  };

  const handleCreateEvent = (newEvent) => {
    setEvents([...events, newEvent]); // Update events array with newly created event
    handleBack(); // Hide create event form
  };

  const columns = [
    {
      field: "name",
      headerName: "Nama Kegiatan",
      width: 200,
    },
    {
      field: "date",
      headerName: "Tanggal Kegiatan",
      width: 150,
    },
    {
      field: "photoURL",
      headerName: "Foto Kegiatan",
      width: 150,
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
  ];

  return (
    <Box sx={{ width: "90vw", height: "100%" }}>
      {!showCreateEvent ? (
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
              Kegiatan
            </Typography>
            <Button variant="contained" onClick={handleShowForm}>
              Tambah Kegiatan
            </Button>
          </Box>
          <DataGrid
            columns={columns}
            rows={events}
            autoHeight
            autoWidth
            getRowId={(row) => row.id}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) => (theme.palette.mode === "light" ? grey[200] : grey[900]),
              },
            }}
          />
        </>
      ) : (
        <CreateEvent handleBack={handleBack} handleCreateEvent={handleCreateEvent} />
      )}
    </Box>
  );
};

export default Events;
