const fileUrl = process.env.REACT_APP_SERVER_URL + "/file";

export const handleFileUpload = async (file, dispatch) => {
  dispatch({ type: "START_LOADING" });

  try {
    const formData = new FormData();  
    formData.append("file", file);

    const result = await fetch(`${fileUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    if (result.ok) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "File uploaded successfully!",
        },
      });
    } else {
      throw new Error("Failed to upload file");
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
    console.error(error);
  }

  dispatch({ type: "END_LOADING" });
};

export const handleDeleteSelected = async (fileId, dispatch) => {
  dispatch({ type: "START_LOADING" });

  try {
    const result = await fetch(`${fileUrl}/${fileId}`, {
      method: "DELETE",
    });

    if (result.ok) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "File deleted successfully!",
        },
      });
    } else {
      throw new Error("Failed to delete file");
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
    console.error(error);
  }

  dispatch({ type: "END_LOADING" });
};
