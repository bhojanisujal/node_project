import React, { useEffect, useState } from 'react'
import logosmall from '../Images/Logo-small-bottom.png';
import logodark from '../Images/Logo-dark.png';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../Redux/Action/ApiAction';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string()
  .required()
  .email()
  .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "enter valid email"),
  password: yup
    .string()
    .required()
    .min(8)
    .max(32)
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g, "enter proper password"),

    fullName:yup
    .string()
    .required(),

    mobileNumber: yup
        .string()
        .required("Mobile number is required")
        .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
        .typeError("Mobile number must be a number"),
password: yup
        .string()
        .required("Password is required")
       .min(3)
       .max(8)
});

const RegstrationForm = () => {
    const [obj, setobj] = useState({});
    const [blankobj, setblankobj] = useState({})
    let dispatch = useDispatch();
    let state = useSelector((state)=>state.create)
    let navigate = useNavigate();
    console.log(state);
    let staticobj = {
        "userRole": [
                        {
                        "userRoleId": 0,
                        "userId": 0,
                        "roleType": 1
                        }
                     ]
    }

    const onInput = async (e) =>{
        if(e.target.type=="file"){
            obj[e.target.name] = await toBase64(e.target.files[0])
        }
        else{

            obj[e.target.name] = e.target.value;
           blankobj[e.target.name] = '';
        }
        setobj({ ...obj , ...staticobj })
        console.log(obj)
        setblankobj({ ...blankobj });
    }
    
    const register1 =(data)=>{
      console.log(data);
        if(obj.id==undefined){
            dispatch(createUser(obj))
           localStorage.setItem("profileImageUri", JSON.stringify(obj.profileImageBase64) || '')
            
          
    }
    
    setobj({...blankobj})
    navigate("/login")
   
   }
    
  
     const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });


     const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
 
  return (
   <div className="container-fluid Login text-center">
                 <img src={logodark} alt="" className='mb-4' />
                 <div className="LoginForm bg-white">
                     <h3 className='pt-5 pb-2 h3'>Sign Up</h3>
                     <hr />
                     <form onSubmit={handleSubmit(register1)} >
                        <div>
                         <input {...register("email")} type="text" placeholder='Your Email Address' className='w-100 mb-3  LoginInput' onChange={onInput}  />
                         <p className="text-danger">{errors.email?.message}</p>
                        </div>
                        <div>
                         <input {...register("fullName")} type="text" placeholder='Your full name'  className='w-100 mb-3  LoginInput' onChange={onInput}  />
                          <p className="text-danger">{errors.fullName?.message}</p>
                        </div>
                        <div>
                         <input {...register("mobileNumber")} type="text" placeholder='Your mobile number' className='w-100 mb-3  LoginInput' onChange={onInput}  />
                          <p className="text-danger">{errors.mobileNumber?.message}</p>
                        </div>
                        <div>
                         <input {...register("password")} type="password" placeholder='Password' className='w-100    LoginInput' onChange={onInput}/>
                          <p className="text-danger">{errors.password?.message}</p>
                        </div>
                         <div className='text-start mt-3' >
                            <label htmlFor="">Select Role:</label>
                            <select name="roleId" id="" className='w-100 LoginInput' onChange={onInput}>
                            <option value="1">Admin</option>
                            <option value="2">Client</option>
                            </select>
                        </div>
                        <div>
                             <input type="file" name='profileImageBase64' className='w-100 my-3  LoginInput' onChange={onInput}  />
                        </div>
                         
                         <button type='submit' className='LoginBtn' >Register</button>
                     </form>
                     <hr />
                     <div className="row">
                         <div className="col-10">
 
                             <p className="text-login">Thank you and enjoy our website.</p>
                             <b className='text-login'>Your Authentication Team</b>
                         </div>
                         <div className="col-2 ">
                             <img src={logosmall} alt="" />
                         </div>
                     </div>
                     
                 </div>
             </div>
  )
}

export default RegstrationForm