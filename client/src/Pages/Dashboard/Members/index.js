import React, { useEffect } from "react";

const Members = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  return <div>Members</div>;
};

export default Members;
