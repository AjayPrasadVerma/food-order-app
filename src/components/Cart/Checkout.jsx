import { useRef } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const pinCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPinCode = pinCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor='name' ref={nameInputRef}>Your Name</label>
                <input type='text' id='name' />
            </div>
            <div className={classes.control}>
                <label htmlFor='street' ref={streetInputRef}>Street</label>
                <input type='text' id='street' />
            </div>
            <div className={classes.control}>
                <label htmlFor='pincode' ref={pinCodeInputRef}>Pin Code</label>
                <input type='text' id='pincode' />
            </div>
            <div className={classes.control}>
                <label htmlFor='city' ref={cityInputRef}>City</label>
                <input type='text' id='city' />
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;