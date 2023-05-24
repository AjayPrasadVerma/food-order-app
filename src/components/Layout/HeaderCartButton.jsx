import React, { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {

    const cartCntx = useContext(CartContext);

    const numberOfCartItem = cartCntx.item.reduce((curNumber, item) => {
        // console.log(item);
        return curNumber + item.quantity;
    }, 0);

    return <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItem}</span>
    </button>

}

export default HeaderCartButton;