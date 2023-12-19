import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/document";

export const getDocuments = async (dispatch) => {
  const response = await fetch(url); // Ganti 'url' dengan URL endpoint Anda
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  if (data.success) {
    // Ubah struktur data untuk menambah properti 'id' dengan nilai '_id'
    const modifiedData = data.result.map((row) => ({ ...row, id: row._id }));

    dispatch({ type: "UPDATE_DOCUMENTS", payload: modifiedData });
    return modifiedData; // Return the modified data with 'id'
  } else {
    throw new Error(data.message);
  }
};

export const addDocument = async (document, dispatch) => {
  try {
    const result = await fetchData(
      {
        url: `${url}/addDocument`,
        method: "POST",
        body: document,
      },
      dispatch
    );

    if (result) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Document berhasil ditambahkan",
        },
      });
    }
  } catch (error) {
    console.error("Gagal menambahkan dokumen:", error.message);
  }
};

export const updateDocument = async (updatedFields, documentId, dispatch) => {
  try {
    const result = await fetchData(
      {
        url: `${url}/updateDocument/${documentId}`,
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
          message: "Changes to the document were successfully saved",
        },
      });
    }
    return result;
  } catch (error) {
    console.error("Error updating document:", error.message);
    throw error;
  }
};

export const deleteDocument = async (documentId, dispatch) => {
  try {
    const result = await fetchData(
      {
        url: `${url}/deleteDocument/${documentId}`,
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
          message: "Document berhasil dihapus",
        },
      });
    }
  } catch (error) {
    console.error("Gagal menghapus document:", error.message);
  }
};