import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import sliderImage1 from '../../assets/images/slider-image-1.jpeg';
import sliderImage2 from '../../assets/images/slider-image-2.jpeg';
import sliderImage3 from '../../assets/images/slider-image-3.jpeg';

function HomeSliders() {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        cssEase: "linear",
        adaptiveHeight: true
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <div className="slider">
                        <img src={sliderImage1} alt="slider image" className='w-full h-full' />
                    </div>
                </div>
                <div>
                    <div className="slider">
                        <img src={sliderImage2} alt="slider image" className='w-full h-full' />
                    </div>
                </div>
                <div>
                    <div className="slider">
                        <img src={sliderImage3} alt="slider image" className='w-full h-full' />
                    </div>
                </div>

            </Slider>
        </div>
    );
}

export default HomeSliders;
