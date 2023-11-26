import React from "react";
import Routing from "./Config"
import { Notification } from "./Components";
import Loading from "./Components/Loading";

function App() {
  return (
    <> 
    <Routing />
    <Notification />
    <Loading />
    </>
  );
}

export default App;
