import React, { useContext, useState } from "react";
import HOC from "../Component/HOC";
import { useDispatch, useSelector } from "react-redux";
import { changetPassword } from "../Redux/Action/AldumAPI";
import { Context } from "../App";
import { Navigate, useNavigate } from "react-router";


const Setting = () => {
  const [obj, setobj] = useState({})
  const [blanckobj, setblanckobj] = useState({})
  let dispatch =  useDispatch()
  let context = useContext(Context)
  let nevigate  = useNavigate()
  let id = JSON.parse(localStorage.getItem('login')).id
  const oninput = (e) =>{
    obj.id = id
    obj[e.target.name] = e.target.value
    blanckobj[e.target.name] = ''
    setobj({...obj})
    setblanckobj({...blanckobj})
  }
  const change = () =>{

    
    
    dispatch(changetPassword(obj,nevigate,context.user,context.setuser))
    
  
    // console.log(context.user,context.setuser)
    // context.setuser(!context.user);
    // console.log(context.user)
    setobj({...blanckobj})
  }
  return <>
    <section className="change d-flex">
        <div className="  m-auto text-center">
  <h2> Change Passsword</h2>
  <form className="bg-transparent border-0  form-control">
    <label className="form-label">Current Password</label>
    <input onChange={oninput} type="password" name="currentPassword" className="form-control"  />
    <label className="form-label">New Password</label>
    <input onChange={oninput} type="password" name="Password" className="form-control"  />
    <br />
    <button onClick={change} className="btn btn-success" type="button">Submit</button>
    
  </form>

        </div>
    </section>
  </>
};

export default Setting;
