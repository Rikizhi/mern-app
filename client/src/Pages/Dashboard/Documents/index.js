import React, { useEffect } from "react";
import FileTable from "../../../Components/FileTable";

const Documents = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  return (
    <>
      <FileTable />
    </>
  );
};

export default Documents;
