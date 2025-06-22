import axios from 'axios';
import { Formik, useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ColorRing } from 'react-loader-spinner';
import { AuthContext } from '../../Context/AuthContext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setSuccess] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const user = {
    email: '',
    password: '',
  };
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  // using .then, .catch to send data to backend
  async function loginUser(values) {
    setSubmitted(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        setSuccess(true);
        setSubmitted(false);
        // here how to route to login page after 3 seconds
        setTimeout(() => {
          setSuccess(false);
          navigate('/home');
          localStorage.setItem('token', res.data.token)
          setToken(res.data.token);
        }, 1000);
        console.log('res', res)
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        setSubmitted(false);
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000);
      })
  }

  // use useFormik htmlFor form handle  
  const loginForm = useFormik({
    initialValues: user,
    onSubmit: loginUser,
    // here use Yup for validations
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required').email('Invalid email address'),
      password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').max(20, 'Password must be at most 20 characters'),
    })
  });

  return (
    <>
      <form onSubmit={loginForm.handleSubmit} className="max-w-xl mx-auto">
        <h3 className='mb-5 text-lg text-center'>Login Now</h3>
        {isSuccess ? <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 mx-auto text-gray-800 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-100" role="alert">
          <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Success icon</span>
          </div>
          <div className="ms-3 text-sm font-normal text-gray-700">Logged in successfully!</div>
        </div> : ''}
        {errorMessage ? <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 mx-auto text-gray-800 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-100" role="alert">
          <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
            <span className="sr-only">Error icon</span>
          </div>
          <div className="ms-3 text-sm font-normal text-gray-700">{errorMessage}.</div>
        </div> : ''}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
          <input type="email" id="email" name="email" value={loginForm.values.email} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} className="shadow-xs bg-gray-100 border border-gray-100 text-gray-900 text-sm rounded-lg   block w-full p-2.5  dark:border-gray-400 dark:placeholder-gray-400" placeholder="name@flowbite.com" required />
          {(loginForm.errors.email && (loginForm.submitCount > 0 || (loginForm.values.email && loginForm.touched.email))) && (<div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert" >
            {loginForm.errors.email}
          </div>)}
        </div>
        <div className="mb-5 relative">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            placeholder='*****************'
            className="shadow-xs bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 pr-10 dark:border-gray-400 dark:placeholder-gray-400" autoComplete="off"
            required
          />
          <span
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={0}
            role="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {!showPassword ? (
              <i className="fa fa-eye-slash"></i>
            ) : (
              <i className="fa fa-eye"></i>
            )}
          </span>
          {(loginForm.errors.password && (loginForm.submitCount > 0 || (loginForm.values.password && loginForm.touched.password))) && (
            <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              {loginForm.errors.password}
            </div>
          )}
        </div>
        <button type="submit" disabled={isSubmitted || isSuccess} className="text-white main-btn  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {!isSubmitted ? 'Login' : <ColorRing
            visible={true}
            height="30"
            width="30"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
          />}
        </button>
        <p className='text-end text-sm text-gray-500 dark:text-gray-400'>You don't have account?  <span className='font-bold text-[#22c55e] cursor-pointer' ><Link to={'/register'}>Register</Link></span></p>
      </form>
    </>
  )
}
