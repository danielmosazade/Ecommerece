import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";

const CartContext = createContext();

export function CartProvider({children}) {
    

   
    let currentEmail = localStorage.getItem("currentEmail");
    
    let CartOfUser = localStorage.getItem(`cart-${currentEmail}`);
    
    // If cart is empty put {} instead of nothing
    if(CartOfUser){
        if(CartOfUser.length === 0) {
            CartOfUser = '{}';
        }
    }

    const [cart, setCart] = useState(
        JSON.parse(CartOfUser) || []
      );

    // console.log(cart);
    const value ={
        cart,
        setCart
    }
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}

export function useCart(){
    return useContext(CartContext)
}