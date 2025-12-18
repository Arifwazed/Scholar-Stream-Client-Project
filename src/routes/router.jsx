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
import UpdateScholarship from "../pages/Dashboard/ManageScholarships/UpdateScholarship";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payment/PaymentCancel";
import ManageApplications from "../pages/Dashboard/ManageApplications/ManageApplications";
import MyApplications from "../pages/Dashboard/MyApplications/MyApplications";
import MyReviews from "../pages/Dashboard/MyReviews/MyReviews";
import AllReviews from "../pages/Dashboard/AllReviews/AllReviews";
import Analytics from "../pages/Dashboard/Analytics/Analytics";

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
            path: 'update-scholarships/:id',
            element: <UpdateScholarship></UpdateScholarship>,
        },
        {
            path: 'manage-users',
            element: <ManageUsers></ManageUsers>,
        },
        {
            path: 'analytics',
            element: <Analytics></Analytics>
        },
        // user related routes
        {
            path: 'payment/:scholarshipId',
            Component: Payment,
        },
        {
            path: 'payment-success',
            Component: PaymentSuccess,
        },
        {
            path: 'payment-cancelled',
            Component: PaymentCancel,
        },
        {
            path: 'my-applications',
            Component: MyApplications,
        },
        {
            path: 'my-reviews',
            Component: MyReviews,
        },
        // Moderator related routes
        {
            path: 'manage-applications',
            Component: ManageApplications,
        },
        {
            path: 'all-reviews',
            Component: AllReviews,
        }
    ]
  }
]);