import React, { useEffect } from "react";

const Events = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  return <div>Events</div>;
};

export default Events;
