import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NavBar from "./NavBar"
import Login from "./Login"
import Home from "./Home"

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