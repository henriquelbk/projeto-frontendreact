import Filters from "./Components/Filters/Filters";
import Home from "./Components/ProductList/Home/Home";
import Cart from "./Components//ShoppingCart/Cart/Cart";
import { GlobalStyle } from "./GlobalStyle";
import { productList } from "./assets/productList";
import { useState, useEffect } from "react";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

function App() {
  const [minFilter, setMinFilter] = useState();
  const [maxFilter, setMaxFilter] = useState();
  const [searchFilter, setSearchFilter] = useState();
  const [cart, setCart] = useState(cartFromLocalStorage);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  return (
    <>
      <GlobalStyle />
      <div id='stars1'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      <main>
        <Filters
          minFilter={minFilter}
          setMinFilter={setMinFilter}
          maxFilter={maxFilter}
          setMaxFilter={setMaxFilter}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
        <Home
          productList={productList
            .filter((product) => {
              const productName = product.name.toLowerCase();
              return searchFilter ? productName.includes(searchFilter.toLowerCase()) : true;
            })
            .filter((product) => {
              return product.value >= (minFilter || 0);
            })
            .filter((product) => {
              return product.value <= (maxFilter || Infinity);
            })}
          amount={amount}
          setAmount={setAmount}
          cart={cart}
          setCart={setCart}
        />
        <Cart
          amount={amount}
          setAmount={setAmount}
          cart={cart}
          setCart={setCart}
        />
      </main>
    </>
  );
}

export default App;
