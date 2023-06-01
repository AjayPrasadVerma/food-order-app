import React, { useContext, useState } from "react";
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = props => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const [isCheckout, setIsCheckout] = useState(false);
    const cartCntx = useContext(CartContext);
    const totalAmt = `₹${cartCntx.totalAmount.toFixed(2)}`;
    const hasItem = cartCntx.item.length > 0;

    const cartItemRemoveHandler = id => {
        cartCntx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartCntx.addItem({ ...item, quantity: 1 })
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {

        setIsSubmitting(true);
        await fetch('https://food-order-app-ajay-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItem: cartCntx.item
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);

        cartCntx.clearCart();
    }

    const modalActiionBtn = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
        {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartitem = <ul className={classes['cart-items']}> {
        cartCntx.item.map(item => <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
        />)
    }
    </ul>;

    const cartModalContent = <React.Fragment>
        {cartitem}
        <div className={classes.total}>
            <span>Total Amount</span>
            <div>{totalAmt}</div>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />}
        {!isCheckout && modalActiionBtn}
    </React.Fragment>

    const isSubmittingContent = <p>Sending Order data....</p>
    const didSubmitModalContent = <React.Fragment>
        <p>Successfully sent the order!</p>

        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onCloseCart}>Close</button>
        </div>
    </React.Fragment>

    console.log(!isSubmitting);

    return (
        <Modal onCloseCart={props.onCloseCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );

}

export default Cart;