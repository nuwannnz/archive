import React from "react";
import "./Cart.css";
import CartProductList from "./CartProductList";

function Cart() {
  return (
    <div className="inner-container">
      <div className="cart-container">
        <h1 className="cart-title">Cart</h1>
        <CartProductList />
      </div>
    </div>
  );
}

export default Cart;
