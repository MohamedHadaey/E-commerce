import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FallingLines } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import useAllProducts from '../../CustomHooks/useAllProducts';
import { CartContext } from '../../Context/CartContext';
import { getAllProducts } from '../../Redux/apiSlice';
import { useDispatch } from 'react-redux';

export default function Products() {
  const { t } = useTranslation();
  const sharedProducts = useAllProducts();
  const [loadingProduct, setLoadingProduct] = useState({ id: null });
  const { addProductToCart } = useContext(CartContext);

  async function handleAddProductToCart(id) {
    setLoadingProduct({ id: id });
    try {
      await addProductToCart(id);
    } finally {
      setLoadingProduct({ id: null });
    }
  };

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts());
  }, [])

  if (sharedProducts.isLoading) {
    return <>
      <div id="products" className='container mx-auto'>
        <div className="static-card">
          <h3>{t('products.ourProducts')}</h3>
          <p>
            {t('products.browseCollection')}
          </p>
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

  if (sharedProducts.isError) {
    return <>
      <div id="products" className='container mx-auto'>
        <div className="static-card">
          <h3>{t('products.ourProducts')}</h3>
          <p>
            {t('products.browseCollection')}
          </p>
        </div>
        <div className="spinner flex justify-center items-center w-full my-30">
          <p>fe error = {sharedProducts.error?.error?.message}</p>
        </div>
      </div>
    </>
  }

  if (sharedProducts.data) {
    return <>
      <div id="products" className='container mx-auto py-8'>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3">
          <div className="static-card">
            <h3>{t('products.ourProducts')}</h3>
            <p>
              {t('products.browseCollection')}
            </p>
          </div>

          {sharedProducts.data.data.data.map((product) => {
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
                  <button disabled={loadingProduct.id === product._id} onClick={() => handleAddProductToCart(product._id)} className='btn mx-auto text-center main-btn' type='button'>
                    {loadingProduct.id !== product._id ? <div>
                      <span>
                        <i className='fa-solid fa-cart-shopping'></i>
                      </span>
                      <span className="px-2">{t('products.addToCart')}</span>
                    </div> : <div>
                      <span><i className="fa-solid fa-spinner fa-spin"></i></span>
                    </div>}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  } else {
    return <>
      <div className='w-full  flex justify-center items-center '>
        <button type='button' className='btn px-3 py-2 cursor-pointer rounded-l font-bold text-center bg-emerald-600 text-amber-50 w-50 mx-auto hover:bg-emerald-700 hover:text-amber-50 hover:border-amber-600' onClick={sharedProducts.refetch}>{t('products.loadMore')}</button>
      </div>
    </>
  }
}
