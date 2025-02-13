import { useEffect, useState } from "react";
import "./App.css";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";
function App() {

  const initialCart = () => {
    const localData = localStorage.getItem('guitar');
    return localData ? JSON.parse(localData) : []
  }
  const [data, setData] = useState(db);
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

  return (
    <>
      <Header cart={cart} 
      removeFromCart={removeFromCart} 
      increaseQuantity={increaseQuantity} 
      decreaseQuantity={decreaseQuantity}
      clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
