import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import './Cart.css';
import emptyCartImg from '../../assets/images/empty-cart-img.svg';
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';

export default function Cart() {
  // Using useContext to access CartContext which provides cart-related data and functions
  // This includes functions to get the user's cart, number of items in the cart, products in the cart, total cart price, and a function to update the count of products in the cart.
  // The useState hook is used to manage the loading state of product count updates.
  const { getUserCart, numOfCartItems, products, totalCartPrice, updateCount, deleteProduct, clearCart, cartId } = useContext(CartContext);
  // State to manage the loading state of product count updates
  // It holds an object with the product ID and the type of update ('inc' for increment, 'dec' for decrement).
  // This is used to show a loading spinner while the count is being updated.
  const [loadingProduct, setLoadingProduct] = useState({ id: null, type: null }); // {id, type: 'inc' | 'dec'}
  const [loadingClearCart, setLoadingClearCart] = useState(false);
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
    setLoadingProduct({ id: productId, type: type });
    try {
      await updateCount(productId, newCount);
    } finally {
      setLoadingProduct({ id: null, type: null });
    }
  }

  async function handleDeleteProduct(productId) {
    // This function is intended to handle the deletion of a product from the cart.
    // It sends a DELETE request to the specified API endpoint to remove the product from the cart.
    // It includes a token in the headers for authentication.
    // Upon a successful response, it updates the cart items count, products list, and total cart price.
    // In case of an error, it displays an error message.
    setLoadingProduct({ id: productId, type: "delete" });
    const responseFlag = await deleteProduct(productId);
    console.log('responseFlag', responseFlag)
    if (responseFlag) {
      setLoadingProduct({ id: null, type: null });
      // If the product deletion is successful, you can perform any additional actions here, like showing a success message or updating the UI.
      toast.success('Product deleted successfully');
    } else {
      setLoadingProduct({ id: null, type: null });
      console.log('Failed to delete the product');
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
              Welcome {username} To Your Cart{' '}
              <span>
                <i className="fa-solid fa-cart-arrow-down text-success"></i>
              </span>
            </h3>
          </div>

          <div className="col-md-12">
            <div className="row flex flex-col md:flex-row">
              <div className={`p-8 mb-3 ${numOfCartItems === 0 ? 'w-full' : 'w-full md:w-2/3'}`}>
                <div className="empty-cart-image">
                  <img src={emptyCartImg} alt="Empty Cart" className="img-fluid" />
                </div>
              </div>
              {numOfCartItems > 0 && (<div className="w-full md:w-1/3 p-5 mb-3 flex justify-center items-center">
                <div className="cart-actions-card">
                  <div className="card">
                    <h4>Orders</h4>
                    <p>
                      <strong>Products:</strong> <span>{numOfCartItems} items</span>
                    </p>
                    <p>
                      <strong>Total Price:</strong> <span>{totalCartPrice} EGP</span>
                    </p>
                    <Link to={`/checkout/${cartId}`} >
                    <button type="button" className="main-success-btn w-3/4">
                      CheckOut
                    </button>
                    </Link>
                    <button disabled={loadingClearCart} type="button" className="main-danger-btn w-3/4" onClick={() => handleClearCart()}>
                      {loadingClearCart == false ? <span>Clear All Products</span> : <span><i className="fa-solid fa-spinner fa-spin"></i></span>}
                    </button>
                  </div>
                </div>
              </div>)}
            </div>

            {/* Products List */}
            {numOfCartItems > 0 && (<div className="row">
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
                            {loadingProduct.id === product.product._id && loadingProduct.type === 'delete' ? (
                              <button type="button" className='loader-btn'>
                                <i className="fa-solid fa-spinner fa-spin text-success "></i>
                              </button>
                            ) : (<button disabled={loadingProduct.id === product.product._id} type="button" onClick={() => handleDeleteProduct(product.product._id)}>
                              <i className="fa-solid fa-trash-can text-danger"></i>{' '}
                              <span>Remove</span>
                            </button>)}

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
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
