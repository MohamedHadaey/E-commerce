import React, { useContext, useState } from 'react'
import paymentImage from '../../assets/images/payment-image.png'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';

export default function Checkout() {
    const cashOrderObject = {
        details: '',
        phone: '',
        city: '',
    };
    const { cartId } = useContext(CartContext)


    const [isSuccess, setSuccess] = useState(false);
    const [isSubmitted, setSubmitted] = useState(false);
      const [errorMessage, setErrorMessage] = useState(null);

    const checkOutForm = useFormik({
        initialValues: cashOrderObject,
        onSubmit: createCashOrder,
        validationSchema: Yup.object({
            details: Yup.string()
                .required('Please enter your address')
                .min(5, 'Address must be at least 5 characters')
                .max(100, 'Address must be at most 100 characters'),
            phone: Yup.string()
                .required('Please enter your phone number')
                .matches(/^01[0-9]{9}$/, 'Phone must be a valid Egyptian number (11 digits, starts with 01)'),
            city: Yup.string()
                .required('Please enter your city')
                .matches(/^[A-Za-z ]+$/, 'City must contain only letters')
                .min(2, 'City must be at least 2 characters')
                .max(30, 'City must be at most 30 characters'),
        }),
    });


    async function createCashOrder() {
        console.log(cashOrderObject);
        setSubmitted(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`)
    }

    return <>
        <div id="checkout-section">
            <div className="container mx-auto py-6 px-3">
                <h2 className="text-2xl font-semibold mb-6">Payment & Shipping</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Form Section */}
                    <form onSubmit={checkOutForm.handleSubmit} className="max-w-xl mx-auto">
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
                            <input type="email" id="email" name="email" value={checkOutForm.values.email} onChange={checkOutForm.handleChange} onBlur={checkOutForm.handleBlur} className="shadow-xs bg-gray-100 border border-gray-100 text-gray-900 text-sm rounded-lg   block w-full p-2.5  dark:border-gray-400 dark:placeholder-gray-400" placeholder="name@flowbite.com" required />
                            {(checkOutForm.errors.email && (checkOutForm.submitCount > 0 || (checkOutForm.values.email && checkOutForm.touched.email))) && (<div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert" >
                                {checkOutForm.errors.email}
                            </div>)}
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
                    {/* Image Section */}
                    <div className="flex justify-center items-center">
                        <img
                            src={paymentImage}
                            alt="payment image"
                            className="img-fluid"
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
}
