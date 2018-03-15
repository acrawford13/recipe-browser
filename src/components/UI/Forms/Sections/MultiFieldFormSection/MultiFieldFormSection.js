import React from 'react';

import Input from '../../Input/Input';

const multiFieldFormSection = (props) => {
    // map default fields to array
    const defaultFields = [];
    for (let key in props.fields.defaultFields) {
        defaultFields.push({
            ...props.fields.defaultFields[key],
            id: key,
        });
    }

    // map existing data to array
    const existingData = [];
    for (let key in props.fields.data) {
        existingData.push({
            fields: Object.keys(props.fields.data[key]).map(
                item => ({...props.fields.data[key][item], id: item}),
            ),
            id: key,
        });
    }

    // function to return default props
    const defaultProps = (field) => ({
        key: field.id,
        size: field.size,
        type: field.type,
        options: field.options,
        inputType: field.inputType,
        placeholder: field.placeholder,
        value: field.value});

    return (
        <div>
            <h4>{props.label}</h4>
            {existingData.map(
                row => (<div key={row.id} className="multiInput-row">
                        {row.fields.map(
                            field => (<Input
                                    key={field.id}
                                    {...defaultProps(field)}
                                    changed={(e) => {props.onEditHandler(e, row.id, field.id, props.id)}} />))}
                        <span className="button button--remove" onClick={(e) => {props.removeField(e, row.id, props.id)}}>-</span>
                </div>)
            )}
            <div className="multiInput-row multiInput-row--active">
                {defaultFields.map(
                    field => (
                        <Input
                            key={field.id}
                            {...defaultProps(field)}
                            changed={(e) => {props.onChangeHandler(e, field.id, props.id)}} />
                    )
                )}
                <span className="button button--add" onClick={(e) => {props.addField(e, props.id)}}>+</span>
            </div>
        </div>
    )
}
 
export default multiFieldFormSection;