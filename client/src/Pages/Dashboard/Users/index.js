import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useValue } from "../../../Context/ContextProvider";
import { getUsers } from "../../../actions/user";
import moment from "moment";
import { grey } from "@mui/material/colors";
import UsersActions from "./UsersActions";
import AddUser from "./AddUser";

const Users = ({ setSelectedLink, link }) => {
  const {
    state: { users },
    dispatch,
  } = useValue();

  const [rowId, setRowId] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [sortModel, setSortModel] = useState([
    {
      field: 'name',
      sort: 'asc', // Urutkan kolom 'Nama' secara ascending (asc)
    },
  ]);

  const handleAddUser = () => {
    setShowAddUserForm(true); // Ketika tombol "Tambah User" diklik, tampilkan form
  };

  useEffect(() => {
    setSelectedLink(link);
    if (users.length === 0) getUsers(dispatch);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "photoURL",
        headerName: "Foto",
        renderCell: (params) => <Avatar src={params.row.photoURL} />,
        sortable: false,
        filterable: false,
      },
      {
        field: "name",
        headerName: "Nama",
        editable: true,
        width: 150,
      },
      {
        field: "email",
        headerName: "Email",
        editable: true,
        width: 200,
      },
      {
        field: "role",
        headerName: "Role",
        type: "singleSelect",
        valueOptions: ["member", "admin", "superadmin"],
        editable: true,
        width: 100,
      },
      {
        field: "_id",
        headerName: "ID User",
        width: 200,
      },
      {
        field: "active",
        headerName: "Aktif",
        type: "boolean",
        editable: true,
        width: 100,
      },
      {
        field: "division",
        headerName: "Divisi",
        type: "singleSelect",
        valueOptions: ["anggota", "sekretaris", "bendahara", "wakil", "ketua"],
        editable: true,
        width: 100,
      },
      {
        field: "age",
        headerName: "Umur",
        editable: true,
        width: 100,
      },
      {
        field: "address",
        headerName: "Alamat",
        editable: true,
        width: 200,
      },
      {
        field: "telephone",
        headerName: "No. Telepon",
        editable: true,
        width: 150,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        renderCell: (params) => moment(params.row.createdAt).format("DD-MM-YYYY HH:MM:SS"),
        width: 150,
      },
      {
        field: "actions",
        headerName: "Aksi",
        type: "actions",
        renderCell: (params) => <UsersActions {...{ params, rowId, setRowId }} />,
        width: 200,
      },
    ],
    [rowId]
  );

  return (
    <Box
      sx={{
        width: "90vw",
        height: "100%",
      }}
    >
      {!showAddUserForm ? ( // Menggunakan kondisi untuk menampilkan tabel atau form
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
              Manage Users
            </Typography>
            <Button variant="contained" onClick={handleAddUser}>
              Tambah User
            </Button>
          </Box>
          <DataGrid
            columns={columns}
            rows={users}
            autoHeight
            autoWidth
            getRowId={(row) => row._id}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) => (theme.palette.mode === "light" ? grey[200] : grey[900]),
              },
            }}
            onCellEditCommit={(params) => setRowId(params.id)}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
          />
        </>
      ) : (
        <AddUser setSelectedLink={setSelectedLink} link={link} />
      )}
    </Box>
  );
};

export default Users;
