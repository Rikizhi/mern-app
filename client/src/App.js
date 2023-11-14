import React from "react";
import Routing from "./Config"
import Login from "./Components/User/Login";
import { Notification } from "./Components";
import Loading from "./Components/Loading";

function App() {
  return (
    <>
    <Routing />
    <Login />
    <Notification />
    <Loading />
    </>
  );
}

export default App;
