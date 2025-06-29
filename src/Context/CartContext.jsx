import React, { createContext } from 'react'


const CartContext = createContext({})

export default function CartContextProvider({ children }) {
    return <>


    <CartContext.Provider value={{}}>

    {children}

    </CartContext.Provider>

  </>
}
