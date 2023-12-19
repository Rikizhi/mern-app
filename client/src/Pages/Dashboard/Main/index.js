import { Event, Group } from "@mui/icons-material";
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useValue } from "../../../Context/ContextProvider";
import { getUsers } from "../../../actions/user";
import moment from "moment";
import { getEvents } from "../../../actions/event";

const Main = ({ setSelectedLink, link }) => {
  const {
    state: { users, events },
    dispatch,
  } = useValue();
  useEffect(() => {
    setSelectedLink(link);
    if (users.length === 0) getUsers(dispatch);
    getEvents(dispatch);
  }, []);
  return (
    <Box
      sx={{
        display: { xs: "flex", md: "grid" },
        gridTemplateColumn: "repeat(3,1fr)",
        gridAutoRows: "minmax(100px, auto)",
        gap: 3,
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
        <Typography variant="h4">Total Members</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{users.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
        <Typography variant="h4">Total Events</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Event sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{events.length}</Typography> {/* Display total events */}
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: "1/4" }}>
        <Box>
          <Typography>Recently added Members</Typography>
          <List>
            {users.slice(0, 5).map((user, i) => (
              <Box key={user._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={user?.name} src={user?.photoURL} />
                  </ListItemAvatar>
                  <ListItemText primary={user?.name} secondary={`Time Created: ${moment(user?.createdAt).format("DD-MM-YYYY H:mm:ss")}`} />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
        <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
      </Paper>
      {/* <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}></Paper> */}
    </Box>
  );
};

export default Main;
