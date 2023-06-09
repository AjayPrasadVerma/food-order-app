import classes from './Modal.module.css';
import { Fragment } from 'react';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {

    return <div className={classes.backdrop} onClick={props.onClose}></div>

}

const ModaalOverlay = (props) => {

    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>

}

const portalElement = document.getElementById('overlays');

const Modal = (props) => {

    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onCloseCart} />, portalElement)}
        {ReactDOM.createPortal(<ModaalOverlay>{props.children}</ModaalOverlay>, portalElement)}
    </Fragment>

}

export default Modal;