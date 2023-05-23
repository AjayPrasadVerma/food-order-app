import React from "react";
import classes from './Cart.module.css';
import Modal from "../UI/Modal";

const Cart = props => {

    const cartitem = <ul className={classes['cart-items']}> {[{
        id: 'c1',
        name: 'Smita',
        quantity: 2,
        price: 635.83
    }].map(item => <li>{item.name}</li>)} </ul>;

    return (
        <Modal>
            {cartitem}
            <div className={classes.total}>
                <span>Total Amount</span>
                <div>273.87</div>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );

}

export default Cart;