import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useValue } from "../../Context/ContextProvider";
import { useEffect, useRef, useState } from "react";
import { Close, Send } from "@mui/icons-material";
import PasswordField from "./PasswordField";

const Login = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  const [ title, setTitle ] = useState('Login');
  const [ isRegister, setIsRegister ] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(()=>{
    isRegister ? setTitle('Register') : setTitle('Login');
  }, [isRegister]);

  return (
    <Dialog open={openLogin}
      onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Tolong isi Informasi Anda di bawah sini:
          </DialogContentText>
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
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px:'19px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{justifyContent:'left', p:'5px 24px'}}>
        {isRegister?'Do you have an account? Sign in now ' : "Don't you have an account? Create one now "}
        <Button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Login' : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
