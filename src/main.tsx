import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./App.css";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root.tsx";
import { ThemeProvider } from "./components/Theme/theme-provider.tsx";
import TasksPage from "./routes/TasksPage/TasksPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/", // Добавьте этот путь
        element: <TasksPage />,
      },
      {
        path: "/tasks/:statusTask",
        element: <TasksPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
