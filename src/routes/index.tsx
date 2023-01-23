import { App } from "~/App";
import { Home, CreatePost } from "~/pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
    ],
  },
]);
