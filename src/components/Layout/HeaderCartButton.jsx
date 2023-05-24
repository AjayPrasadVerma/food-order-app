import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {

    const [btnIsHighlighted, setButtonIsHighlighted] = useState(false);

    const cartCntx = useContext(CartContext);
    const { item } = cartCntx;

    const numberOfCartItem = item.reduce((curNumber, item) => {
        // console.log(item);
        return curNumber + item.quantity;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (item.length === 0) {
            return;
        }
        setButtonIsHighlighted(true);

        const timer = setTimeout(() => {
            setButtonIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }

    }, [item]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItem}</span>
    </button>

}

export default HeaderCartButton;