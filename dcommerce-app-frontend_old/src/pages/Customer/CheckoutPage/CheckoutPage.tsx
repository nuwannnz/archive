import React from "react";
import "./CheckoutPage.css";

function CheckoutPage() {
  return (
    <div className="checkout-container">
      <div className="checkout-inner-container">
        <div className="entry-container">
          <div className="continue-shopping">continue shipping</div>
          <div className="returning-customer">returning customer</div>
          <div className="enter-coupon">enter coupon</div>
        </div>

        <div className="checkout-details">
          <div className="customer-billing-details">
            <div className="billing-details">billing details</div>
            <div className="shipping-details">shipping-details</div>
          </div>
          <div className="order-details">
            your order
            <div className="spacebetween">
              <div>Prodcut</div>
              <div>Subtotal</div>
            </div>
            <div className="spacebetween">
              <div>item amount</div>
              <div>total</div>
            </div>
            <div className="spacebetween">
              <div>SubTotal</div>
              <div>total</div>
            </div>
            <div>
              <p>Shipping</p>
              <div className="spacebetween">
                <div>delivery name</div>
                <div>total</div>
              </div>
            </div>
            <div className="spacebetween">
              <div>Total</div>
              <div>12352</div>
            </div>
            <div className="spacebetween">
              <div>bank transfer</div>
              <div>bank icon</div>
            </div>
            <div className="payment-description">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Officiis autem modi accusamus totam quidem soluta minus quae
                esse, saepe cupiditate iste, aliquam laboriosam numquam! Porro
                eligendi facilis molestias? Asperiores, nostrum?
              </p>
            </div>
            <div
              className="payment-options"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
              <div className="spacebetween">
                <div>bank transfer</div>
                <div>bank icon</div>
              </div>
              <div className="spacebetween">
                <div>bank transfer</div>
                <div>bank icon</div>
              </div>
            </div>
            <div className="payment-description-footer">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Officiis autem modi accusamus totam quidem soluta minus quae
              </p>
            </div>
            <div className="payment-description-footer">agree to terms</div>
            <div className="place-order-button">
              <div className="button">button</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
