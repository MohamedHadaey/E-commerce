import React from 'react';
import Slider from 'react-slick/lib/slider';
import './ProductDetails.css';
import { ThreeCircles } from 'react-loader-spinner';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
    const settings = {
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const { id } = useParams();

    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    };

    const { data, isLoading } = useQuery({
        queryKey: ['productDetails', id],
        queryFn: getProductDetails,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });

    const product = data?.data?.data;

    if (isLoading) {
        return <>
            <div id="product-details">
                <div className="container mx-auto px-5 py-10 flex justify-center items-center">
                    <ThreeCircles
                        visible={true}
                        height="100"
                        width="100"
                        color="#4fa94d"
                        ariaLabel="three-circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        </>
    }

    if (product) {
        return <>
            <div id="product-details">
                <div className="container mx-auto px-5 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="product-details-image w-full lg:col-span-4 p-3">
                            <div className="slider-container">
                                <Slider {...settings}>
                                    {product.images.map((image) => {
                                        return <div className='item' key={image}>
                                            <img src={image} alt={product.title} className='w-full' />
                                        </div>
                                    })}
                                </Slider>
                            </div>

                        </div>
                        <div className="product-details-info w-full lg:col-span-8 p-3">
                            <h2>{product.title}</h2>
                            <p className='lg:w-3/4'>{product.description}</p>
                            <ul>
                                <li><strong>Category: </strong> <span> {product.category.name} </span></li>
                                <li><strong>Quantity: </strong> <span>{product.quantity}</span></li>
                                <li className='brands'><strong>Brand: </strong> <span>{product.brand.name}</span></li>
                            </ul>
                            <div className='flex justify-between items-center w-full py-3'>
                                <div className="price">
                                    <p>
                                        <span className={product.priceAfterDiscount ? 'line-through text-red-600' : ''}>
                                            {product.price}
                                        </span>
                                        {
                                            product.priceAfterDiscount && (<span>
                                                {product.priceAfterDiscount}
                                            </span>)
                                        }
                                        EGP</p>
                                </div>
                                <div className="rate">
                                    <span>
                                        <i className="fa-solid fa-star"></i>{product.ratingsAverage}
                                    </span>
                                </div>
                            </div>
                            <div className="product-details-actions">
                                <button className='btn btn-primary w-full text-white text-center' type='button'>
                                    <span>
                                        <i className='fa-solid fa-cart-shopping'></i>
                                    </span>
                                    <span>Add to Cart</span>
                                </button>
                                <button type='button'><span><i className='fa-regular fa-heart'></i></span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}
