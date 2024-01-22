import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import CuisinesListPage from "./pages/CuisinesListPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CuisineAddPage from "./pages/CuisineAddPage.jsx";
import CuisineDetailPage from "./pages/CuisineDetailPage.jsx";
import CuisineEditPage from "./pages/CuisineEditPage.jsx";
import CategoryListPage from "./pages/CategoryListPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function authentication() {
  const access_token = localStorage.access_token;
  if (!access_token) {
    throw redirect(`/login`);
  }
  return null;
}

function authLogin() {
  const access_token = localStorage.access_token;
  if (access_token) {
    throw redirect(`/`);
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: authLogin,
  },
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <CuisinesListPage />,
        loader: authentication,
      },
      {
        path: "/add",
        element: <CuisineAddPage />,
        loader: authentication,
      },
      {
        path: "/details/:id",
        element: <CuisineDetailPage />,
        loader: authentication,
      },
      {
        path: "/edit/:id",
        element: <CuisineEditPage />,
        loader: authentication,
      },
      {
        path: "/categories",
        element: <CategoryListPage />,
        loader: authentication,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        loader: authentication,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
