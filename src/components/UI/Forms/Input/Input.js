import React from 'react';

const input = (props) => {
    let input;
    const label = props.label ? <label className="form__label" htmlFor={props.id}>{props.label}</label> : '';
    const error = props.error ? <p className="input__error">{props.error}</p> : '';
    switch (props.fieldType) {
        case 'select':
            input = <select value={props.value}>{props.options.map(item => (<option value={item.value}>{item.displayValue}</option>))}</select>;
            break;
        case 'textarea':
            input = <textarea
                id={props.id}
                style={props.style}
                value={props.value}
                onChange={(e) => {props.changed(e, props.id)}}
                placeholder={props.placeholder} />
            break;
        default:
            input = <input
                id={props.id}
                style={props.style}
                value={props.value}
                onChange={(e) => {props.changed(e, props.id)}}
                placeholder={props.placeholder}
                type={props.type}
                size={props.size || props.placeholder ? props.placeholder.length : 20} />
    };

    return <div className="input-group">{label}{input}{error}</div>
}
 
export default input;