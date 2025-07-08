import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import toast from 'react-hot-toast'
export const CartContext = createContext({})

export default function CartContextProvider({ children }) {
    const { token } = useContext(AuthContext);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [products, setProducts] = useState(null);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    async function addProductToCart(productId) {
        const data = {
            "productId": productId
        }
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', data, {
            headers: {
                token: token
            }
        }).then((response) => {
            setNumOfCartItems(response.data.numOfCartItems);
            setProducts(response.data.products);
            setTotalCartPrice(response.data.totalCartPrice);
            toast.success(response.data.message);
            return true
        }).catch((error) => {
            toast.error(error.response.data.message);
            return false;
        })
    }

    function getUserCart() {
        let headers = {
            token: localStorage.getItem('token')
        }
        axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers }).then((response) => {
            console.log('response.data getUserCart', response);
            setNumOfCartItems(response.data.numOfCartItems);
            setProducts(response.data.data.products);
            setTotalCartPrice(response.data.data.totalCartPrice);
        }).catch((error) => {
            console.log('ERROR.data getUserCart', error);
        })
    }

    return <>
        <CartContext.Provider value={{ addProductToCart, numOfCartItems, products, totalCartPrice, getUserCart }}>
            {children}
        </CartContext.Provider>
    </>
}
