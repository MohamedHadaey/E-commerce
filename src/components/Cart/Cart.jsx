import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../../Context/CartContext';
import './Cart.css';
import emptyCartImg from '../../assets/images/empty-cart-img.svg';
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';

export default function Cart() {
  const { t } = useTranslation();
  const { getUserCart, numOfCartItems, products, totalCartPrice, updateCount, deleteProduct, clearCart, cartId } = useContext(CartContext);
  const [loadingProduct, setLoadingProduct] = useState({ id: null, type: null });
  const [loadingClearCart, setLoadingClearCart] = useState(false);
  const username = localStorage.getItem('UserName');

  useEffect(() => {
    getUserCart();
  }, []);

  async function handleUpdateCount(productId, newCount, type) {
    setLoadingProduct({ id: productId, type: type });
    try {
      await updateCount(productId, newCount);
    } finally {
      setLoadingProduct({ id: null, type: null });
    }
  }

  async function handleDeleteProduct(productId) {
    setLoadingProduct({ id: productId, type: "delete" });
    const responseFlag = await deleteProduct(productId);
    if (responseFlag) {
      setLoadingProduct({ id: null, type: null });
      toast.success(t('cart.productDeleted'));
    } else {
      setLoadingProduct({ id: null, type: null });
    }
  }

  async function handleClearCart() {
    setLoadingClearCart(true);
    try {
      await clearCart();
    } finally {
      setLoadingClearCart(false);
    }
  }

  return (
    <div id="cart-section">
      <div className="container mx-auto py-8">
        <div className="row">
          <div className="col-md-12 my-5 mb-15">
            <h3>
              {t('cart.welcome', { name: username || '' })}{' '}
              <span>
                <i className="fa-solid fa-cart-arrow-down text-success"></i>
              </span>
            </h3>
          </div>

          <div className="col-md-12">
            <div className="row flex flex-col md:flex-row">
              <div className={`p-8 mb-3 ${numOfCartItems == 0 ? 'w-full' : 'w-full md:w-2/3'}`}>
                <div className="empty-cart-image">
                  <img src={emptyCartImg} alt={t('cart.emptyCartAlt')} className="img-fluid" />
                </div>
              </div>
              {numOfCartItems > 0 && (<div className="w-full md:w-1/3 p-5 mb-3 flex justify-center items-center">
                <div className="cart-actions-card">
                  <div className="card">
                    <h4>{t('cart.orders')}</h4>
                    <p>
                      <strong>{t('cart.products')}:</strong> <span>{numOfCartItems} {t('cart.items')}</span>
                    </p>
                    <p>
                      <strong>{t('cart.totalPrice')}:</strong> <span>{totalCartPrice} EGP</span>
                    </p>
                    <Link to={`/checkout/${cartId}`} >
                    <button type="button" className="main-success-btn w-3/4">
                      {t('cart.checkout')}
                    </button>
                    </Link>
                    <button disabled={loadingClearCart} type="button" className="main-danger-btn w-3/4" onClick={() => handleClearCart()}>
                      {loadingClearCart == false ? <span>{t('cart.clearAll')}</span> : <span><i className="fa-solid fa-spinner fa-spin"></i></span>}
                    </button>
                  </div>
                </div>
              </div>)}
            </div>

            {numOfCartItems > 0 && (<div className="row">
              <div className="w-full p-8 mb-3">
                <div className="shop-cart">
                  <h3>{t('cart.shopCart')}</h3>
                  <h5>{t('cart.totalCartPrice')}: {totalCartPrice} EGP</h5>
                  <div className="row w-full mt-5">
                    {products?.length > 0 &&
                      products.map((product) => (
                        <div className="col-md-12 mb-5" key={product._id}>
                          <div className="product-img">
                            <img
                              src={product.product.imageCover}
                              className="img-fluid"
                              alt={product.product.title}
                            />
                          </div>

                          <div className="product-details">
                            <p>{product.product.title}</p>
                            <div>
                              <strong>{t('cart.price')}: </strong>
                              <span>{product.price} EGP</span>
                            </div>
                            {loadingProduct.id === product.product._id && loadingProduct.type === 'delete' ? (
                              <button type="button" className='loader-btn'>
                                <i className="fa-solid fa-spinner fa-spin text-success "></i>
                              </button>
                            ) : (<button disabled={loadingProduct.id === product.product._id} type="button" onClick={() => handleDeleteProduct(product.product._id)}>
                              <i className="fa-solid fa-trash-can text-danger"></i>{' '}
                              <span>{t('cart.remove')}</span>
                            </button>)}

                          </div>

                          <div className="product-actions flex items-center gap-2">
                            <button
                              disabled={product.count === 1 || (loadingProduct.id === product.product._id && loadingProduct.type === 'dec')}
                              className="main-danger-btn"
                              onClick={() => handleUpdateCount(product.product._id, product.count - 1, 'dec')}
                            >
                              {loadingProduct.id === product.product._id && loadingProduct.type === 'dec' ? (
                                <i className="fa-solid fa-spinner fa-spin"></i>
                              ) : (
                                <i className="fa-solid fa-minus"></i>
                              )}
                            </button>

                            <span>{product.count}</span>

                            <button
                              disabled={loadingProduct.id === product.product._id && loadingProduct.type === 'inc'}
                              className="main-success-btn"
                              onClick={() => handleUpdateCount(product.product._id, product.count + 1, 'inc')}
                            >
                              {loadingProduct.id === product.product._id && loadingProduct.type === 'inc' ? (
                                <i className="fa-solid fa-spinner fa-spin"></i>
                              ) : (
                                <i className="fa-solid fa-plus"></i>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
