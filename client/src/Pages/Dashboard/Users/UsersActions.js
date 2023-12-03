import { Box, CircularProgress, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import { Check, Save } from "@mui/icons-material";
import { updateStatus } from "../../../actions/user";
import { useValue } from "../../../Context/ContextProvider";

const UsersActions = ({ params, rowId, setRowId }) => {
  const { dispatch } = useValue();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const { name, email, role, active, division, age, address, telephone, _id } = params.row;
    const result = await updateStatus({ name, email, role, active, division, age, address, telephone }, _id, dispatch);
    if (result) {
      setSuccess(true);
      setRowId(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success ? (
        <Fab size="small" color="primary">
          <Check />
        </Fab>
      ) : (
        <Fab size="small" color="primary" onClick={handleSubmit}>
          {loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
        </Fab>
      )}
    </Box>
  );
};

export default UsersActions;
