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
    
    editActiveInputHandler = (e, fieldId, groupId) => {
        this.setState({
            form: update(this.state.form, {
                fields: {
                    [groupId]: {
                        defaultFields: {
                            [fieldId]: {
                                value: {$set: e.target.value}
                            }
                        }
                    }
                }
            })
        })
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
            onChangeHandler: this.editActiveInputHandler,
            onEditHandler: this.editExistingInputHandler,
            addField: this.addInputHandler,
            removeField: this.removeInputHandler
        };

        formData = formData.map(field => {
            if (field.fieldType && field.fieldType === 'multi') {
                return <MultiFieldFormSection
                            key={field.id}
                            fields={this.state.form.fields[field.id]}
                            {...field}
                            {...multiInputHandlers} />
            } else {
                return (
                <div key={field.id} className="form-row">
                    <Input changed={this.onChangeHandler} {...field}/>
                </div>)
            }
        });
        
        const dataToArray = (data) => {
            return Object.keys(data).map(
                dataId => Object.keys(data[dataId]).map(
                    fieldId => data[dataId][fieldId].value
                )
            );
        }
        
        const dataToObject = (data) => {
            return Object.keys(data).map(
                dataId => {
                    const value = {};
                    for (let key in data[dataId]){
                        value[key] = data[dataId][key].value;
                    }
                    return value;
                }
            )
        }

        return (
            <form className="form" onSubmit={(e) => {
                    e.preventDefault();
                    let submitData = {...this.state.form.fields};

                    for (let fieldName in submitData) {
                        let field = {...submitData[fieldName]};
                        if (field.type === 'multi') {
                            let formFields = Object.keys(field.defaultFields);
                            if(formFields.length === 1){
                                // if there is only one default field, submit data as an array
                                field = dataToArray(field.data);
                            } else {
                                // else submit data as an object with field names
                                field = dataToObject(field.data);
                            }
                        } else if (field.type === 'file') {
                            if(field.data){
                                field = field.data;
                            }
                        } else {
                            field = field.value
                        }
                    }

                    // let submitData = {};
                    // for (let key in this.state.form.fields) {
                    //     console.log(this.state.form.fields[key]);
                    //     if(!this.state.form.fields[key].hasOwnProperty('data')){
                    //         // add data from normal fields
                    //         submitData[key] = {value: this.state.form.fields[key].value}
                    //     } else {
                    //         let subData = [];
                    //         if (Object.keys(this.state.form.fields[key].data).length===1) {
                    //             console.log(Object.keys(this.state.form.fields[key].data));
                    //         } else {
                                
                    //         for (let key2 in this.state.form.fields[key].data) {
                    //             let subSubData = {};
                    //             if(Object.keys(this.state.form.fields[key].data[key2]).length === 1){
                    //                 subSubData[key2] = this.state.form.fields[key].data[key2].value;
                    //             } else {
                    //                 for (let key3 in this.state.form.fields[key].data[key2]) {
                    //                     if (Object.keys(this.state.form.fields[key].data[key2]).length === 1) {
                    //                         subSubData = this.state.form.fields[key].data[key2][key3].value;
                    //                     } else {
                    //                         // put object keys into array
                    //                         subSubData[key3] = this.state.form.fields[key].data[key2][key3].value
                    //                     }
                    //                 }
                    //             }
                    //             subData.push(subSubData);
                    //         }
                    //         submitData[key] = subData;
                    //         }
                    //     }
                    // }
                    console.log(submitData);
                }}>
                {formData}
                <input type="submit" value="Submit" />
            </form>)
    }
}
 
export default recipeForm;