import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../Context/CartContext'
import { AuthContext } from '../../Context/AuthContext';
import './Cart.css';
import emptyCartImg from '../../assets/images/empty-cart-img.svg';

export default function Cart() {
  const { getUserCart } = useContext(CartContext);
  useContext(AuthContext);
  let username = localStorage.getItem('UserName');
  useEffect(() => {
    getUserCart();
  }, [])

  return <>
    <div id="cart-section">
      <div className="container mx-auto py-8">
        <div className="row">
          <div className="col-md-12 my-5 mb-15">
            <h3>Welcome {username} To Your Cart <span><i className="fa-solid fa-cart-arrow-down text-success"></i></span></h3>
          </div>
          <div className="col-md-12 ">
            {/* Cart items will be displayed here */}
            <div className="row flex flex-col md:flex-row ">
              <div className="w-full md:w-2/3 p-8 mb-3 ">
                <div className="empty-cart-image">
                  <img src={emptyCartImg} alt="Empty Cart" className="img-fluid" />
                </div>
              </div>
              <div className="w-full md:w-1/3 p-5 mb-3 flex justify-center items-center">
                <div className="cart-actions-card">
                  <div className="card">
                    <h4>Orders</h4>
                    <p><strong>Products:</strong> <span>1 items</span></p>
                    <p><strong>Total Price:</strong> <span>250 EGP</span></p>
                    <button type='button' className="main-success-btn  w-3/4">CheckOut</button>
                    <button
                      type="button"
                      className="main-danger-btn w-3/4">
                      Clear All Products
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}
