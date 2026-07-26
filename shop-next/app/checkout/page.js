"use client";
import { useReducer } from "react";
import { useTransition } from "react";
import { checkoutReducer, initialState } from "./checkoutReducer";
import { createOrder } from "./actions";
import { CartProvider, useCart } from "@/app/cart/CartContext";

export default function CheckoutPage() {
  return (
    <CartProvider>
      <CheckoutInner />
    </CartProvider>
  );
}

function CheckoutInner() {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  if (state.step === "cart") return <CartStep onNext={() => dispatch({ type: "NEXT" })} />;
  if (state.step === "info") return <InfoStep state={state} dispatch={dispatch} />;
  if (state.step === "payment") return <PaymentStep state={state} dispatch={dispatch} />;
  if (state.step === "confirmed") return <ConfirmedStep orderId={state.orderId} />;
  if (state.step === "error") return <p>Error: {state.error}</p>;
  return null;
}

function CartStep({ onNext }) {
  return (
    <section>
      <h1>Cart</h1>
      <p>Your cart is ready for checkout.</p>
      <button onClick={onNext}>Next</button>
    </section>
  );
}

function InfoStep({ state, dispatch }) {
  const { customer } = state;
  return (
    <section>
      <h1>Customer info</h1>
      <label>
        Name
        <input
          value={customer.name}
          onChange={(e) => dispatch({ type: "SET_CUSTOMER", payload: { name: e.target.value } })}
        />
      </label>
      <label>
        Email
        <input
          value={customer.email}
          onChange={(e) => dispatch({ type: "SET_CUSTOMER", payload: { email: e.target.value } })}
        />
      </label>
      <label>
        Phone
        <input
          value={customer.phone}
          onChange={(e) => dispatch({ type: "SET_CUSTOMER", payload: { phone: e.target.value } })}
        />
      </label>
      <label>
        Address
        <input
          value={customer.address}
          onChange={(e) => dispatch({ type: "SET_CUSTOMER", payload: { address: e.target.value } })}
        />
      </label>
      <button onClick={() => dispatch({ type: "BACK" })}>Back</button>
      <button onClick={() => dispatch({ type: "NEXT" })}>Next</button>
    </section>
  );
}

function PaymentStep({ state, dispatch }) {
  const { state: cart, dispatch: cartDispatch } = useCart();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData) {
    formData.append("items", JSON.stringify(cart.items));
    const result = await createOrder(formData);
    if (result.error) {
      dispatch({ type: "ERROR", message: result.error });
    } else {
      cartDispatch({ type: "CLEAR" });
      dispatch({ type: "SUCCESS", orderId: result.orderId });
    }
  }

  return (
    <section>
      <h1>Payment</h1>
      <form action={(fd) => startTransition(() => handleSubmit(fd))}>
        <input type="hidden" name="name" value={state.customer.name} />
        <input type="hidden" name="email" value={state.customer.email} />
        <input type="hidden" name="phone" value={state.customer.phone} />
        <input type="hidden" name="address" value={state.customer.address} />
        <label>
          <input type="radio" name="paymentMethod" value="cash" required /> Cash on delivery
        </label>
        <label>
          <input type="radio" name="paymentMethod" value="mpesa" required /> M-Pesa (Week 16)
        </label>
        <button type="submit" disabled={isPending}>
          {isPending ? "Processing..." : "Place order"}
        </button>
      </form>
    </section>
  );
}

function ConfirmedStep({ orderId }) {
  return (
    <section>
      <h1>Order confirmed</h1>
      <p>Thank you! Your order id is {orderId}.</p>
      <a href={`/orders/${orderId}`}>View order details</a>
    </section>
  );
}
