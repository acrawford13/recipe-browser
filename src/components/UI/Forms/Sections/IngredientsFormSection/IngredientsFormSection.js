import React from 'react';

import Input from '../../Input/Input';

const ingredientsFormSection = (props) => {
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
            <h4>Ingredients</h4>
            <div className="ingredients-grid">
            {/* existing fields */}
            {existingfields.map(fieldGroup => (
                <div className="ingredients-form-row">{fieldGroup.arrayFields.map(field => (<Input
                    type="text"
                    changed={(e) => {props.onEditHandler(e, fieldGroup.id, field.id, 'ingredients')}}
                    value={field.value} />))}
                    <button onClick={(e) => {props.removeField(e, fieldGroup.id, 'ingredients')}}>-</button></div>
            ))}
            {/* new field */}
            <div className="ingredients-form-row">
            {defaultFields.map(field => (
                <Input
                    changed={(e) => {props.onChangeHandler(e, field.id, 'ingredients')}}
                    placeholder={field.placeholder}
                    field={field.value}
                    value={field.value} />
            ))}
            <input type="submit" onClick={props.addField} value="+" />
            </div>
            </div>
        </div>
    )
}
 
export default ingredientsFormSection;