import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Single from "./pages/Single";


const Layout = () => {
  return <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/post/:id",
        element: <Single />
      },
      {
        path: "/write",
        element: <Write />
      },

    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>

  )
}

export default App
