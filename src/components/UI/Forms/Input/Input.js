import React from 'react';

const input = (props) => {
    switch (props.fieldType) {
        case 'select':
            return <select value={props.value}>{props.options.map(item => (<option value={item.value}>{item.displayValue}</option>))}</select>;
        case 'textarea':
            if (props.label) {
                return <div><label htmlFor={props.id}>{props.label}</label><textarea
                style={props.style}
                value={props.value}
                onChange={(e) => {props.changed(e, props.id)}}
                placeholder={props.placeholder} /></div>
            }
            return <textarea
                style={props.style}
                value={props.value}
                onChange={(e) => {props.changed(e, props.id)}}
                placeholder={props.placeholder} />
        default:
            if (props.label) {
                return <div><label htmlFor={props.id}>{props.label}</label><input
                    id={props.id}
                    style={props.style}
                    value={props.value}
                    onChange={(e) => {props.changed(e, props.id)}}
                    placeholder={props.placeholder}
                    type={props.type}
                    size={props.size ? props.size : props.placeholder.length} /></div>
            }
            return <input
                style={props.style}
                value={props.value}
                onChange={(e) => {props.changed(e, props.id)}}
                placeholder={props.placeholder}
                type={props.type}
                size={props.size ? props.size : props.placeholder.length} />
    }
}
 
export default input;