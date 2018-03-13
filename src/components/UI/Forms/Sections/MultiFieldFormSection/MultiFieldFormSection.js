import React from 'react';

import Input from '../../Input/Input';

const multiFieldFormSection = (props) => {
    const defaultFields = [];
    for (let key in props.fields.defaultFields) {
        defaultFields.push({
            ...props.fields.defaultFields[key],
            id: key,
        });
    }
    const existingData = [];
    for (let key in props.fields.data) {
        existingData.push({
            fields: {...props.fields.data[key]},
            arrayFields: Object.keys(props.fields.data[key]).map(
                item => ({...props.fields.data[key][item], id: item}),
            ),
            id: key,
        });
    }

    return (
        <div>
            {/* existing fields */}
            {existingData.map(fieldGroup => (
                <div className="form-row">{fieldGroup.arrayFields.map(field => (
                <Input
                    style={{flex: field.flex}}
                    type={field.type}
                    options={field.options}
                    inputType={field.inputType}
                    placeholder={field.placeholder}
                    changed={(e) => {props.onEditHandler(e, fieldGroup.id, field.id, props.id)}}
                    value={field.value} />))}
                    <span className="button" onClick={(e) => {props.removeField(e, fieldGroup.id, props.id)}}>-</span>
                </div>
            ))}
            {/* new field */}
            <div className="form-row">
            {defaultFields.map(field => (
                <Input
                    style={{flex: field.flex}}
                    type={field.type}
                    options={field.options}
                    inputType={field.inputType}
                    key={field.id}
                    changed={(e) => {props.onChangeHandler(e, field.id, props.id)}}
                    placeholder={field.placeholder}
                    field={field.value}
                    value={field.value} />
            ))}
            <span className="button" onClick={(e) => {props.addField(e, props.id)}}>+</span>
            </div>
        </div>
    )
}
 
export default multiFieldFormSection;