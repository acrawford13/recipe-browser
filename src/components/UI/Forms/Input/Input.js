import React from 'react';

import IngredientInput from './IngredientInput/IngredientInput';

const input = (props) => {
    switch (props.inputType) {
        case 'select':
            return <select value={props.value}>{props.options.map(item => (<option value={item.value}>{item.displayValue}</option>))}</select>;
        default:
            return <input
                style={props.style}
                value={props.value}
                onChange={props.changed}
                placeholder={props.placeholder}
                type={props.type} />
    }
}
 
export default input;