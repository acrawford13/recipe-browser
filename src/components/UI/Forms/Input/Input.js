import React from 'react';

import IngredientInput from './IngredientInput/IngredientInput';

const input = (props) => {
    switch (props.inputType) {
        case 'ingredient':
            return <IngredientInput />
        case 'multi':
            const multiFields = [];
            for (let key in props.field.fields) {
                multiFields.push({
                    ...props.field.fields[key],
                    id: key,
                });
            }
            return multiFields.map(field => (<h1>{field.placeholder}</h1>));
        default:
            return <input
                value={props.value}
                onChange={props.changed}
                placeholder={props.placeholder}
                type={props.type} />
    }
}
 
export default input;