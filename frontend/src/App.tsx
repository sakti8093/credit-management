import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Login from "./Login";
import Home from "./Home";
import { AuthProvider } from "./context/ContextProvider";
import Admin from "./Admin";

const App = () => {
    const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children:[
        {
          path:"/",
          element :<Login />
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path : '/admin',
          element : <Admin />
        }
      ]
    }
  ]);
  
    return (
      <AuthProvider>
        <RouterProvider router={router} />
        <Footer />
      </AuthProvider>
    );
  };

export default App;
