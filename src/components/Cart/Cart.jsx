import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'

export default function Cart() {
  const { getUserCart } = useContext(CartContext);

  
  return (
    <div>Cart</div>
  )
}
