import uploadFile from "../firebase/uploadFile";
import fetchData from "./utils/fetchData";
import { v4 as uuidv4 } from "uuid";

const url = process.env.REACT_APP_SERVER_URL + "/user";

export const register = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData({ url: url + "/register", body: user }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
    dispatch({ type: "CLOSE_LOGIN" });
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Akun anda berhasil dibuat",
      },
    });
  }

  dispatch({ type: "END_LOADING" });
};

export const login = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData({ url: url + "/login", body: user }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
    dispatch({ type: "CLOSE_LOGIN" });
  }

  dispatch({ type: "END_LOADING" });
};

export const updateProfile = async (currentUser, updatedFields, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const { file, ...rest } = updatedFields;
  let body = { ...rest };
  try {
    if (file) {
      const imageName = uuidv4() + "." + file?.name?.split(".")?.pop();
      const photoURL = await uploadFile(file, `profile/${currentUser?.id}/${imageName}`);
      body = { ...body, photoURL };
    }
    const result = await fetchData(
      {
        url: url + "/updateProfile",
        method: "PATCH",
        body,
        token: currentUser.token,
      },
      dispatch
    );
    if (result) {
      dispatch({ type: "UPDATE_USER", payload: { ...currentUser, ...result } });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Akun anda berhasil diperbaharui",
        },
      });
      dispatch({ type: "UPDATE_PROFILE", payload: { open: false, file: null, photoURL: result.photoURL } });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "error",
        message: error.message,
      },
    });
    console.log(error);
  }

  dispatch({ type: "END_LOADING" });
};

export const getUsers = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_USERS", payload: result });
  }
};

export const updateStatus = async (updatedFields, userId, dispatch) => {
  try {
    const result = await fetchData(
      {
        url: `${url}/updateStatus/${userId}`,
        method: "PATCH",
        body: updatedFields,
      },
      dispatch
    );

    if (result) {
      // Tambahkan notifikasi untuk berhasil menyimpan perubahan pada status user
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Perubahan pada status user berhasil disimpan",
        },
      });
    }
    return result;
  } catch (error) {
    console.error("Error updating status:", error.message);
  }
};

export const addUser = async (user, dispatch) => {
  try {
    const result = await fetchData({
      url: `${url}/addUser`,
      method: "POST",
      body: user,
    }, dispatch);

    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "User berhasil ditambahkan",
        },
      });
    }
  } catch (error) {
    // Tangani kesalahan jika ada
    console.error("Gagal menambahkan pengguna:", error.message);
  }
};
