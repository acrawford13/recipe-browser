import React from 'react';

import Input from '../../Input/Input';

const stepsFormSection = (props) => {
    const defaultFields = [];
    for (let key in props.fields.defaultFields) {
        defaultFields.push({
            ...props.fields.defaultFields[key],
            id: key,
        });
    }
    const existingfields = [];
    for (let key in props.fields.fields) {
        existingfields.push({
            fields: {...props.fields.fields[key]},
            arrayFields: Object.keys(props.fields.fields[key]).map(
                item => ({...props.fields.fields[key][item], id: item}),
            ),
            id: key,
        });
    }

    return (
        <div>
            <h4>steps</h4>
            <ol className="steps-grid">
            {/* existing fields */}
            {existingfields.map(fieldGroup => (
                <li className="steps-form-row">{fieldGroup.arrayFields.map(field => (<Input
                    type="text"
                    changed={(e) => {props.onEditHandler(e, fieldGroup.id, field.id, 'steps')}}
                    value={field.value} />))}
                    <button onClick={(e) => {e.preventDefault(); props.removeField(e, fieldGroup.id, 'steps')}}>-</button></li>
            ))}
            </ol>
            {/* new field */}
            <div className="steps-form-row">
            {defaultFields.map(field => (
                <Input
                    key={field.id}
                    changed={(e) => {props.onChangeHandler(e, field.id, 'steps')}}
                    placeholder={field.placeholder}
                    field={field.value}
                    value={field.value} />
            ))}
            <button onClick={(e) => {e.preventDefault(); props.addField()}}>+</button>
            </div>
        </div>
    )
}
 
export default stepsFormSection;