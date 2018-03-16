export const checkValidity = (value, rules) => {
    let isValid = true;
    let error = null;

    if(!rules) {
        return {valid: isValid, error: null};
    }

    if(rules.required) {
        isValid = value.trim() !== '' && isValid;
        error = !isValid ? 'This field is required' : null;
    }

    if(rules.minDataLength){
        isValid = Object.keys(value).length >= rules.minDataLength;
        error = !isValid ? 'This field must have at least 1 entry' : null;
    }

    console.log(value);
    return error;
}

export const checkMultiValidity = (data, rules) => {
    return false;
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