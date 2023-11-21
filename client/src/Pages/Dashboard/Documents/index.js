import React, { useEffect } from "react";

const Documents = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  return <div>Documents</div>;
};

export default Documents;
