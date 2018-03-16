import React from 'react';

import Input from '../../Input/Input';


const multiFieldFormSection = (props) => {
    const error = props.error ? <p className="input__error">{props.error}</p> : '';
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
        <div className="multi-input">
            <h4 className="form__label">{props.label}</h4>
            {existingData.map(
                row => (<div key={row.id} className="multi-input__row">
                        {row.fields.map(
                            field => (<Input
                                key={field.id}
                                {...defaultProps(field)}
                                changed={(e) => {props.onEditHandler(e, row.id, field.id, props.id)}} />))}
                        <span className="button button--remove button--danger" onClick={(e) => {props.removeField(e, row.id, props.id)}}>×</span>
                </div>)
            )}
            {error}
            <div className="multi-input__controls">
                <span className="button button--add" onClick={(e) => {props.addField(e, props.id)}}>Add a row</span>
            </div>
        </div>
    )
}
 
export default multiFieldFormSection;