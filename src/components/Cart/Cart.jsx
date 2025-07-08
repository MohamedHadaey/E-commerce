import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../Context/CartContext'

export default function Cart() {
  const { getUserCart } = useContext(CartContext);

  useEffect(() => {
    getUserCart();
  }, [])
  
  return (
    <div>Cart</div>
  )
}
