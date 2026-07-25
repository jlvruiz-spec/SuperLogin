import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/Login"; 
import Layout from "../layout/index";
import Home from "../pages/Home";
import Applications from "../pages/Applications";
import PassForgot from "../pages/PassForgot";
import PassReset from "../pages/PassReset";
import JobApplication from "../pages/JobApplication";
import NoteTypes from "../pages/NoteTypes";
import JobAppStatus from "../pages/JobAppStatus";
import Interviews from "../pages/Interviews";
import Notes from "../pages/Notes";

const router = createBrowserRouter([ 
  {  
    path: "/", 
    element: <Login /> 
  },
  {
    path: "/passforgot",
    element: <PassForgot />
  },
  {
    path: "/passreset",
    element: <PassReset />
  },
  {   
    element: <PrivateRoute />, // 👈 protección aquí
    children: [
      {
        element: <Layout />, // 👈 layout aquí
        children: [
          { path: "/jobapplication", element: <JobApplication /> },
          { path: "/home", element: <Home /> },
          { path: "/applications", element: <Applications /> },
          { path: "/notetypes", element: <NoteTypes /> },
          { path: "/jobappstatus", element: <JobAppStatus /> },
          { path: "/interviews/:id", element: <Interviews /> },
          { path: "/notes/:id", element: <Notes /> },
        ]
      }
    ]
  },
]);

const Routes = () => <RouterProvider router={router} />;
export default Routes;