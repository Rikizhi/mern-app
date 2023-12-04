import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/event";

export const createEvent = async (eventData, dispatch) => {
  try {
    const result = await fetchData({ url: url + "/createEvent", body: eventData }, dispatch);
    if (result) {
      // Lakukan sesuatu dengan hasil yang diterima jika diperlukan
    }
  } catch (error) {
    // Tangani kesalahan jika ada
    console.error("Gagal membuat event:", error.message);
  }
};