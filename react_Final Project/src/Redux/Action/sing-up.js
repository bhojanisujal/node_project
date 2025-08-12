import axios from "axios"
import { ADDAPI, GETAPI } from "../Type/Type"
import Swal from "sweetalert2"

export const addapiData = (user,navigate,setuser) =>{
    return (dispatch) =>{
        axios.post('https://iris-api.mycodelibraries.com/api/User/CreateUser',user).then((res) =>{
            console.log(res)
            {
                // if(res.data.isSuccess){
            dispatch({type:ADDAPI , data:res.data})
    
            navigate('/');
            setuser(false)
            Swal.fire({
  position: "center",
  icon: "success",
  title: "Sing-up successfull",
  showConfirmButton: false,
  timer: 1500
});
        // }
        }
        })
    }
}
export const getUserLogin =(obj,setuser,navigate,user)=>{
    return (dispatch) =>{
    
        axios.post('https://iris-api.mycodelibraries.com/api/User/LoginAuthenticate',obj).then((res)=>{
            console.log(res)
           if(res.data.isSuccess){
               localStorage.setItem('login',JSON.stringify(res.data.responseData));
               setuser(!user);
               navigate('/')
               dispatch({ type: GETAPI, data: res.data })
                Swal.fire({
  position: "center",
  icon: "success",
  title: "Login successfull",
  showConfirmButton: false,
  timer: 1500
});
            }else{
                Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
});
            }
     
                
            
            return res.data
        })
    }
}