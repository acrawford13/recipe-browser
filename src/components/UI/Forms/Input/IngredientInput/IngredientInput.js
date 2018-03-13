import React from 'react';

import Input from '../../Input/Input';

const seasoningsFormSection = (props) => {
    const defaultFields = [];
    for (let key in props.fields.defaultFields) {
        defaultFields.push({
            ...props.fields.defaultFields[key]
        })
    }
    const fields = [];
    for (let key in props.fields.fields) {
        fields.push({
            ...props.fields.fields[key],
            id: key,
        })
    }
    return (
        <div>
            <h4>Ingredients</h4>
            {/* existing fields */}
            {fields.map(field => (
                <div><Input
                    type="text"
                    changed={(e) => {props.onEditHandler(e, field.id, 'seasonings')}}
                    value={field.value} />
                    <button onClick={(e) => {props.removeField(e, field.id, 'seasonings')}}>-</button></div>
            ))}
            {/* new field */}
            {defaultFields.map(field => (
                <Input
                    changed={props.onChangeHandler}
                    placeholder={field.placeholder}
                    value={props.fields.activeField.value} />
            ))}
            <button onClick={props.addField}>+</button>
        </div>
    )
}
 
export default seasoningsFormSection;