import React from 'react';

const modal = (props) => {
    const modal = (
    <div className="modal__wrapper" onClick={props.clicked}>
        <div className="modal">{props.children}</div>
    </div>);

    return props.show ? modal : null;
}
 
export default modal;