import update from 'immutability-helper';

export const checkValidity = (value, rules) => {
    let isValid = true;
    let error = null;

    if(!rules) {
        return error;
    }

    if(rules.required) {
        isValid = value.trim() !== '' && isValid;
        error = !isValid ? 'This field is required' : null;
    }

    if(rules.minDataLength){
        isValid = Object.keys(value).length >= rules.minDataLength;
        let entries = rules.minDataLength === 1 ? 'entry' : 'entries';
        error = !isValid ? 'This field must have at least ' + rules.minDataLength + ' ' + entries : null;
    }
    return error;
}

export const dataToArray = (data) => {
    let isEmpty = true;
    const dataArray = Object.keys(data).map(
        dataId => Object.keys(data[dataId]).map(
            fieldId => {
                if(isEmpty && data[dataId][fieldId].value) {
                    isEmpty = false;
                }
                return data[dataId][fieldId].value
            }
        )
    );
    return isEmpty ? '' : dataArray;
}

export const dataToObject = (data) => {
    let isEmpty = true;
    const dataObject = Object.keys(data).map(
        dataId => {
            const value = {};
            for (let key in data[dataId]){
                if(isEmpty && data[dataId][key].value){
                    isEmpty = false;
                }
                value[key] = data[dataId][key].value;
            }
            return value;
        }
    )
    return isEmpty ? '' : dataObject;
}

export const validateForm = (form) => {
    form = update(form, {isValid: {$set: true}});
    for (let fieldId in form.fields) {
        // remove empty groups from multi fields
        if(form.fields[fieldId].fieldType === 'multi'){
            form = update(form, {fields: {[fieldId]: {$set: removeEmptyRows(form.fields[fieldId])}}});
        }

        // if field has validation rules
        if(form.fields[fieldId].validation){
            const data = form.fields[fieldId].data ? form.fields[fieldId].data : form.fields[fieldId].value;
            const error = checkValidity(data, form.fields[fieldId].validation);
            if (error && form.isValid){
                form = update(form, {isValid: {$set: false}});
            }

            form = update(form, {fields: {[fieldId]: {
                error: {$set: error},
                touched: {$set: true},
            }}});
        }
    }
    return form;
}

export const removeEmptyRows = (field) => {
    for (let row in field.data) {
        let isEmpty = true;
        for (let key in field.data[row]) {
            if (field.data[row][key].value.trim() !== '') {
                isEmpty = false;
                break;
            }
        }
        if (isEmpty) {
            field = update(field, {data: {$unset: [row]}});
        }
    }

    return field;
}

export const formatDataSubmission = (form) => {
    // format data ready for submission to api
    for (let fieldId in form.fields) {
        let field = form.fields[fieldId];
        let updatedField;
        if (field.fieldType === 'multi') {
            let formFields = Object.keys(field.defaultFields);
            if(formFields.length === 1){
                // if there is only one default field, submit data as an array
                updatedField = dataToArray(field.data);
            } else {
                // else submit data as an object with field names
                updatedField = dataToObject(field.data);
            }
        } else if (field.type === 'file') {
            updatedField = field.data ? field.data : {};
        } else {
            updatedField = field.value;
        }
        form = update(form, {fields: {[fieldId]: {$set: updatedField}}});
    }
    return form.fields;
}