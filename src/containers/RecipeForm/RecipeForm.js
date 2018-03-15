import React, { Component } from 'react';
import update from 'immutability-helper';

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
                    type: 'text',
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
                            flex: 1,
                        },
                        measurement: {
                            type: 'text',
                            placeholder: 'Measurement',
                            value: '',
                            flex: 1,
                        },
                        name: {
                            type: 'text',
                            placeholder: 'Ingredient Name',
                            value: '',
                            flex: 2,
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
        const valuesToCopy = {};
        const defaultValues = {};

        for (let key in section.defaultFields){
            valuesToCopy[key] = {...section.defaultFields[key]};
            defaultValues[key] = update(section.defaultFields[key], {value: {$set: ''}});
        }

        this.setState({
            form: update(this.state.form, {
                fields: {
                    [fieldId]: {
                        data: {
                            $merge: {
                                [fieldId + new Date().getTime()]: valuesToCopy,
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

    removeInputHandler = (e, id, fieldId) =>{
        e.preventDefault();
        const section = this.state.form.fields[fieldId];
        const updatedData = section.data;
        delete updatedData[id];

        this.setState({
            form: update(this.state.form, {
                fields: {
                    [fieldId]: {
                        data: {
                            $set: updatedData
                        }
                    }
                }
            })
        });
    }
    
    editExistingInputHandler = (e, id, id2, fieldId) => {
        this.setState({
            form: update(this.state.form, {
                fields: {
                    [fieldId]: {
                        data: {
                            [id]: {
                                [id2]: {
                                    value: {$set: e.target.value}
                                }
                            }
                        }
                    }
                }
            })
        })
    }
    
    editActiveInputHandler = (e, field, fieldId) => {
        this.setState({
            form: update(this.state.form, {
                fields: {
                    [fieldId]: {
                        defaultFields: {
                            [field]: {
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
                return <div key={field.id} className="form-row"><Input changed={this.onChangeHandler} {...field}/></div>
            }
        });

        return (
            <form className="form" onSubmit={(e) => {e.preventDefault()}}>
                {formData}
                <input type="submit" value="Submit" />
            </form>)
    }
}
 
export default recipeForm;