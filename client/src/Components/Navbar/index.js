import React from "react";
import { useValue } from "../../Context/ContextProvider";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Lock} from "@mui/icons-material";
import UserIcons from "../User/UserIcons";
import { createTheme, ThemeProvider } from "@mui/material/styles"

const NavBar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const theme = createTheme({
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#00B4D8',
          },
        },
      },
    },
  });
  

  return (
    <ThemeProvider theme={theme}>
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" component="h1" noWrap sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            My Mern
          </Typography>
          <Typography variant="h6" component="h1" noWrap sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            M&M
          </Typography>
          {!currentUser ? (
            <Button color="inherit" startIcon={<Lock />} onClick={() => dispatch({ type: "OPEN_LOGIN" })}>
              Login
            </Button>
          ) : (
            <UserIcons />
          )}
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
