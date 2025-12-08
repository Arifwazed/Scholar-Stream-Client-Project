import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AllScholarships from "../pages/AllScholarships/AllScholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";

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
            loader: () => fetch('./data/scholarships.json'),
        }
    ]
  },
]);