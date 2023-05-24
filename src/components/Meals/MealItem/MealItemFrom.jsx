import React, { useRef, useState } from "react";
import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";

const MealItemForm = (props) => {

    const quantityInputRef = useRef();
    const [quantityIsValid, setQuantityIsValid] = useState(true);

    const submitHandler = event => {
        event.preventDefault();

        const enteredQuqntity = quantityInputRef.current.value;
        const enteredQuqntityNumber = +enteredQuqntity;       // just parsing String to Number

        if (enteredQuqntity.trim().length === 0 || enteredQuqntityNumber < 1 || enteredQuqntityNumber > 5) {
            setQuantityIsValid(false);
            return;
        }

        props.onAddToCart(enteredQuqntityNumber);

    };

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input label="Quantity" input={{
            ref: quantityInputRef,
            id: 'amount',
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
        }} />
        <button>+ Add</button>
        {!quantityIsValid && <p>Please elnter a valid quantity (1-5).</p>}
    </form>
}

export default MealItemForm;