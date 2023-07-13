import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/ContextProvider"
import { Outlet } from "react-router-dom";

const Navbar = () => {

  const {handleLogout,isLoggedin,checkRole} = useContext(AuthContext);
  const [role,setRole] = useState('');

  useEffect(()=>{
    getRole();
  },[role])

  const getRole = async() => {
    const role = await checkRole();
    setRole(role);
  }

  return (
    <>
    <div className="navbar" >
        <h1>Credit App</h1>
        <div>
          {isLoggedin && <p onClick={()=>handleLogout()} >Logout</p>}
          { role === "admin" && <p>Admin</p>}
        </div>
    </div>
    <Outlet />
    </>
  )
}

export default Navbar