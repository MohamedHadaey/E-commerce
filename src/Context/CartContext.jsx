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
    const [ cartId, setCartId] = useState(null);
    // This function adds a product to the shopping cart by sending a POST request to the specified API endpoint. 
    // It takes a product ID as an argument, constructs the request data, and includes a token in the headers for authentication. 
    // Upon a successful response, it updates the cart items count, products list, and total cart price, 
    // and displays a success message. In case of an error, it shows an error message.
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

    // This function retrieves the user's shopping cart by sending a GET request to the specified API endpoint.
    // It includes a token in the headers for authentication. Upon a successful response, it updates the cart items count, products list, and total cart price.
    // In case of an error, it displays an error message.
    function getUserCart() {
        let headers = {
            token: localStorage.getItem('token')
        }
        axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers }).then((response) => {
            console.log('response.data getUserCart', response);
            setNumOfCartItems(response.data.numOfCartItems);
            setProducts(response.data.data.products);
            setTotalCartPrice(response.data.data.totalCartPrice);
            setCartId(response.data.data._id);
        }).catch((error) => {
            console.log('ERROR.data getUserCart', error);
        })
    }

    // This function updates the count of a specific product in the shopping cart by sending a PUT request to the specified API endpoint.
    // It takes a product ID and the new count as arguments, constructs the request data, and includes a token in the headers for authentication. 
    // Upon a successful response, it updates the cart items count, products list, and total cart price. In case of an error, it displays an error message.
    function updateCount(productId, count) {
        let headers = { token: localStorage.getItem('token') };
        let countObject = { "count": count };
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, countObject, { headers })
            .then((response) => {
                setNumOfCartItems(response.data.numOfCartItems);
                setProducts(response.data.data.products);
                setTotalCartPrice(response.data.data.totalCartPrice);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    }

    // This function deletes a product from the shopping cart by sending a DELETE request to the specified API endpoint.
    // It takes a product ID as an argument and includes a token in the headers for authentication
    async function deleteProduct(productId) {
        let headers = { token: localStorage.getItem('token') };
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
            .then((response) => {
                setNumOfCartItems(response.data.numOfCartItems);
                setProducts(response.data.data.products);
                setTotalCartPrice(response.data.data.totalCartPrice);
                return true;
            }).catch((error) => {
                toast.error(error.response.data.message);
                return false;
            });
    }

    async function clearCart() {
        let headers = { token: localStorage.getItem('token') };
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((response) => {
                setNumOfCartItems(response.data.numOfCartItems);
                setProducts(response.data.data.products);
                setTotalCartPrice(response.data.data.totalCartPrice);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    }

    return <>
        <CartContext.Provider value={{ addProductToCart, numOfCartItems, products, totalCartPrice, getUserCart, updateCount, deleteProduct, clearCart, cartId }}>
            {children}
        </CartContext.Provider>
    </>
}
