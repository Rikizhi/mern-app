import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useValue } from "../../Context/ContextProvider";
import { useEffect, useRef, useState } from "react";
import PasswordField from "./PasswordField";
import { login, register } from "../../actions/user.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    dispatch,
  } = useValue();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Login");
  const [isRegister, setIsRegister] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!isRegister) {
      try {
        await login({ email, password }, dispatch);
        navigate('/dashboard');
      } catch (error) {
        console.error(error);
      }
    } else {
      const name = nameRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;
      if (password !== confirmPassword) {
        dispatch({
          type: "UPDATE_ALERT",
          payload: {
            open: true,
            severity: "error",
            message: "Passwords do not match",
          },
        });
      } else {
        try {
          await register({ name, email, password }, dispatch);
          navigate('/dashboard');
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  useEffect(() => {
    isRegister ? setTitle("Register") : setTitle("Login");
  }, [isRegister]);

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box p={4} boxShadow={3} borderRadius={2}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                {isRegister && (
                <TextField
                  autoFocus
                  margin="normal"
                  variant="standard"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  inputRef={nameRef}
                  inputProps={{ minLength: 2 }}
                  required
                />
              )}
              </Grid>
              <Grid item>
              <TextField
                autoFocus={!isRegister}
                margin="normal"
                variant="standard"
                id="email"
                label="Email"
                type="email"
                fullWidth
                inputRef={emailRef}
                required
              />
              </Grid>
              <Grid item>
                <PasswordField {...{ passwordRef }} />
                  {isRegister && (
                    <PasswordField
                      passwordRef={confirmPasswordRef}
                      id="confirmPassword"
                      label="Confirm Password"
                    />
                  )}
              </Grid>
              <Grid item>
                <Button variant="contained" type="submit" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography>
                  {isRegister
                    ? "Do you have an account? Sign in now "
                    : "Don't you have an account? Create one now "}
                  <Button onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? "Login" : "Register"}
                  </Button>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
