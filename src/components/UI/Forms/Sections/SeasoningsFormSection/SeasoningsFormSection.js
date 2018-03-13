import React from 'react';

import Input from '../../Input/Input';

const seasoningsFormSection = (props) => {
    const activeFields = [];
    for (let key in props.fields.activeFields) {
        activeFields.push({
            ...props.fields.activeFields[key]
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
            <h4>Seasonings</h4>
            {/* existing fields */}
            {fields.map(field => (
                <div><Input
                    type="text"
                    changed={(e) => {props.onEditHandler(e, field.id, 'seasonings')}}
                    value={field.value} />
                    <button onClick={(e) => {props.removeField(e, field.id, 'seasonings')}}>-</button></div>
            ))}
            {/* new field */}
            {activeFields.map(field => (
                <Input
                    changed={props.onChangeHandler}
                    placeholder={field.placeholder}
                    field={field.value} />
            ))}
            <button onClick={props.addField}>+</button>
        </div>
    )
}
 
export default seasoningsFormSection;