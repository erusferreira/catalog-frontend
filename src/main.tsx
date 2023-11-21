import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import "./index.css";
import { ROUTES } from "routes";

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
    element: <div>Estou logado!</div>,
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
