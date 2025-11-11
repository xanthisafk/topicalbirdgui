import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "@/styles/main.css";

// Import all the components
import Home from "./components/pages/Home";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Account from "./components/pages/auth/Account";
import Nest from "./components/pages/nest/Nest";
import Feed from "./components/pages/Feed";
import Users from "./components/pages/Users";
import Search from "./components/pages/Search";
import NestDetail from "./components/pages/nest/NestDetail";
import NestSettings from "./components/pages/nest/NestSettings";
import Post from "./components/pages/Post";
import App from "./App";

import { ThemeProvider } from "./components/ThemeProvider";
import { SnackbarProvider } from "./components/SnackbarProvider";
import { PopupProvider } from "./components/PopupProvider";
import NewPost from "./components/pages/nest/NewPost";
import { Goal } from "lucide-react";

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
        children: [
          {
            path: "login",
            element: <Login />,
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
        element: <Navigate to="/nests" />
      },
      {
        path: "/nests",
        element: <Nest />
      },
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/u/:username",
        element: <Users />,
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/search/:query",
        element: <Search />,
      },
      {
        path: "/n",
        children: [
          {
            path: ":slug",
            element: <NestDetail />
          },
          {
            path: ":slug/settings",
            element: <NestSettings />,
          },
          {
            path: ":slug/new",
            element: <NewPost />
          }
        ]
      },

      {
        path: "/p/:id",
        element: <Post />,
      },
      {
        path: "*",
        element: <Navigate to="/" />
      }
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