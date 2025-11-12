import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "@/styles/main.css";

import App from "./App";

// Pages
import Home from "./components/pages/Home";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Account from "./components/pages/auth/Account";
import Nest from "./components/pages/nest/Nest";
import NewNest from "./components/pages/nest/NewNest";
import NestDetail from "./components/pages/nest/NestDetail";
import NestSettings from "./components/pages/nest/NestSettings";
import NewPost from "./components/pages/nest/NewPost";
import Feed from "./components/pages/Feed";
import Users from "./components/pages/Users";
import Search from "./components/pages/Search";
import Post from "./components/pages/Post";

// Providers
import { ThemeProvider } from "./components/ThemeProvider";
import { SnackbarProvider } from "./components/SnackbarProvider";
import { PopupProvider } from "./components/PopupProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },

      // Auth routes
      {
        path: "auth",
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "account", element: <Account /> },
        ],
      },

      // Nests section
      {
        path: "nests",
        children: [
          { index: true, element: <Nest /> },
          { path: "new", element: <NewNest /> },
        ],
      },

      // Nest detail routes (/n/:slug)
      {
        path: "n/:slug",
        children: [
          { index: true, element: <NestDetail /> },
          { path: "settings", element: <NestSettings /> },
          { path: "new", element: <NewPost /> },
        ],
      },

      // Other pages
      { path: "feed", element: <Feed /> },
      { path: "u/:username", element: <Users /> },
      {
        path: "search",
        children: [
          { index: true, element: <Search /> },
          { path: ":query", element: <Search /> },
        ],
      },
      { path: "p/:id", element: <Post /> },

      // Catch-all redirect
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <SnackbarProvider>
      <PopupProvider>
        <RouterProvider router={router} />
      </PopupProvider>
    </SnackbarProvider>
  </ThemeProvider>
);
