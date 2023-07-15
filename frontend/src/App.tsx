import Navbar from "./components/Navbar";

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
          path : '/admin',
          element : <Admin />
        },
        {
          path: "/home",
          element: <Home />,
        }
      ]
    }
  ]);
  
    return (
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );
  };

export default App;
