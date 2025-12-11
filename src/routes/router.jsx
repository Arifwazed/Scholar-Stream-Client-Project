import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AllScholarships from "../pages/AllScholarships/AllScholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AddScholarship from "../pages/Dashboard/AddScholarship/AddScholarship";
import PrivateRoute from "./PrivateRoute";
import ManageScholarships from "../pages/Dashboard/ManageScholarships/ManageScholarships";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
            path: 'allScholarships',
            Component: AllScholarships,
            loader: () => fetch('./data/scholarships.json'),
        },
        {
            path: 'scholarshipDetails/:id',
            Component: ScholarshipDetails,
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
        {
            path: 'register',
            Component: Register,
        },
        {
            path: 'login',
            Component: Login,
        }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute>
        <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
        {
            index: true,
            Component: DashboardHome,
        },
        // admin related routes
        {
            path: 'add-scholarship',
            element: <AddScholarship></AddScholarship>
        },
        {
            path: 'manage-scholarships',
            element: <ManageScholarships></ManageScholarships>,
        },
        {
            path: 'manage-users',
            element: <ManageUsers></ManageUsers>,
        }
    ]
  }
]);