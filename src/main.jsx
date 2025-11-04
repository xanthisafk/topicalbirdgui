import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";

// Import all the components
import Home from "./components/pages/Home";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Register from "./components/auth/Register";
import Account from "./components/auth/Account";
import Nest from "./components/pages/Nest";
import Feed from "./components/pages/Feed";
import Users from "./components/pages/Users";
import Search from "./components/pages/Search";
import NestDetail from "./components/pages/NestDetail";
import NestSettings from "./components/pages/NestSettings";
import Profile from "./components/pages/Profile";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "logout",
            element: <Logout />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "account",
            element: <Account />,
          },
        ],
      },
      {
        path: "/nest",
        element: <Nest />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/n/:slug",
        element: <NestDetail />,
      },
      {
        path: "/n/:slug/settings",
        element: <NestSettings />,
      },
      {
        path: "/p/:slug",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);