import ProtectedRoute from "@/app/router/ProtectedRoute";
import React from "react";
import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Login from "@/pages/Auth/Login/Login";
import { MainLayout } from "@/pages/MainLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import LocationBlog from "@/pages/LocationBlog";
import Customer from "@/pages/User/Customer";
import Staff from "@/pages/User/Staff";
import Location from "@/pages/Location";
import UserCreate from "@/pages/User/UserCreate/UserCreate";
const router = createBrowserRouter([
    {
        path: "/",
        Component: ProtectedRoute,
        children: [
            {
                Component: MainLayout,
                children: [
                    { index: true, loader: () => redirect("dashboard") },
                    { path: "dashboard", Component: Dashboard },
                    { path: "location-blogs", Component: LocationBlog },
                    { path: "locations", Component: Location },
                    { path: "customers", Component: Customer },
                    { path: "staffs", Component: Staff },
                    {
                        path: "profile",
                        children: [
                            { index: true, element: React.createElement(Navigate, { to: 'edit', replace: true }) },
                            { path: "edit", element: React.createElement(UserCreate, { pageName: 'Người dùng', isEdit: true, open: true }) },
                        ]
                    },
                ]
            }
        ],
    },
    {
        path: "/login",
        Component: PublicRoute,
        children: [
            { index: true, Component: Login }
        ]
    },
    // {
    //     path: "/forgot-password",
    //     Component: PublicRoute,
    //     children: [
    //         { index: true, Component: ForgotPassword }
    //     ]
    // },
    // {
    //     path: "*",
    //     Component: NotFound
    // }
]);

export default router;
