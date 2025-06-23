import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner';

export default function Products() {
  const [allProducts, setAllProducts] = useState(null)

  async function getAllProducts() {
    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    console.log('response 123', response)
    setAllProducts(response.data.data);
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  return <>
    <div id="products">
      <div className="title text-center mt-5 mb-10">
        <h1 className='text-3xl font-bold text-gray-500'>Products</h1>
      </div>
      {allProducts == null ? <div className="spinner flex justify-center items-center w-full my-30">
        <FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div> : <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3">
        {allProducts.map((product) => {
          return (
            <div className="product" key={product._id}>
              <div className="product-image">
                <img src={product.imageCover} alt={product.title} className='w-full ' />
              </div>
              <div className="product-info">
                <h6 className='product-category'>{product.category.name}</h6>
                <h3 className="product-title">{product.title}</h3>
                <div className='flex justify-between items-center '>
                  <div className="price">
                    <p>{product.price} EGP</p>
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
      </div>}
    </div>
  </>
}
