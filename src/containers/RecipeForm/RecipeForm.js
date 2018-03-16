import React, { Component } from 'react';
import update from 'immutability-helper';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import MultiFieldFormSection from '../../components/UI/Forms/Sections/MultiFieldFormSection/MultiFieldFormSection';
import Input from '../../components/UI/Forms/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import { checkValidity, dataToArray, dataToObject } from '../../utilities/utilities';

class recipeForm extends Component {
    state = {
        loading: false,
        form: {
            isValid: false,
            fields: {
                name: {
                    type: 'text',
                    label: 'Recipe name',
                    value: '',
                    validation: {
                        required: true,
                    },
                    touched: false,
                    error: null,
                },
                description: {
                    fieldType: 'textarea',
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
                    validation: {
                        minDataLength: 1,
                    },
                    error: false,
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
                    validation: {
                        minDataLength: 1,
                    },
                    error: false,
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
                    validation: {
                        minDataLength: 1,
                    },
                    error: false,
                }
            }
        }
    }

    constructor(props) {
        super(props);
        const formData = {...this.state.form.fields};
        
        for(let fieldId in formData){
            if(formData[fieldId].fieldType && formData[fieldId].fieldType === 'multi'){
                formData[fieldId] = update(formData[fieldId], {
                    data: {[fieldId + new Date().getTime()] : {$set: {...formData[fieldId].defaultFields}}}
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
                value: e.target.value,
                error: checkValidity(e.target.value, this.state.form.fields[fieldId].validation)
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
                        },
                        error: {
                            $set: checkValidity(
                                this.state.form.fields[fieldId].data,
                                this.state.form.fields[fieldId].validation
                            )
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
                        },
                        error: {$set: checkValidity(this.state.form.fields[groupId].data, this.state.form.fields[groupId].validation)}
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
                        },
                        error: {$set: checkValidity(this.state.form.fields[groupId].data, this.state.form.fields[groupId].validation)}
                    }
                }
            })
        })
    }

    validateForm = (form) => {
        let validatedForm = form;
        for (let fieldId in validatedForm.fields) {
            if(validatedForm.fields[fieldId].validation){
                const data = validatedForm.fields[fieldId].data ? validatedForm.fields[fieldId].data : validatedForm.fields[fieldId].value;
                const error = checkValidity(data, validatedForm.fields[fieldId].validation);
                if (error && form.isValid){
                    form.isValid = false;
                }
                validatedForm = update(validatedForm, {fields: {[fieldId]: {
                    error: {$set: error},
                    touched: {$set: true},
                }}});
            }
        }
        return validatedForm;
    }

    handleSubmission = (e) => {
        // this.setState({form: this.validateForm(this.state.form)});

        e.preventDefault();

        let form = this.state.form;

        for (let fieldId in form.fields){
            if(form.fields[fieldId].defaultFields){
                const defaults = {...form.fields[fieldId].defaultFields};
                for (let defaultKey in form.fields[fieldId].defaultFields){
                    if (form.fields[fieldId].defaultFields[defaultKey].value){
                        form = update(form, {fields: {[fieldId]: {data: {[defaultKey + new Date().getTime()]: {$set: defaults}}}}})
                        form = update(form, {fields: {[fieldId]: {defaultFields: {[defaultKey]: {value: {$set: ''}}}}}});
                    }
                }

                for (let key in form.fields[fieldId].data){
                    if(!Object.keys(form.fields[fieldId].data[key]).map(item => form.fields[fieldId].data[key][item].value).join('').trim()){
                        form = update(form, {fields: {[fieldId]: {data: {$unset: [key]}}}});
                    }
                }
            }
        }

        form = this.validateForm(form);

        this.setState({
            form: update(this.state.form, {$set: form}),
        });

        if(!form.isValid) {
            return;
        }

        let submitData = {...form.fields};

        for (let fieldId in submitData) {
            let field = {...submitData[fieldId]};
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
            submitData = update(submitData, {[fieldId]: {$set: field}});
        }

        console.log(submitData);

        // axios.post('https://private-anon-bd952d998b-reactnativemockapi.apiary-mock.com/recipes', submitData)
        //     .then(res => {
        //         console.log(res.data);
        //         this.props.history.push('/');
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }

    render() {
        let formData = [];
        for (let fieldId in this.state.form.fields) {
            formData.push({
                ...this.state.form.fields[fieldId],
                id: fieldId
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

        let form = this.state.loading ? <Spinner /> : formData;

        return (
            <form className="form" onSubmit={(e) => {this.handleSubmission(e)}}>
                <h3 className="form__title">Add a new recipe</h3>
                <div className="form__content">
                    {form}
                    <input type="submit" value="Submit" />
                </div>
            </form>)
    }
}
 
export default withRouter(recipeForm);