import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import App from "App";
import Main from "./pages/Main";
import { ROUTE_PATHS } from "routes/routes.constant";
import CatalogAdmin from "admin/CatalogAdmin";
import CatalogMerchant from "merchant/CatalogMerchant";
import "./index.css";

const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.REGISTER,
    element: <div>Cadastro do usuário</div>
  },
  {
    path: ROUTE_PATHS.LOGIN,
    element: <App />,
  },
  {
    path: ROUTE_PATHS.FORGOT_PASSWORD,
    element: <div>Esqueci minha senha</div>,
  },
  {
    element: <Main />,
    children: [
      {
        path: ROUTE_PATHS.CATALOG,
        element: <CatalogAdmin />
      },
      {
        path: ROUTE_PATHS.MERCHANT,
        element: <CatalogMerchant />
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to={ROUTE_PATHS.LOGIN} replace  />  
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
