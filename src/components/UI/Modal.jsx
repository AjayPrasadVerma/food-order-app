import classes from './Modal.module.css';
import { Fragment } from 'react';
import ReactDOM from 'react-dom';

const Backdrop = () => {

    return <div className={classes.backdrop}></div>

}

const ModaalOverlay = (props) => {

    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>

}

const portalElement = document.getElementById('overlays');

const Modal = (props) => {

    return <Fragment>
        {ReactDOM.createPortal(<Backdrop />, portalElement)}
        {ReactDOM.createPortal(<ModaalOverlay>{props.children}</ModaalOverlay>, portalElement)}
    </Fragment>

}

export default Modal;