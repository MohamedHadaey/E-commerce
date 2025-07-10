import React, { useContext, useState } from 'react'
import paymentImage from '../../assets/images/payment-image.png'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import { ColorRing } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const cashOrderObject = {
        details: '',
        phone: '',
        city: '',
    };
    const [isSuccess, setSuccess] = useState(false);
    const [isSubmitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { clearCartUI } = useContext(CartContext);

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

    async function createCashOrder(values) {
        const headers = {
            token: localStorage.getItem('token')
        }
        const body = {
            shippingAddress: values
        }
        console.log('body', body)
        console.log('headers', headers);
        console.log('cartId', id)
        setSubmitted(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`, body, { headers })
            .then((response) => {
                console.log('response', response)
                setSuccess(true);
                setSubmitted(false);
                checkOutForm.resetForm();
                setTimeout(() => {
                    setSuccess(false);
                    navigate('/home');
                    clearCartUI();
                }, 2000);
            })
            .catch((error) => {
                setSuccess(false);
                setSubmitted(false);
                setErrorMessage(error.response.data.message);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000);
            })
    }

    return <>
        <div id="checkout-section">
            <div className="container mx-auto py-6 px-3">
                <h2 className="text-2xl font-semibold mb-6">Payment & Shipping</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  justify-center items-center">
                    {/* Form Section */}
                    <form onSubmit={checkOutForm.handleSubmit} className="w-3/4 mx-auto pt-5 ">
                        {isSuccess ? <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 mx-auto text-gray-800 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-100" role="alert">
                            <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="sr-only">Success icon</span>
                            </div>
                            <div className="ms-3 text-sm font-normal text-gray-700">Payment completed successfully</div>
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
                            <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
                            <input type="text" id="details" name="details" value={checkOutForm.values.details} onChange={checkOutForm.handleChange} onBlur={checkOutForm.handleBlur} className="shadow-xs border border-gray-100 text-gray-900 text-sm rounded-sm block w-full p-2.5  dark:border-gray-400 dark:placeholder-gray-400" placeholder="Enter your address" required />
                            {(checkOutForm.errors.details && (checkOutForm.submitCount > 0 || (checkOutForm.values.details && checkOutForm.touched.details))) && (<div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert" >
                                {checkOutForm.errors.details}
                            </div>)}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                            <input type="tel" id="phone" name="phone" value={checkOutForm.values.phone} onChange={checkOutForm.handleChange} onBlur={checkOutForm.handleBlur} className="shadow-xs border border-gray-100 text-gray-900 text-sm rounded-sm block w-full p-2.5  dark:border-gray-400 dark:placeholder-gray-400" placeholder="Enter your phone number" required />
                            {(checkOutForm.errors.phone && (checkOutForm.submitCount > 0 || (checkOutForm.values.phone && checkOutForm.touched.phone))) && (<div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert" >
                                {checkOutForm.errors.phone}
                            </div>)}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 ">City</label>
                            <input type="text" id="city" name="city" value={checkOutForm.values.city} onChange={checkOutForm.handleChange} onBlur={checkOutForm.handleBlur} className="shadow-xs border border-gray-100 text-gray-900 text-sm rounded-sm block w-full p-2.5  dark:border-gray-400 dark:placeholder-gray-400" placeholder="Enter your city" required />
                            {(checkOutForm.errors.city && (checkOutForm.submitCount > 0 || (checkOutForm.values.city && checkOutForm.touched.city))) && (<div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert" >
                                {checkOutForm.errors.city}
                            </div>)}
                        </div>
                        <button type="submit" disabled={isSubmitted || isSuccess} className="text-white main-btn  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {!isSubmitted ? 'Submit Payment' : <ColorRing
                                visible={true}
                                height="30"
                                width="30"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                            />}
                        </button>
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
