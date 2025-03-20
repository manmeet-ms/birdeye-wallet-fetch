import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import V1 from "./pages/versions/V1.jsx";
import V2 from "./pages/versions/V2.jsx";
import Changelog from "./pages/changelog.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/v1",
    element: <V1 />,
  },
  {
    path: "/v2",
    element: <V2 />,
  },
  {
    path: "/changelog",
    element: <Changelog />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>
);
