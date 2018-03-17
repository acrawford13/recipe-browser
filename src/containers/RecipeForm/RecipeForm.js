import React, { Fragment, Component } from 'react';
import update from 'immutability-helper';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import withErrorHandler from '../../hoc/withErrorHandler';
import MultiInput from '../../components/UI/Forms/MultiInput/MultiInput';
import Input from '../../components/UI/Forms/Input/Input';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import { checkValidity, validateForm, formatDataSubmission } from './RecipeFormUtilities';

export class RecipeForm extends Component {
    state = {
        success: false,
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
    
    handleSubmission = (e) => {
        e.preventDefault();

        const validatedForm = validateForm(this.state.form);
        
        // if form is not valid, stop form submission
        if(!validatedForm.isValid) {
            this.setState({form: validatedForm});
            return;
        } else {
            this.setState({form: validatedForm, loading: true});
        }

        const formattedData = formatDataSubmission(validatedForm);

        axios.post('https://private-anon-bd952d998b-reactnativemockapi.apiary-mock.com/recipes', formattedData)
            .then(res => {
                this.setState({success: res.data.success, loading: false});
            })
            .catch(err => {
                this.setState({loading: false, success: false});
            });
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
                    <MultiInput
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
            <Fragment>
                <Modal clicked={()=>{this.props.history.push('/')}} show={this.state.success}>Recipe added successfully</Modal>
                <form className="form" onSubmit={(e) => {this.handleSubmission(e)}}>
                    <h3 className="form__title">Add a new recipe</h3>
                    <div className="form__content">
                        {form}
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </Fragment>)
    }
}
 
export default withRouter(withErrorHandler(RecipeForm, axios));