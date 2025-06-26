import React from "react";
import Slider from "react-slick";
import "./BrandsSlider.css";
import { ThreeCircles } from "react-loader-spinner";
import useAllBrands from "../../CustomHooks/useAllBrands";

function BrandsSlider() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 2,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const sharedBrands = useAllBrands();

    if (sharedBrands.isLoading) {
        return <>
            <div className="spinner-sec flex justify-center items-center w-full p-5 my-5">
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
        </>
    }

    if (sharedBrands.data) {
        return <>
            <div className="slider-container brands-slider">
                <Slider {...settings}>
                    {sharedBrands.data.data.data.map((brand) => {
                        return <div className="brand-item" key={brand._id}>
                            <img src={brand.image} alt={brand.name} loading="lazy" />
                        </div>
                    })
                    }
                </Slider>
            </div>
        </>
    }
}

export default BrandsSlider;
