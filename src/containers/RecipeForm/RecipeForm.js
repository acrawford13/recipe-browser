import React, { Component } from 'react';
import update from 'immutability-helper';
import axios from 'axios';

import MultiFieldFormSection from '../../components/UI/Forms/Sections/MultiFieldFormSection/MultiFieldFormSection';
import Input from '../../components/UI/Forms/Input/Input';

class recipeForm extends Component {
    state = {
        form: {
            fields: {
                name: {
                    type: 'text',
                    placeholder: 'Recipe name',
                    label: 'Recipe name',
                    value: '',
                },
                description: {
                    fieldType: 'textarea',
                    placeholder: 'Recipe description',
                    label: 'Recipe description',
                    value: '',
                },
                image: {
                    type: 'file',
                    value: '',
                    placeholder: 'Recipe image',
                    label: 'Recipe image',
                },
                ingredients: {
                    label: 'Ingredients',
                    fieldType: 'multi',
                    defaultFields: {
                        amount: {
                            type: 'text',
                            placeholder: 'Amount',
                            value: '',
                        },
                        measurement: {
                            type: 'text',
                            placeholder: 'Measurement',
                            value: '',
                        },
                        name: {
                            type: 'text',
                            placeholder: 'Ingredient Name',
                            value: '',
                            size: 24,
                        },
                    },
                    data: {},
                },
                seasonings: {
                    label: 'Seasonings',
                    fieldType: 'multi',
                    defaultFields: {
                        seasoning: {
                            type: 'text',
                            placeholder: 'Seasoning',
                            value: '',
                        }
                    },
                    data: {},
                },
                steps: {
                    label: 'Steps',
                    fieldType: 'multi',
                    defaultFields: {
                        step: {
                            type: 'text',
                            placeholder: 'Step',
                            value: '',
                        }
                    },
                    data: {},
                }
            }
        }
    }

    constructor(props) {
        super(props);
        const formData = {...this.state.form.fields};
        for(let fieldName in formData){
            if(formData[fieldName].fieldType && formData[fieldName].fieldType === 'multi'){
                formData[fieldName] = update(formData[fieldName], {
                    data: {[fieldName + new Date().getTime()] : {$set: {...formData[fieldName].defaultFields}}}
                })
            }
        }
        this.state = update(this.state, {form: {fields: {$set: formData}}});
    }

    onChangeHandler = (e, fieldId) => {
        let newValue;
        if(e.target.files && e.target.files.length > 0){
            newValue = {
                data: {
                    uri: 'xxxxxxxx',
                    type: e.target.files[0].type,
                },
                value: e.target.value
            }
        } else {
            newValue = {
                value: e.target.value
            }
        }

        this.setState({
            form: update(this.state.form, {
                fields: {
                    [fieldId]: {
                        $merge: newValue
                    }
                }
            })
        })
    }

    addInputHandler = (e, fieldId) => {
        e.preventDefault();

        const section = this.state.form.fields[fieldId];
        const defaultValues = {};

        for (let key in section.defaultFields){
            defaultValues[key] = update(section.defaultFields[key], {value: {$set: ''}});
        }

        this.setState({
            form: update(this.state.form, {
                fields: {
                    [fieldId]: {
                        data: {
                            $merge: {
                                [fieldId + new Date().getTime()]: section.defaultFields,
                            }
                        },
                        defaultFields: {
                            $set: defaultValues
                        }
                    }
                }
            })
        });
    }

    removeInputHandler = (e, dataId, groupId) =>{
        e.preventDefault();
        const section = this.state.form.fields[groupId];
        const updatedData = section.data;
        delete updatedData[dataId];

        this.setState({
            form: update(this.state.form, {
                fields: {
                    [groupId]: {
                        data: {
                            $set: updatedData
                        }
                    }
                }
            })
        });
    }
    
    editExistingInputHandler = (e, dataId, fieldId, groupId) => {
        this.setState({
            form: update(this.state.form, {
                fields: {
                    [groupId]: {
                        data: {
                            [dataId]: {
                                [fieldId]: {
                                    value: {$set: e.target.value}
                                }
                            }
                        }
                    }
                }
            })
        })
    }

    handleSubmission = (e) => {
        
        const dataToArray = (data) => {
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
        
        const dataToObject = (data) => {
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

        e.preventDefault();

        let fieldData = this.state.form.fields;
        for (let fieldName in fieldData){
            if(fieldData[fieldName].defaultFields){
                const defaults = {...fieldData[fieldName].defaultFields};
                for (let defaultKey in fieldData[fieldName].defaultFields){
                    if (fieldData[fieldName].defaultFields[defaultKey].value){
                        fieldData = update(fieldData, {[fieldName]: {data: {[defaultKey + new Date().getTime()]: {$set: defaults}}}})
                        fieldData = update(fieldData, {[fieldName]: {defaultFields: {[defaultKey]: {value: {$set: ''}}}}});
                    }
                }
            }
        }

        this.setState({
            form: update(this.state.form, {
                fields: {$set: fieldData}
            })}
        );

        let submitData = {...fieldData};

        for (let fieldName in submitData) {
            let field = {...submitData[fieldName]};
            if (field.fieldType === 'multi') {
                let formFields = Object.keys(field.defaultFields);
                if(formFields.length === 1){
                    // if there is only one default field, submit data as an array
                    field = dataToArray(field.data);
                } else {
                    // else submit data as an object with field names
                    field = dataToObject(field.data);
                }
            } else if (field.type === 'file') {
                field = field.data ? field.data : {};
            } else {
                field = field.value;
            }
            submitData = update(submitData, {[fieldName]: {$set: field}});
        }

        // axios.post('https://private-anon-bd952d998b-reactnativemockapi.apiary-mock.com/recipes', submitData)
        //     .then(res => {
        //         console.log(res.data)
        //     });

        console.log(fieldData);
        console.log(submitData);
    }

    render() {
        let formData = [];
        for (let fieldName in this.state.form.fields) {
            formData.push({
                ...this.state.form.fields[fieldName],
                id: fieldName
            });
        }

        const multiInputHandlers = {
            onEditHandler: this.editExistingInputHandler,
            addField: this.addInputHandler,
            removeField: this.removeInputHandler
        };

        formData = formData.map(field => {
            if (field.fieldType && field.fieldType === 'multi') {
                return (<div key={field.id} className="form-row">
                    <MultiFieldFormSection
                            key={field.id}
                            fields={this.state.form.fields[field.id]}
                            {...field}
                            {...multiInputHandlers} /></div>);
            } else {
                return (
                <div key={field.id} className="form-row">
                    <Input changed={this.onChangeHandler} {...field}/>
                </div>)
            }
        });

        return (
            <form className="form" onSubmit={(e) => {this.handleSubmission(e)}}>
                {formData}
                <input type="submit" value="Submit" />
            </form>)
    }
}
 
export default recipeForm;