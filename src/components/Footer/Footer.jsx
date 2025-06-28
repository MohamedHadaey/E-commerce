import React from 'react'
import amazonpay from '../../assets/images/amazonpay.svg';
import paypal from '../../assets/images/paypal.svg';
import visa from '../../assets/images/visa.svg';
import mastercard from '../../assets/images/mastercard.svg';
import amex from '../../assets/images/american-express.svg';

export default function Footer() {
  return (
    <>
      <div id="footer" className="bg-[#F0F3F2] border-t border-[#e9ecef] pt-8 pb-2 px-4 md:px-12">
        <div className="footer-content mx-auto">
          <div className="md:flex md:justify-between md:items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h3 className=" mb-2">Get the FreshCart app</h3>
              <p className="text-sm text-gray-500 mb-3">We will send you a link, open it on your phone to download the app.</p>
              <form className="flex gap-2 w-full max-w-md">
                <input type="email" name="email" id="visitor-email" placeholder="Email ..." className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-600" />
                <button type="button" className="main-btn bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700 transition">Share App Link</button>
              </form>
            </div>
            <div className="flex flex-col md:flex-row md:gap-12 gap-6">


            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center border-t border-gray-200 pt-4">
            <div className='d-flex flex-row   gap-6 md:gap-12 mb-4 md:mb-0'>
              <p className="font-medium mb-2 ">Payment Partners</p>
              <ul className="flex gap-3 items-center">
                <li><img src={amazonpay} alt="Amazon Pay" className="h-7" /></li>
                <li><img src={paypal} alt="PayPal" className="h-7" /></li>
                <li><img src={visa} alt="Visa" className="h-7" /></li>
                <li><img src={mastercard} alt="Mastercard" className="h-7" /></li>
                <li><img src={amex} alt="American Express" className="h-7" /></li>
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Get deliveries with FreshCart</span>
              <a href="#" className="inline-block"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-8" /></a>
              <a href="#" className="inline-block"><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-8" /></a>
            </div>
          </div>
          <div className="footer-bottom text-center mt-4 text-xs text-gray-400">
            <p>&copy; {new Date().getFullYear()} FreshCart. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  )
}
