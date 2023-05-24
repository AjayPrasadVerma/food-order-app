import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    item: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updateTotalAmount = state.totalAmount + action.item.price * action.item.quantity;

        const existingCartItemIndex = state.item.findIndex(item => item.id === action.item.id);

        const existingCartItem = state.item[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {

            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + action.item.quantity
            };

            updatedItems = [...state.item];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.item.concat(action.item);
        }

        return {
            item: updatedItems,
            totalAmount: updateTotalAmount
        }
    }

    if (action.type === "REMOVE") {

        const existingCartItemIndex = state.item.findIndex((item => item.id === action.id));
        const existingItem = state.item[existingCartItemIndex]
        const updateTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        if (existingItem.quantity === 1) {
            updatedItems = state.item.filter(item => item.id !== action.id);
        } else {

            const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 }
            updatedItems = [...state.item];
            updatedItems[existingCartItemIndex] = updatedItem
        }

        return {
            item: updatedItems,
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
            type: 'REMOVE',
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