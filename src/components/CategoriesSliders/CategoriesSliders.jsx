import axios from "axios";
import React, { useEffect, useState } from "react";
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

    const [allCategories, setAllCategories] = useState(null)

    async function getAllCategories() {
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            .then((response) => {
                console.log('response123', response.data.data);
                const categories = response.data.data;
                const first8Categories = categories.slice(0, 8);
                setAllCategories(first8Categories);
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    return <>
        {allCategories === null ? <p>Loading...</p> :
            <div className="slider-container">
                <Slider {...settings}>
                    {allCategories.map((category) => {
                        return (
                            <div className="category-slider" key={category._id}>
                                <img src={category.image} alt={category.name} className="w-full" loading="lazy" />
                                <h4>{category.name}</h4>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        }
    </>
}

export default CategoriesSliders;
