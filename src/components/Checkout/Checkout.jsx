import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import paymentImage from '../../assets/images/payment-image.png'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import { ColorRing } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const { t } = useTranslation();
    const cashOrderObject = {
        details: '',
        phone: '',
        city: '',
        paymentMethod: '',
    };
    const [isSuccess, setSuccess] = useState(false);
    const [isSubmitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { clearCartUI } = useContext(CartContext);

    const checkOutForm = useFormik({
        initialValues: cashOrderObject,
        onSubmit: detectPaymentMethod,
        validationSchema: Yup.object({
            details: Yup.string()
                .required(t('errors.addressRequired'))
                .min(5, t('errors.addressMin'))
                .max(100, t('errors.addressMax')),
            phone: Yup.string()
                .required(t('errors.phoneCheckoutRequired'))
                .matches(/^01[0-9]{9}$/, t('errors.phoneCheckoutInvalid')),
            city: Yup.string()
                .required(t('errors.cityRequired'))
                .matches(/^[A-Za-z \u0600-\u06FF]+$/, t('errors.cityInvalid'))
                .min(2, t('errors.cityMin'))
                .max(30, t('errors.cityMax')),
            paymentMethod: Yup.string()
                .required(t('errors.paymentMethodRequired')),
        }),
    });

    function detectPaymentMethod(values) {
        const { paymentMethod, ...shippingValues } = values;

        if (paymentMethod === 'cash') {
            createCashOrder(shippingValues);
        } else if (paymentMethod === 'card') {
            createCardOrder(shippingValues);
        }
    }

    async function createCashOrder(values) {
        const headers = {
            token: localStorage.getItem('token')
        }
        const body = {
            shippingAddress: values
        }
        setSubmitted(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`, body, { headers })
            .then(() => {
                setSuccess(true);
                setSubmitted(false);
                checkOutForm.resetForm();
                setTimeout(() => {
                    setSuccess(false);
                    navigate('/allorders');
                    clearCartUI();
                }, 2000);
            })
            .catch((error) => {
                setSuccess(false);
                setSubmitted(false);
                setErrorMessage(error.response?.data?.message || error.message);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000);
            })
    }

    async function createCardOrder(values) {
        const headers = {
            token: localStorage.getItem('token')
        }
        const params = {
            url: 'https://localhost:5173'
        }
        const body = {
            shippingAddress: values
        }
        setSubmitted(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`, body, { headers, params })
            .then((response) => {
                setSubmitted(false);
                checkOutForm.resetForm();
                clearCartUI();
                window.open(response.data.session.url, '_self');
            })
            .catch((error) => {
                setSuccess(false);
                setSubmitted(false);
                setErrorMessage(error.response?.data?.message || error.message);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            })
    }

    return <>
        <div id="checkout-section">
            <div className="container mx-auto py-6 px-3">
                <h2 className="text-2xl font-semibold mb-6">{t('checkout.title')}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  justify-center items-center">
                    <form onSubmit={checkOutForm.handleSubmit} className="w-3/4 mx-auto pt-5 ">
                        {isSuccess ? <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 mx-auto text-gray-800 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-100" role="alert">
                            <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className="sr-only">{t('auth.successIcon')}</span>
                            </div>
                            <div className="ms-3 text-sm font-normal text-gray-700">{t('checkout.paymentCompleted')}</div>
                        </div> : ''}
                        {errorMessage ? <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 mx-auto text-gray-800 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-100" role="alert">
                            <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                                </svg>
                                <span className="sr-only">{t('auth.errorIcon')}</span>
                            </div>
                            <div className="ms-3 text-sm font-normal text-gray-700">{errorMessage}.</div>
                        </div> : ''}
                        <div className="mb-5">
                            <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 ">{t('checkout.address')}</label>
                            <input type="text" id="details" name="details" value={checkOutForm.values.details} onChange={checkOutForm.handleChange} onBlur={checkOutForm.handleBlur} className="shadow-xs border border-gray-100 text-gray-900 text-sm rounded-sm block w-full p-2.5  dark:border-gray-400 dark:placeholder-gray-400" placeholder={t('checkout.placeholderAddress')} required />
                            {(checkOutForm.errors.details && (checkOutForm.submitCount > 0 || (checkOutForm.values.details && checkOutForm.touched.details))) && (<div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert" >
                                {checkOutForm.errors.details}
                            </div>)}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">{t('checkout.phone')}</label>
                            <input type="tel" id="phone" name="phone" value={checkOutForm.values.phone} onChange={checkOutForm.handleChange} onBlur={checkOutForm.handleBlur} className="shadow-xs border border-gray-100 text-gray-900 text-sm rounded-sm block w-full p-2.5  dark:border-gray-400 dark:placeholder-gray-400" placeholder={t('checkout.placeholderPhone')} required />
                            {(checkOutForm.errors.phone && (checkOutForm.submitCount > 0 || (checkOutForm.values.phone && checkOutForm.touched.phone))) && (<div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert" >
                                {checkOutForm.errors.phone}
                            </div>)}
                        </div>

                        <div className="mb-5">
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 ">{t('checkout.city')}</label>
                            <input type="text" id="city" name="city" value={checkOutForm.values.city} onChange={checkOutForm.handleChange} onBlur={checkOutForm.handleBlur} className="shadow-xs border border-gray-100 text-gray-900 text-sm rounded-sm block w-full p-2.5  dark:border-gray-400 dark:placeholder-gray-400" placeholder={t('checkout.placeholderCity')} required />
                            {(checkOutForm.errors.city && (checkOutForm.submitCount > 0 || (checkOutForm.values.city && checkOutForm.touched.city))) && (<div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert" >
                                {checkOutForm.errors.city}
                            </div>)}
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900">{t('checkout.paymentMethod')}</label>
                            <div className="flex gap-6">
                                <label className="flex items-center hover:cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        checked={checkOutForm.values.paymentMethod === 'card'}
                                        onChange={checkOutForm.handleChange}
                                        className="mr-2 rtl:ml-2 rtl:mr-0"
                                        required
                                        style={{
                                            accentColor: '#36bb70',
                                            width: '20px',
                                            height: '20px',
                                            boxShadow: 'none',
                                            borderRadius: '50%',
                                        }}
                                    />
                                    {t('checkout.payByCard')}
                                </label>
                                <label className="flex items-center hover:cursor-pointer">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cash"
                                        checked={checkOutForm.values.paymentMethod === 'cash'}
                                        onChange={checkOutForm.handleChange}
                                        className="mr-2 rtl:ml-2 rtl:mr-0"
                                        required
                                        style={{
                                            accentColor: '#36bb70',
                                            width: '20px',
                                            height: '20px',
                                            boxShadow: 'none',
                                            borderRadius: '50%',
                                        }}
                                    />
                                    {t('checkout.cashOnDelivery')}
                                </label>
                            </div>
                            {checkOutForm.errors.paymentMethod && (checkOutForm.submitCount > 0 || checkOutForm.touched.paymentMethod) && (
                                <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                    {checkOutForm.errors.paymentMethod}
                                </div>
                            )}
                        </div>

                        <button type="submit" disabled={isSubmitted || isSuccess} className="text-white main-btn  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {!isSubmitted ? t('checkout.submitPayment') : <ColorRing
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
                    <div className="flex justify-center items-center">
                        <img
                            src={paymentImage}
                            alt={t('checkout.paymentImageAlt')}
                            className="img-fluid"
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
}
