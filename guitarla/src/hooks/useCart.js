import { useEffect, useState } from "react";
import { db } from "../data/db";



export const  useCart = () => {

     const initialCart = () => {
        const localData = localStorage.getItem('guitar');
        return localData ? JSON.parse(localData) : []
      }
      const [data] = useState(db);
      const [cart, setCart] = useState(initialCart);
      const MIN_ITEMS = 1;
      const MAX_ITEMS = 5;
    
      useEffect(() => {
        localStorage.setItem('guitar', JSON.stringify(cart));
      }, [cart]);
    
      function addToCart(item) {
        let itemExist = cart.findIndex((guitar) => guitar.id === item.id);
        if (itemExist >= 0) {
          if(cart[itemExist].quantity >= MAX_ITEMS) return;
          let updateCart = [...cart];
          updateCart[itemExist].quantity++;
          setCart(updateCart);
        } else {
          item.quantity = 1;
          setCart([...cart, item]);
        }
        
      }
    
      function removeFromCart(id){
          setCart(() => cart.filter(item => item.id != id));
      }
    
      function increaseQuantity(id){
         let updatedQuantity = cart.map(item => {
          if(item.id === id && item.quantity < MAX_ITEMS){
            return{
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item;
         })  
         setCart(updatedQuantity)
      }
    
      function decreaseQuantity(id){
        let updateQuantity = cart.map(item => {
          if(item.id === id && item.quantity > MIN_ITEMS){
            return{
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item;
        })
    
        setCart(updateQuantity);
      }
    
      function clearCart(){
        setCart([]);
      }
    
    console.log('desde useCart ');

    return{
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart

    }
    
}