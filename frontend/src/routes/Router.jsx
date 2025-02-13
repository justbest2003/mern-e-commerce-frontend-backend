import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Index";
import Cart from "../pages/Cart/Index";
import UserProfile from "../pages/Setting/Index";
import Profile from "../pages/Profile/Index";

import ProtectPage from "../pages/Cart/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: (
          <ProtectPage>
            <Cart />
          </ProtectPage>
        ),
      },
      {
        path: "/update-profile",
        element: (
          <ProtectPage>
            <UserProfile />
          </ProtectPage>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectPage>
            <Profile />
          </ProtectPage>
        ),
      },
    ],
  },
]);

export default router;
