import axios from 'axios'
import React from 'react'
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';

export default function Products() {
  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['allProducts'],
    queryFn: getAllProducts,
  })

  if (isLoading) {
    return <>
      <div id="products" className='container mx-auto'>
        <div className="title text-center mt-5 mb-10">
          <h1 className='text-3xl font-bold text-gray-500'>Products</h1>
        </div>
        <div className="spinner flex justify-center items-center w-full my-30">
          <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      </div>
    </>
  }

  if (isError) {
    return <>
      <div id="products" className='container mx-auto'>
        <div className="title text-center mt-5 mb-10">
          <h1 className='text-3xl font-bold text-gray-500'>Products</h1>
        </div>
        <div className="spinner flex justify-center items-center w-full my-30">
          <p>fe error = {error.error.message}</p>
        </div>
      </div>
    </>
  }

  if (data) {
    return <>
      <div id="products" className='container mx-auto'>
        <div className="title text-center mt-5 mb-10">
          <h1 className='text-3xl font-bold text-gray-500'>Products</h1>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3">
          {data.data.data.map((product) => {
            return (
              <div className="product" key={product._id}>
                <div className="product-image">
                  <img src={product.imageCover} alt={product.title} className='w-full ' />
                </div>
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
              </div>
            )
          })}
        </div>
      </div>
    </>
  }
}
