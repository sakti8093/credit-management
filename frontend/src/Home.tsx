import { useContext, useEffect, useState } from "react";
import supabase from "./config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/ContextProvider";

interface expenditure {
  id:number,
  created_at:string,
  cost :number,
  spent_on:string,
  userid_:string,
}

interface total {
  totalspent:number,
  totaldue : number
}

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<expenditure[]>([]);
  const [total,setTotal] = useState<total>({
      totalspent : 0,
      totaldue : 0,
  });
  const { isLoggedin,checkUser } = useContext(AuthContext);



  useEffect(() => {
    checkUser();
    const fetchRecords = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("expenditure")
          .select()
          .eq("user_id", user.id);

        if (error) {
          console.log(error, "err");
        }

        if (data) {
          setData(data);
          totalSpents(data);
        }
      } else {
        navigate("/");
      }
    };
    fetchRecords();
  }, [isLoggedin]);

  const totalSpents = (data:expenditure[]) => {
    if(data.length>0) {
     const cost = data.reduce((acc:number,elem:expenditure)=>{
       return acc + elem.cost
      },0)
      setTotal({...total,totalspent:cost})
    }
  }

  return (
    <div className="home">
      <p>Total Spent : ₹ {total.totalspent}</p>
      <p>Amount Due :</p>
      <p>Total Given :</p>
      <table border={1}>
        <thead>
          <tr>
            <th>sl no</th>
            <th>spent in</th>
            <th>cost</th>
            <th>summary</th>
          </tr>
        </thead>
        <tbody>
          {data.length>0 && data.map((elem, id) => (
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{elem.spent_on}</td>
                <td>₹ {elem.cost}</td>
                <td>nil</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
