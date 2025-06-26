import React from "react";
import Slider from "react-slick";
import useAllCategories from "../../CustomHooks/useAllCategories";

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

    const sharedCategories = useAllCategories();

    if (sharedCategories.isLoading) {
        return <>
            <p>Loading...</p>
        </>
    }

    if (sharedCategories.isError) {
        return <>
            <p>{sharedCategories.error.error.message}</p>
        </>
    }

    if (sharedCategories.data) {
        return <>
            <div className="slider-container">
                <Slider {...settings}>
                    {sharedCategories.data.data.data.slice(0, 8).map((category) => {
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
