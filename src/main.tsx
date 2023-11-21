import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { ROUTES } from "routes";
import App from "./App";
import Main from "@pages/Main";

const router = createBrowserRouter([
  {
    path: ROUTES.REGISTER,
    element: <div>Cadastro do usuário</div>,
  },
  {
    path: ROUTES.LOGIN,
    element: <App />,
  },
  {
    path: ROUTES.CATALOG,
    element: <Main />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <div>Esqueci minha senha</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
