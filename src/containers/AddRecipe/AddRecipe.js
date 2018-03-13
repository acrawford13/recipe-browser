import React, { Component } from 'react';
import update from 'immutability-helper';

import Input from '../../components/UI/Forms/Input/Input';
import IngredientsFormSection from '../../components/UI/Forms/Sections/IngredientsFormSection/IngredientsFormSection';
import SeasoningsFormSection from '../../components/UI/Forms/Sections/SeasoningsFormSection/SeasoningsFormSection';
import StepsFormSection from '../../components/UI/Forms/Sections/StepsFormSection/StepsFormSection';


class addRecipe extends Component {
    state = {
        form: {
            sections: {
                main: {
                    fields: {
                        name: {
                            type: 'text',
                            placeholder: 'Recipe name',
                            value: '',
                        },
                    }
                },
                ingredients: {
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
                        },
                    },
                    fields: {},
                },
                seasonings: {
                    defaultFields: {
                        seasoning: {
                            type: 'text',
                            placeholder: 'Seasoning',
                        }
                    },
                    fields: {},
                },
                steps: [
                    'andrea',
                ]
            }
        }
    }

    onChangeHandler = (e, key) => {
        this.setState({
            fields: {
                ...this.state.fields,
                [key]: {
                    ...this.state.fields[key],
                    value: e.target.value,
                }
            }
        })
    }    

    addInputHandler = (e, sectionId) => {
        e.preventDefault();

        const section = this.state.form.sections[sectionId];
        const valuesToCopy = {};
        const defaultValues = {};

        for (let key in section.defaultFields){
            valuesToCopy[key] = {value: section.defaultFields[key].value};
            defaultValues[key] = update(section.defaultFields[key], {$set: {value: ''}});
        }

        this.setState({
            form: update(this.state.form, {
                sections: {
                    [sectionId]: {
                        fields: {
                            $merge: {
                                [sectionId + new Date().getTime()]: valuesToCopy,
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

    removeInputHandler = (e, id, sectionId) =>{
        e.preventDefault();
        const section = this.state.form.sections[sectionId];
        const updatedFields = section.fields;
        delete updatedFields[id];

        this.setState({
            form: update(this.state.form, {
                sections: {
                    [sectionId]: {
                        fields: {
                            $set: updatedFields
                        }
                    }
                }
            })
        });
    }
    
    editExistingInputHandler = (e, id, id2, sectionId) => {
        this.setState({
            form: update(this.state.form, {
                sections: {
                    [sectionId]: {
                        fields: {
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
    
    editActiveInputHandler = (e, field, sectionId) => {
        this.setState({
            form: update(this.state.form, {
                sections: {
                    [sectionId]: {
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
        const formData = [];
        for (let fieldName in this.state.fields) {
            formData.push({
                ...this.state.fields[fieldName],
                id: fieldName
            });
        }

        return (
            <div className="main-container">
                <form>
                    {formData.map(field => (
                    <Input
                        field={field}
                        type={field.type}
                        changed={(e) => (this.onChangeHandler(e, field.id))}
                        key={field.id}
                        value={field.value}
                        placeholder={field.placeholder} />))}
                    <IngredientsFormSection
                        onChangeHandler={this.editActiveInputHandler}
                        onEditHandler={this.editExistingInputHandler}
                        addField={(e) => {this.addInputHandler(e, 'ingredients')}}
                        removeField={this.removeInputHandler}
                        fields={this.state.form.sections.ingredients} />
                    <SeasoningsFormSection
                        onChangeHandler={this.editActiveInputHandler}
                        onEditHandler={this.editExistingInputHandler}
                        addField={(e) => {this.addInputHandler(e, 'seasonings')}}
                        removeField={this.removeInputHandler}
                        fields={this.state.form.sections.seasonings} />
                    {/* <MultiInput
                        onChangeHandler={(e) => {this.editActiveInputHandler(e)}}
                        onEditHandler={this.editExistingInputHandler}
                        addField={(e) => {this.addInputHandler(e)}}
                        removeField={this.removeInputHandler}
                        fields={this.state.form.sections.seasonings} /> */}
                    <StepsFormSection fields={this.state.form.sections.steps} />
                </form>
            </div>)
    }
}
 
export default addRecipe;