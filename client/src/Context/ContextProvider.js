import { createContext, useContext, useEffect, useReducer, useState } from "react";
import reducer from "./Reducer";

const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: "info", message: "" },
  profile: { open: false, file: null, photoURL: "" },
  users: [],
  events: [],
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      dispatch({ type: "UPDATE_USER", payload: currentUser });
    }
    
     // Mengambil file dari penyimpanan lokal
    const storedFiles = [];
    for (let i = 1; i <= localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("file_")) {
        const file = JSON.parse(localStorage.getItem(key));
        storedFiles.push(file);
      }
    }
    if (storedFiles.length > 0) {
      setFiles([...files, ...storedFiles]); // Menggunakan setFiles untuk inisialisasi files
    }
  }, []); // Pastikan untuk menambahkan files sebagai dependency
  
  return <Context.Provider value={{ state, dispatch, files }}>{children}</Context.Provider>;
};

export default ContextProvider;
