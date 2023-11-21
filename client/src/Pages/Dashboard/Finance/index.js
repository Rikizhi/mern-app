import React, { useEffect } from "react";

const Finance = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  return <div>Finance</div>;
};

export default Finance;
