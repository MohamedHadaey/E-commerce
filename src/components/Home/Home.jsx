import React, { useContext } from 'react'
import HomeSliders from '../HomeSliders/HomeSliders';
import fixedSliderImage1 from '../../assets/images/grocery-banner.png';
import fixedSliderImage2 from '../../assets/images/grocery-banner-2.jpeg';
import fixedSliderImage3 from '../../assets/images/slider-2.jpeg';
import CategoriesSliders from '../CategoriesSliders/CategoriesSliders';
import BrandsSlider from '../BrandsSlider/BrandsSlider';
import { useNavigate, Link } from 'react-router-dom';
import useAllProducts from '../../CustomHooks/useAllProducts';
import { FallingLines } from 'react-loader-spinner';
import { CartContext } from '../../Context/CartContext';

export default function Home() {
  const navigate = useNavigate(); // Add this line
  const sharedProducts = useAllProducts();

    const { addProductToCart } = useContext(CartContext);
    async function handleAddProductToCart(id) {
      await addProductToCart(id);
    };

  return <>
    <div id="home" className='container mx-auto'>
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
        <div className="container mx-auto flex justify-between items-center mt-5 mb-3">
          <h2 className='text-2xl font-medium text-center '>Our Categories</h2>
          <span className='text-lg font-medium text-center cursor-pointer text-success' onClick={() => navigate('/categories')}>
            See all categories
          </span>
        </div>
        <div className="container mx-auto">
          <CategoriesSliders />
        </div>
      </div>
      <div className="categories-sliders-section flex justify-start items-start gap-6 flex-col py-15">
        <div className="container mx-auto flex justify-between items-center mt-5 mb-3">
          <h2 className='text-2xl font-medium text-center '>Our Products</h2>
          <span className='text-lg font-medium text-center cursor-pointer text-success' onClick={() => navigate('/products')}>
            See all products
          </span>
        </div>
        {sharedProducts.data ? <div className="container mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3">
            {sharedProducts.data?.data?.data.slice(0, 8).map((product) => {
              return (
                <div className="product" key={product._id}>
                  <Link to={`/product-details/${product._id}`} >
                    <div className="product-image">
                      <img src={product.imageCover} alt={product.title} className='w-full ' />
                    </div>
                  </Link>
                  <div className="product-info">
                    <h6 className='product-category'>{product.category.name}</h6>
                    <h3 className="product-title">{product.title.split(' ').slice(0, 3).join(' ')}</h3>
                    <div className='flex justify-between items-center '>
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
                          <i className="fa-solid fa-star"></i> {product.ratingsAverage}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="product-button">
                      <button onClick={() => handleAddProductToCart(product._id)} className='btn mx-auto text-center main-btn' type='button'>
                        <span>
                          <i className='fa-solid fa-cart-shopping'></i>
                        </span>
                        <span>Add to Cart</span>
                      </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div> : <div className="spinner flex justify-center items-center w-full my-30">
          <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>}

      </div>

      <div className="brands py-10">
        <BrandsSlider />
      </div>
    </div>
  </>
}
