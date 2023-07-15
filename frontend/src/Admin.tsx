import React, { useContext, useEffect, useState } from "react";
import supabase from "./config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/ContextProvider";


interface state {
  spent_on : string,
  cost:number,
  user_id:string
}

const Admin = () => {
  const {isLoggedin,checkRole} = useContext(AuthContext);

  const [state,setState] = useState<state>({
    spent_on : "",
    cost: 0,
    user_id:""
  })

  const [role,setRole] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    getRole();
  },[role])

  const getRole = async() => {
    const role = await checkRole();
    setRole(role);
  }

  if(role !== "admin" ){
    return navigate('/home');
  }

  if(!isLoggedin){
   return navigate('/');
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name,value} = e.target
    setState({...state,[name]:value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data,error } = await supabase
      .from("expenditure")
      .insert([{ spent_on: state.spent_on, cost: state.cost , user_id : state.user_id }])
      .select();

      if( data && data?.length>0){
        console.log(data);
      }else {
        alert(error?.message)
      }

      setState({...state,spent_on:"",cost:0,user_id:""})

  };

  return (
    <div className="admin">
      <h1>Hello Admin !!</h1>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" value={state.spent_on} placeholder="spent on" name="spent_on" onChange={(e)=>handleChange(e)} />
        <select name="user_id" value={state.user_id} onChange={(e)=>handleChange(e)}>
          <option value="">select user</option>
          <option value="02937644-2703-4421-bc15-899a158c0b1f">Amiya</option>
          <option value="30c05a84-9c8b-4078-aa53-a04c8f834abd">Sameer</option>
        </select>
        <input value={state.cost} name="cost" type="number" placeholder="Enter Cost" onChange={(e)=>handleChange(e)} />
        <button>submit</button>
      </form>
    </div>
  );
};

export default Admin;
