import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import Home from "./Home";
import Wishlist from "./Wishlist";
import Register from "./Register";
import MyItems from "./MyItems";
import Profile from "./Profile";
import AuthProvider from "../hooks/AuthProvider";
import SellItem from "./SellItem";
import Sale from "./Sale"


const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBarWrapper />,
      children: [
        {
          path: "/index",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/wishlist",
          element: <Wishlist />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/my_items",
          element: <MyItems />,
        },
        {
          path: "/sell/:itemId",
          element: <SellItem />,
        },
        {
          path:"/seller/:sellerId",
          element: <Sale/>,
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

const NavBarWrapper = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Outlet />
      </AuthProvider>
    </>
  );
};
export default Router;
