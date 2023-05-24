import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    item: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedItem = state.item.concat(action.item)
        const updateTotalAmount = state.item + action.item.price * action.item.quantity;
        return {
            item: updatedItem,
            totalAmount: updateTotalAmount
        }
    }
    return defaultCartState;
}

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemCartHandler = (item) => {

        dispatchCartAction({
            type: 'ADD',
            item: item
        })

    }

    const removeItemFromCartHandler = id => {
        dispatchCartAction({
            type: 'Remove',
            id: id
        })
    }

    const cartContext = {
        item: cartState.item,
        totalAmount: cartState.totalAmount,
        addItem: addItemCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;