import React, { useContext } from "react";
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";

const Cart = props => {

    const cartCntx = useContext(CartContext);
    const totalAmt = `₹${cartCntx.totalAmount.toFixed(2)}`;
    const hasItem = cartCntx.item.length > 0;

    const cartItemRemoveHandler = id => {
        cartCntx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartCntx.addItem({ ...item, quantity: 1 })
    }

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

    return (
        <Modal onCloseCart={props.onCloseCart}>
            {cartitem}
            <div className={classes.total}>
                <span>Total Amount</span>
                <div>{totalAmt}</div>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
                {hasItem && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );

}

export default Cart;