import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Instructors from "../pages/Instructors/Instructors/Instructors";

import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

import Dashboard from "../Layout/Dashboard";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";

import AddClasses from "../pages/Dashboard/AddClasses/AddClasses";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import StudentRoute from "./StudentRoute";

import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import MySelectedClasses from "../pages/Dashboard/MySelectedClasses/MySelectedClasses";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import Payment from "../pages/Dashboard/Payment/Payment";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import InstructorHome from "../pages/Dashboard/InstructorHome/InstructorHome";
import Classes from "../pages/Classes/Classes/Classes";
import Errorpage from "../pages/Errorpage/Errorpage";
import Enrolledclasses from "../pages/Dashboard/Enrolledclasses/Enrolledclasses";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Errorpage></Errorpage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: "classes",
        element: <Classes></Classes>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // admin routes
      {
        path: "adminhome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manageclasses",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },
      {
        path: "manageusers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },

      {
        path: "instructorhome",
        element: (
          <InstructorRoute>
            <InstructorHome></InstructorHome>
          </InstructorRoute>
        ),
      },

      {
        path: "addClasses",
        element: (
          <InstructorRoute>
            <AddClasses></AddClasses>
          </InstructorRoute>
        ),
      },

      {
        path: "myclasses",
        element: (
          <InstructorRoute>
            <MyClasses></MyClasses>
          </InstructorRoute>
        ),
      },

      {
        path: "userhome",
        element: (
          <StudentRoute>
            <UserHome></UserHome>
          </StudentRoute>
        ),
      },

      {
        path: "myselectedclasses",
        element: (
          <StudentRoute>
            <MySelectedClasses></MySelectedClasses>
          </StudentRoute>
        ),
      },

      {
        path: "enrolledclasses",
        element: (
          <StudentRoute>
            <Enrolledclasses></Enrolledclasses>
          </StudentRoute>
        ),
      },

      {
        path: "payment",
        element: (
          <StudentRoute>
            <Payment></Payment>
          </StudentRoute>
        ),
      },
    ],
  },
]);
