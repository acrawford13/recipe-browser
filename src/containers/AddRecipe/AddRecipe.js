import React, { Component } from 'react';

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
                        },
                        measurement: {
                            type: 'text',
                            placeholder: 'Measurement',
                        },
                        name: {
                            type: 'text',
                            placeholder: 'Ingredient Name',
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

    addFieldHandler = (e, type) => {
        e.preventDefault();
        this.setState({
            fields: {
                ...this.state.fields,
                name2: {
                    type: 'text',
                    placeholder: 'dd name',
                    value: '',
                }
            }
        })
    }
    
    newSeasoningHandler = (e) => {
        console.log('new seasoning handler');
        this.setState({
            form: {
                ...this.state.form,
                sections: {
                    ...this.state.form.sections,
                    seasonings: {
                        ...this.state.form.sections.seasonings,
                        activeField: {
                            ...this.state.form.sections.seasonings.activeField,
                            value: e.target.value,
                        },
                    }
                }
            }
        })
    }

    removeSeasoningHandler = (e, id) =>{
        e.preventDefault();
        const section = this.state.form.sections.seasonings;
        const updatedFields = section.fields;
        delete updatedFields[id];
        console.log(updatedFields);

        this.setState({
            form: {
                ...this.state.form,
                sections: {
                    ...this.state.form.sections,
                    seasonings: {
                        ...this.state.form.sections.seasonings,
                        fields: updatedFields,
                    }
                }
            }
        });
    }
    
    updateSeasoningHandler = (e, id) => {
        const section = this.state.form.sections.seasonings;
        const editingField = section.fields[id];
        const updatedField = {
            ...editingField,
            value: e.target.value,
        }
        this.setState({
            form: {
                ...this.state.form,
                sections: {
                    ...this.state.form.sections,
                    seasonings: {
                        ...section,
                        fields: {
                            ...section.fields,
                            [id]: updatedField,
                        }
                    }
                }
            }
        })
    }

    addSeasoningHandler = (e) => {
        console.log('add seasoning handler');
        e.preventDefault();
        const currentFields = {...this.state.form.sections.seasonings.fields};
        currentFields[this.state.form.sections.seasonings.activeField.id] = {value: this.state.form.sections.seasonings.activeField.value};
        this.setState({
            form: {
                ...this.state.form,
                sections: {
                    ...this.state.form.sections,
                    seasonings: {
                        ...this.state.form.sections.seasonings,
                        fields: currentFields,
                        activeField: {
                            value: '',
                            id: 'seasonings' + new Date().getTime(),
                        }
                    }
                }
            }
        })
    }

    addInputHandler = (e, sectionId) => {
        e.preventDefault();
        // store reference to section
        const section = this.state.form.sections[sectionId];
        // copy this section's fields
        const currentFields = {...section.fields};
        // move active field to fields array.
        currentFields[sectionId + new Date().getTime()] = {...section.defaultFields};
        const defaultFields = {...section.defaultFields};
        console.log(defaultFields);
        for (let key in defaultFields) {
            const defaultField = {...defaultFields[key]};
            defaultField.value = '';
            defaultFields[key] = defaultField;
        }
        console.log(defaultFields);
        this.setState({
            form: {
                ...this.state.form,
                sections: {
                    ...this.state.form.sections,
                    [sectionId]: {
                        ...section,
                        fields: currentFields,
                        defaultFields: defaultFields,
                    }
                }
            }
        })
    }

    removeInputHandler = (e, id, sectionId) =>{
        e.preventDefault();
        const section = this.state.form.sections[sectionId];
        const updatedFields = section.fields;
        delete updatedFields[id];

        this.setState({
            form: {
                ...this.state.form,
                sections: {
                    ...this.state.form.sections,
                    [sectionId]: {
                        ...section,
                        fields: updatedFields,
                    }
                }
            }
        });
    }
    
    editExistingInputHandler = (e, id, id2, sectionId) => {
        const section = this.state.form.sections[sectionId];
        this.setState({
            form: {
                ...this.state.form,
                sections: {
                    ...this.state.form.sections,
                    [sectionId]: {
                        ...section,
                        fields: {
                            ...section.fields,
                            [id]: {
                                ...section.fields[id],
                                [id2]: {
                                    ...section.fields[id2],
                                    value: e.target.value,
                                }
                            }
                        },
                    }
                }
            }
        })
    }
    
    editActiveInputHandler = (e, field, sectionId) => {
        console.log(field);
        const section = this.state.form.sections[sectionId];
        this.setState({
            form: {
                ...this.state.form,
                sections: {
                    ...this.state.form.sections,
                    [sectionId]: {
                        ...section,
                        defaultFields: {
                            ...section.defaultFields,
                            [field]: {
                                ...section.defaultFields[field],
                                value: e.target.value,
                            }
                        },
                    }
                }
            }
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
                    <button onClick={(e) => {this.addFieldHandler(e, 'text')}}>add field</button>
                    <IngredientsFormSection
                        onChangeHandler={this.editActiveInputHandler}
                        onEditHandler={this.editExistingInputHandler}
                        addField={(e) => {this.addInputHandler(e, 'ingredients')}}
                        removeField={this.removeInputHandler}
                        fields={this.state.form.sections.ingredients} />
                    <SeasoningsFormSection
                        onChangeHandler={(e) => {this.editActiveInputHandler(e, 'seasonings')}}
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