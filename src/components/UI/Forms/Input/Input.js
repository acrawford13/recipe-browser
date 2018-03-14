import React from 'react';

const input = (props) => {
    console.log(props);
    switch (props.fieldType) {
        case 'select':
            return <select value={props.value}>{props.options.map(item => (<option value={item.value}>{item.displayValue}</option>))}</select>;
        default:
            if (props.label) {
                return <div><label for={props.id}>{props.label}</label><input
                    id={props.id}
                    style={props.style}
                    value={props.value}
                    onChange={(e) => {props.changed(e, props.id)}}
                    placeholder={props.placeholder}
                    type={props.type} /></div>
            }
            return <input
                style={props.style}
                value={props.value}
                onChange={(e) => {props.changed(e, props.id)}}
                placeholder={props.placeholder}
                type={props.type} />
    }
}
 
export default input;