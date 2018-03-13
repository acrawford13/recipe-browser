import React from 'react';

import Input from '../../Input/Input';

const seasoningsFormSection = (props) => {
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
            <h4>Seasonings</h4>
            <div className="seasonings-grid">
            {/* existing fields */}
            {existingfields.map(fieldGroup => (
                <div className="seasonings-form-row">{fieldGroup.arrayFields.map(field => (<Input
                    type={field.type}
                    placeholder={field.placeholder}
                    changed={(e) => {props.onEditHandler(e, fieldGroup.id, field.id, 'seasonings')}}
                    value={field.value} />))}
                    <span className="button" onClick={(e) => {props.removeField(e, fieldGroup.id, 'seasonings')}}>-</span></div>
            ))}
            {/* new field */}
            <div className="seasonings-form-row">
            {defaultFields.map(field => (
                <Input
                    key={field.id}
                    changed={(e) => {props.onChangeHandler(e, field.id, 'seasonings')}}
                    placeholder={field.placeholder}
                    field={field.value}
                    value={field.value} />
            ))}
            <span className="button" onClick={(e) => props.addField(e, 'seasonings')}>+</span>
            </div>
            </div>
        </div>
    )
}
 
export default seasoningsFormSection;