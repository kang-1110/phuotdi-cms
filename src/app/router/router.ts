import ProtectedRoute from "@/app/router/ProtectedRoute";

import { createBrowserRouter, replace } from "react-router";
import PublicRoute from "./PublicRoute";
import Login from "@/pages/Auth/Login/Login";
import { MainLayout } from "@/pages/MainLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import LocationBlog from "@/pages/LocationBlog";

const router = createBrowserRouter([
    {
        path: "/",
        Component: ProtectedRoute,
        children: [
            {
                Component: MainLayout,
                children: [
                    { index: true, loader: () => replace("dashboard") },
                    { path: "dashboard", Component: Dashboard },
                    { path: "location-blogs", Component: LocationBlog },

                    // {
                    //     path: "challenges",
                    //     children: [
                    //         { index: true, Component: ChallengeList },
                    //         { path: "create", Component: ChallengeCreate },
                    //         { path: "edit/:id", Component: ChallengeCreate },
                    //         { path: "detail/:id", Component: ChallengeDetail }
                    //     ]
                    // },
                    // {
                    //     path: "cms",
                    //     children: [
                    //         { index: true, Component: BlogList },
                    //         { path: "create", Component: BlogCreate },
                    //         { path: "edit/:id", Component: BlogCreate },
                    //         { path: "detail/:id", Component: BlogDetail },
                    //         { path: "role-management", Component: BlogPermissionList }
                    //     ]
                    // },
                    // {
                    //     path: "admin-user",
                    //     children: [
                    //         { index: true, Component: AdminUserList },
                    //         { path: "create", Component: AdminUserCreate },
                    //         { path: "edit/:id", Component: AdminUserCreate },
                    //         { path: "detail/:id", Component: AdminUserDetail },
                    //     ]
                    // },

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
