import React from "react";
import './login.css'
import { useFormik } from 'formik';
import * as yup from 'yup';
import {axiosInstance0} from '../config/axios'
import { useNavigate } from "react-router";

function Login() {
    const navigate = useNavigate()
    const loginFormik = useFormik({
        initialValues:{
            username:'',
            password:''
        },
        validationSchema: yup.object().shape({
            username: yup.string().required("must enter your name"),
            password: yup.string().required("must enter password")
        }),
        onSubmit: values =>{
            console.log(values)
            const form = new FormData()
            form.append("username",values.username)
            form.append("password",values.password)
            axiosInstance0.post('/logingin',form,{withCredentials: true, credentials: true}).then((res)=>{
                console.log(res.data)
                navigate('/search')
            })
        }
    })

  return (
    <div className="loginpage">
      <form className="loginform" onSubmit={loginFormik.handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="username"
            value={loginFormik.values.username}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
          />
          {loginFormik.errors.username &&
          <small className='bg-danger text-danger px-2 mt-2 rounded-2 bg-opacity-10'>{loginFormik.errors.username}</small>
          }
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={loginFormik.values.password}
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
          />
          {loginFormik.errors.password &&
          <small className='bg-danger text-danger px-2 mt-2 rounded-2 bg-opacity-10'>{loginFormik.errors.password}</small>
          }
        </div>

        <button type="submit" className="btn btn-success w-100 mt-3" disabled={!loginFormik.isValid && loginFormik.touched}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
