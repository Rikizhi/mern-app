import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/event";

export const getEvents = async (dispatch) => {
  const response = await fetch(url); // Ganti 'url' dengan URL endpoint Anda
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  if (data.success) {
    // Ubah struktur data untuk menambah properti 'id' dengan nilai '_id'
    const modifiedData = data.result.map((row) => ({ ...row, id: row._id }));

    dispatch({ type: "UPDATE_EVENTS", payload: modifiedData });
    return modifiedData; // Return the modified data with 'id'
  } else {
    throw new Error(data.message);
  }
};

export const updateEvent = async (updatedFields, eventId, dispatch) => {
  try {
    const result = await fetchData(
      {
        url: `${url}/updateEvent/${eventId}`,
        method: "PATCH",
        body: updatedFields,
      },
      dispatch
    );

    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Perubahan pada event berhasil disimpan",
        },
      });
    }
    return result;
  } catch (error) {
    console.error("Error updating event:", error.message);
  }
};

export const addEvent = async (event, dispatch) => {
  try {
    const result = await fetchData(
      {
        url: `${url}/addEvent`,
        method: "POST",
        body: event,
      },
      dispatch
    );

    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Event berhasil ditambahkan",
        },
      });
    }
  } catch (error) {
    console.error("Gagal menambahkan event:", error.message);
  }
};

export const deleteEvent = async (eventId, dispatch) => {
  try {
    const result = await fetchData(
      {
        url: `${url}/deleteEvent/${eventId}`,
        method: "DELETE",
      },
      dispatch
    );

    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Event berhasil dihapus",
        },
      });
    }
  } catch (error) {
    console.error("Gagal menghapus event:", error.message);
  }
};
