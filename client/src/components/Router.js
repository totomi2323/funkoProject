import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavBar from "./NavBar"
import Login from "./Login"
import Home from "./Home"
import Wishlist from "./Wishlist"
import Register from "./Register";

import { Children } from "react";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element:<NavBarWrapper/>,
            children: [
                {
                    path:"/",
                    element:<Home/>
                },
                {
                    path:"/login",
                    element:<Login/>
                },
                {
                    path:"/wishlist",
                    element:<Wishlist/>
                },
                {
                    path:"/register",
                    element:<Register/>
                }
            ]
        }
    ]);
    return <RouterProvider router={router}/>;
}

const NavBarWrapper = () => {
    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}
export default Router;