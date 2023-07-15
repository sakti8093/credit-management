import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/ContextProvider"
import { Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {

  const {handleLogout,isLoggedin,checkRole} = useContext(AuthContext);
  const [role,setRole] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    getRole();
  },[role])

  const getRole = async() => {
    const res = await checkRole();
    console.log(res,"res");
    setRole(res);
  }

  return (
    <>
    <div className="navbar" >
        <h1>Credit App</h1>
        <div>
          {isLoggedin && <p onClick={()=>handleLogout()} >Logout</p>}
          { role === "admin" && <p onClick={()=>navigate('/admin')} >Admin</p>}
        </div>
    </div>
    <Outlet />
    </>
  )
}

export default Navbar