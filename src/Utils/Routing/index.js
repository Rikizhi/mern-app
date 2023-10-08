import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import { Navigation } from "../../Templates";
import { Home, About, Events, News, Services } from "../../Pages";
export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },
  {
    path: "/",
    element: <Navigation />,
    children: [
      { path: "", element: <Home /> },
      { path: "about-us", element: <About /> },
      { path: "events", element: <Events /> },
      { path: "news", element: <News /> },
      { path: "our-services", element: <Services /> },
    ],
  },
]);
