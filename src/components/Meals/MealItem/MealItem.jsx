import React, { useContext } from "react";
import classes from './MealItem.module.css';
import MealItemForm from "./MealItemFrom";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {

    const cartCntx = useContext(CartContext);

    const price = `₹${props.price.toFixed(2)}`;

    const addToCartHandler = quantity => {
        cartCntx.addItem({
            id: props.id,
            name: props.name,
            quantity: quantity,
            price: props.price
        })
    };

    return <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm onAddToCart={addToCartHandler} />
        </div>
    </li>

}

export default MealItem;