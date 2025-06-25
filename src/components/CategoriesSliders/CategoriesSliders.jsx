import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

function CategoriesSliders() {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        speed: 500,
        rows: 2,
        slidesPerRow: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        arrows: true,
        dots: false,
        lazyLoad: true,
        waitForAnimate: false,
    };

    function getAllCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    const { data, isLoading, isError, error } = new useQuery({
        queryKey: ['allCategories'],
        queryFn: getAllCategories,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    if (isLoading) {
        return <>
            <p>Loading...</p>
        </>
    }

    if (isError) {
        return <>
            <p>{error.error.message}</p>
        </>
    }

    if (data) {
        return <>
            <div className="slider-container">
                <Slider {...settings}>
                    {data.data.data.slice(0, 8).map((category) => {
                        return (
                            <div className="category-slider" key={category._id}>
                                <img src={category.image} alt={category.name} className="w-full" loading="lazy" />
                                <h4>{category.name}</h4>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </>
    }
}

export default CategoriesSliders;
