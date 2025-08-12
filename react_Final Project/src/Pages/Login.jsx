import React, { useContext, useState } from 'react'

import { SiRiotgames } from 'react-icons/si'
import { Link, NavLink, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLogin } from '../Redux/Action/sing-up'
import { Context } from '../App'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

const Login = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
  console.log(watch("example"));
    let [obj,setobj] = useState({})
    let [blanckobj,setblancobj] = useState({})
    let Dispatch = useDispatch();
    let naviget = useNavigate()
    let contex1 = useContext(Context)
    let state = useSelector((state) => state.Apireducer);


    const oninput =(e)=>{

        // console.log(e.target.value)
        obj[e.target.name] = e.target.value
        blanckobj[e.target.name] = '';
        setobj({...obj})
        setblancobj({...blanckobj})
      
    }
    const loginbtn =() =>{
            // console.log(state.errorMessage)
            if(obj == {}){
   console.log('obj')
 }
                Dispatch(getUserLogin(obj,contex1.setuser,naviget,contex1.user))   
    }
  return (
    <>
   
    <div className='d-flex login '>
       <section className='mx-auto  my-auto w-50  text-center login-from'>
    <h2><SiRiotgames className='me-2' />Log-in</h2>
    <form  className='mx-auto' onSubmit={handleSubmit(onSubmit)}>
        <label  className='form-label' >Email</label>
        <input type="email" {...register("email")}   name="email" onChange={oninput} className='form-control '/>
          {console.log(errors)}
             {errors.email &&  <span>This field is required</span>}
        <label className='form-label'>password</label>
        <input type="password"  name="password" onChange={oninput} className='form-control '/>
          <span className='text-danger'>{state.errorMessage}</span>
    <div className='text-end mt-2'> 
        <Link to='/Singup' className='me-2'>Sign up </Link>
        <a href="">Forgot password</a>
    </div>
        < button onClick={loginbtn} type='submit' className='btn btn-success my-3' > Submit</button>
    </form>
    </section>
    </div> 
    </>

  )
}

export default Login