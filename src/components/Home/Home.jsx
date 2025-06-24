import React from 'react'
import HomeSliders from '../HomeSliders/HomeSliders';
import fixedSliderImage1 from '../../assets/images/grocery-banner.png';
import fixedSliderImage2 from '../../assets/images/grocery-banner-2.jpeg';
import fixedSliderImage3 from '../../assets/images/slider-2.jpeg';
import CategoriesSliders from '../CategoriesSliders/CategoriesSliders';

export default function Home() {
  return <>

    <div id="home" className='w-full'>
      <div className="sliders-section flex justify-center items-center">
        <div className='w-[80%]'>
          <HomeSliders />
        </div>
        <div className='w-[20%]'>
          <div className="fixed-images">
            <img src={fixedSliderImage1} alt="fixed slider image" className='w-full' loading="lazy" />
            <img src={fixedSliderImage2} alt="fixed slider image" className='w-full' loading="lazy" />
            <img src={fixedSliderImage3} alt="fixed slider image" className='w-full' loading="lazy" />
          </div>
        </div>
      </div>
      <div className="categories-sliders-section flex justify-start items-start gap-6 flex-col py-15">
        <h2 className='text-2xl font-medium text-center mb-5'>Shop popular categories</h2>
        <div className="container mx-auto">
          <CategoriesSliders />
        </div>
      </div>
    </div>
  </>
}
