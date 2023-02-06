import {createBrowserRouter} from "react-router-dom";
import React from "react";
import Signin from "../pages/Signin";
import Login from "../pages/Login";
import About from "../pages/About";
import AddEditProduct from "../pages/AddEditProduct";
import App from "../App";
import Shop from "../pages/Shop";
import Product from "../pages/Product";
import AdminPanel from "../pages/AdminPanel";
import Cart from "../pages/Cart";


export  const router = createBrowserRouter([
    {
        path: "/",
        element:<App />,
        children:[
            {
                path: "shop",
                element: <Shop></Shop>
            },

            {
                path: "cart",
                element: <Cart></Cart>
            },
            {
                path: "product/:id",
                element: <Product></Product>,

            },
            {
                path:"product/:id/add&edit",
                element: <AddEditProduct></AddEditProduct>
            },
            {
                path: "registration",
                element: <Signin></Signin>
            },
            {
                path: "login",
                element: <Login></Login>
            },

            {
                path: "about",
                element: <About></About>
            },
            {
                path: "admin-panel",
                element: <AdminPanel></AdminPanel>
            },
        ]

    },
]);
