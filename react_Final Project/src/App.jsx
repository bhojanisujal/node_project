import { createContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./sass.scss";
import Sidebarheader from "./Component/Sidebarheader";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Aldum from "./Pages/Aldum";
import Profile from "./Pages/Profile";
import Roylities from "./Pages/Roylities";
import Setting from "./Pages/Setting";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'



import Dashbord from "./Pages/Dashbord";
import Login from "./Pages/Login";
import Singup from "./Pages/Sing-up";
  export let Context = createContext()  
function App() {
  const [user, setuser] = useState(true)
  let data = JSON.parse(localStorage.getItem('login'))
  return (
    <>

  <BrowserRouter>
<Context.Provider  value={{user:user,setuser:setuser}}>
<Routes>
{data? 
<>
 <Route path="/" element={<Navigate to='/Dashbord' />}/>
  <Route path="/Dashbord" element={<Dashbord  />}/>
  <Route path="/Aldum" element={<Aldum  />}/>
  <Route path="/Roylities" element={<Roylities  />}/>/
  <Route path="/Profile" element={<Profile  />}/>
  <Route path="/Setting" element={<Setting  />}/>
</> 
:
<>
<Route path="/" element={<Navigate to='/Login' />}/>
<Route path="/Login" element={<Login  user={user} setuser={setuser} />}/>
  <Route path="/Singup" element={<Singup  />}/>
</>
}
  
  <Route path="*" element={<Navigate to='/' />}/>
  
</Routes>
</Context.Provider>
</BrowserRouter>
    </>
  );
}

export default App;
