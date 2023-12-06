import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";
import { getEvents } from "../../../actions/event";
import { useValue } from "../../../Context/ContextProvider";

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
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <button onClick={() => handleEditEvent(params.row)}>Edit</button>
      ),
    },
  ];

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEditEvent(true);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      {!showEditEvent && !showAddEvent ? (
        <div>
          <DataGrid
            rows={events} // Ganti dengan sumber data events Anda
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onRowClick={(row) => handleEditEvent(row.row)}
          />
          <button onClick={() => setShowAddEvent(true)}>Tambah Event</button>
        </div>
      ) : showEditEvent ? (
        <EditEvent
          selectedEvent={selectedEvent}
          setShowEditEvent={setShowEditEvent}
        />
      ) : (
        <AddEvent
          setSelectedLink={setSelectedLink}
          link={link}
          setShowAddEvent={setShowAddEvent}
        />
      )}
    </div>
  );
};

export default Events;
