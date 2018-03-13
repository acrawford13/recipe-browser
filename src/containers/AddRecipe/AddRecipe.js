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
                    fields: {
                        name: {
                            type: 'text',
                            placeholder: 'Recipe name',
                            value: '',
                        },
                    }
                },
                seasonings: {
                    defaultFields: {
                        seasoning: {
                            type: 'text',
                            placeholder: 'Seasoning',
                        }
                    },
                    fields: {},
                    activeField: {
                        value: '',
                        id: 'seasonings' + new Date().getTime(),
                    },
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
                    <IngredientsFormSection fields={this.state.form.sections.ingredients} />
                    <SeasoningsFormSection
                        onChangeHandler={(e) => {this.newSeasoningHandler(e)}}
                        onEditHandler={this.updateSeasoningHandler}
                        addField={(e) => {this.addSeasoningHandler(e)}}
                        removeField={this.removeSeasoningHandler}
                        fields={this.state.form.sections.seasonings} />
                    <StepsFormSection fields={this.state.form.sections.steps} />
                </form>
            </div>)
    }
}
 
export default addRecipe;