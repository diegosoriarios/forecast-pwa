import React from 'react'

const Modal = (props) => {
    return (
        <div className="modal">
            <div className="box-modal">
                <h3>{props.title}</h3>
                <button onClick={() => props.show()}>OK</button>
            </div>
        </div>
    );
}

export default Modal;