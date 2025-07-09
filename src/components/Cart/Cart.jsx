import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import './Cart.css';
import emptyCartImg from '../../assets/images/empty-cart-img.svg';

export default function Cart() {
  // Using useContext to access CartContext which provides cart-related data and functions
  // This includes functions to get the user's cart, number of items in the cart, products in the cart, total cart price, and a function to update the count of products in the cart.
  // The useState hook is used to manage the loading state of product count updates.
  const { getUserCart, numOfCartItems, products, totalCartPrice, updateCount } = useContext(CartContext);
  // State to manage the loading state of product count updates
  // It holds an object with the product ID and the type of update ('inc' for increment, 'dec' for decrement).
  // This is used to show a loading spinner while the count is being updated.
  const [loadingProduct, setLoadingProduct] = useState({ id: null, type: null }); // {id, type: 'inc' | 'dec'}
  const username = localStorage.getItem('UserName');

  // useEffect hook to call getUserCart when the component mounts
  // This will fetch the user's cart data and update the state accordingly.
  useEffect(() => {
    getUserCart();
  }, []);

  // Function to handle the update of product count
  // It sets the loading state for the product, calls the updateCount function, and resets the loading state after the operation is complete.
  // It takes productId, newCount, and type ('inc' or 'dec') as arguments.
  async function handleUpdateCount(productId, newCount, type) {
    setLoadingProduct({ id: productId, type });
    try {
      await updateCount(productId, newCount);
    } finally {
      setLoadingProduct({ id: null, type: null });
    }
  }

  return (
    <div id="cart-section">
      <div className="container mx-auto py-8">
        <div className="row">
          <div className="col-md-12 my-5 mb-15">
            <h3>
              Welcome {username} To Your Cart{' '}
              <span>
                <i className="fa-solid fa-cart-arrow-down text-success"></i>
              </span>
            </h3>
          </div>

          <div className="col-md-12">
            <div className="row flex flex-col md:flex-row">
              <div className="w-full md:w-2/3 p-8 mb-3">
                <div className="empty-cart-image">
                  <img src={emptyCartImg} alt="Empty Cart" className="img-fluid" />
                </div>
              </div>
              <div className="w-full md:w-1/3 p-5 mb-3 flex justify-center items-center">
                <div className="cart-actions-card">
                  <div className="card">
                    <h4>Orders</h4>
                    <p>
                      <strong>Products:</strong> <span>{numOfCartItems} items</span>
                    </p>
                    <p>
                      <strong>Total Price:</strong> <span>{totalCartPrice} EGP</span>
                    </p>
                    <button type="button" className="main-success-btn w-3/4">
                      CheckOut
                    </button>
                    <button type="button" className="main-danger-btn w-3/4">
                      Clear All Products
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="row">
              <div className="w-full p-8 mb-3">
                <div className="shop-cart">
                  <h3>Shop Cart</h3>
                  <h5>Total Cart Price: {totalCartPrice} EGP</h5>
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
                              <strong>Price: </strong>
                              <span>{product.price} EGP</span>
                            </div>
                            <button type="button">
                              <i className="fa-solid fa-trash-can text-danger"></i>{' '}
                              <span>Remove</span>
                            </button>
                          </div>

                          <div className="product-actions flex items-center gap-2">
                            {/* Decrease button */}
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

                            {/* Increase button */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
