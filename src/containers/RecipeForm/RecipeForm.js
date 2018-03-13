import React, { Component } from 'react';
import update from 'immutability-helper';

import MultiFieldFormSection from '../../components/UI/Forms/Sections/MultiFieldFormSection/MultiFieldFormSection';
import SeasoningsFormSection from '../../components/UI/Forms/Sections/SeasoningsFormSection/SeasoningsFormSection';

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
            valuesToCopy[key] = {...section.defaultFields[key]};
            defaultValues[key] = update(section.defaultFields[key], {value: {$set: ''}});
        }

        this.setState({
            form: update(this.state.form, {
                sections: {
                    [sectionId]: {
                        data: {
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
        const updatedData = section.data;
        delete updatedData[id];

        this.setState({
            form: update(this.state.form, {
                sections: {
                    [sectionId]: {
                        data: {
                            $set: updatedData
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
        for (let fieldName in this.state.form) {
            formData.push({
                ...this.state.form[fieldName],
                id: fieldName
            });
        }

        console.log(formData);

        const multiInputHandlers = {
            onChangeHandler: this.editActiveInputHandler,
            onEditHandler: this.editExistingInputHandler,
            addField: this.addInputHandler,
            removeField: this.removeInputHandler
        };

        const seasoningsSection = 
            <MultiFieldFormSection
                id="seasonings" {...multiInputHandlers}
                fields={this.state.form.sections.seasonings} />;

        const ingredientsSection = 
            <MultiFieldFormSection
                id="ingredients" {...multiInputHandlers}
                fields={this.state.form.sections.ingredients} />;

        const stepsSection = 
            <MultiFieldFormSection
                id="steps" {...multiInputHandlers}
                fields={this.state.form.sections.steps} />;

        return (
            <div className="main-container">
                <form onSubmit={(e) => {e.preventDefault()}}>
                    <h4>Ingredients</h4>
                    {ingredientsSection}
                    <h4>Seasonings</h4>
                    {seasoningsSection}
                    <h4>Steps</h4>
                    {stepsSection}
                </form>
            </div>)
    }
}
 
export default addRecipe;