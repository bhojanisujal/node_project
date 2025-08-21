import React, { useContext } from 'react'
import { useState } from 'react'
import { Dropdown, Form } from 'react-bootstrap'
import { SiRiotgames } from 'react-icons/si'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { addapiData } from '../Redux/Action/sing-up'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Context } from '../App'
const schema = yup.object().shape({
  Email: yup.string()
    .required()
    .email()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "enter valid email"),


  fullName: yup
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
  ,

});

const Singup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  let [user, setuser] = useState({})
  let [blankobj, setblankobj] = useState({})
  let contex1 = useContext(Context)

  let dispatch = useDispatch();
  let navigate = useNavigate()
  let newobj = {
    "userRole": [
      {
        "userRoleId": 0,
        "userId": 0,
        "roleType": 1
      }
    ]
  }

  const getBase64 = (file) => new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject('Error: ', error);
  })

  const onInput = async (e) => {
    if (e.target.type == 'file') {
      user[e.target.name] = await getBase64(e.target.files[0]);
      console.log(user[e.target.name])
    }
    else {
      user[e.target.name] = e.target.value;
      blankobj[e.target.name] = ''

    }
    setuser({ ...user, ...newobj });
    setblankobj({ ...blankobj })
  }



  const createUser = (data) => {
    console.log(data)
    if (user.id === undefined) {
      dispatch(addapiData(user, navigate, contex1.setuser))
      console.log('first')
    }

    setuser({ ...blankobj, ...newobj })
  }



  return (
    <>
      <div className='d-flex sign-up '>

        <section className='mx-auto my-auto w-50  text-center'>
          <h2><SiRiotgames className='me-2' />Sign-up</h2>
          <form className='mx-auto' onSubmit={handleSubmit(createUser)}>
            <label className='form-label'>Full Name</label>
            <input {...register("fullName")} onChange={onInput} type="text" className='form-control' />
            <p className="text-danger">{errors.fullName?.message}</p>
{console.log(errors)}
            <br />
            <label className='form-label'>Phone Number</label>
            <input {...register("mobileNumber")} onChange={onInput} type="number" name='mobileNumber' className='form-control' /> <br />
            <p className="text-danger">{errors.mobileNumber?.message}</p>
            <label className='form-label'>Email</label>
            <input {...register("Email")} onChange={onInput} type="email" name="Email" className='form-control ' /> <br />
            <p className="text-danger">{errors.Email?.message}</p>
            <label className='form-label'>password</label>
            <input {...register("password")} onChange={onInput} type="password" name="password" className='form-control ' /> <br />
            <p className="text-danger">{errors.password?.message}</p>
            <label htmlFor="" className='form-label text-center'>Role</label>
            <Form.Select onChange={onInput} name='roleId' aria-label="Default select example">
              <option>Select Role</option>
              <option value="1">Admin</option>
              <option value="2">Uare</option>
            </Form.Select>
            <label className='form-label'>Profile</label>

            <input onChange={onInput} type="file" name="profileImageBase64" className='form-control ' />

            < button type='submit' onClick={handleSubmit(createUser)} className='btn btn-success my-3' >Submit</button>
          </form>
        </section>
      </div>

    </>
  )
}

export default Singup



// name='fullName'.


// password: yup
//     .string()
//     .required()
//     .min(8)
//     .max(32)
//     .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g, "enter proper password")