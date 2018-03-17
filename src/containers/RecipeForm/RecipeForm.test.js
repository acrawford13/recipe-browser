import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { RecipeForm } from './RecipeForm';
import MultiInput from '../../components/UI/Forms/MultiInput/MultiInput';

configure({ adapter: new Adapter() });

describe('<RecipeForm /> basic behaviour', () => {
    const data = {
        form: {
            fields: {
                field1: {
                    type: 'text',
                    value: '',
                }
            }
        }
    }

    it('should render', () => {
        let wrapper = shallow(<RecipeForm />);
        expect(wrapper).toBeDefined();
    });

    it('should render the correct number of inputs', () => {
        let wrapper = mount(<RecipeForm />);
        wrapper.setState(data);
        expect(wrapper.find('input').hostNodes()).toHaveLength(Object.keys(data.form.fields).length + 1);
    });
})

describe('<RecipeForm /> multi input behaviour', () => {
    const data = {
        form: {
            fields: {
                group1: {
                    fieldType: 'multi',
                    defaultFields: {
                        field1: {
                            type: 'text',
                            value: '',
                        },
                    },
                    data: {
                        group11234: {
                            field1: {
                                value: 'test'
                            }
                        },
                        group11235: {
                            field1: {
                                value: 'test'
                            }
                        }
                    }
                }
            }
        }
    };

    let wrapper;
    let prevDataLength;
    let groupName;
    let group;
    
    beforeEach(() => {
        wrapper = mount(<RecipeForm />);
        wrapper.setState(data);
        groupName = 'group1';
        prevDataLength = Object.keys(data.form.fields.group1.data).length;
        group = wrapper.find(MultiInput).filterWhere(n => n.key() === groupName);
    });

    it('should populate the data on load', () => {
        let newWrapper = mount(<RecipeForm />);
        expect(Object.keys(newWrapper.state().form.fields.ingredients.data)).toHaveLength(1);
    })

    it('should update the correct data value when an existing field is updated', () => {
        const fieldName = 'field1';
        const dataId = 'group11234';
        const newValue = 'test value';
        group.find('.multi-input__row')
            .filterWhere(n => n.key() === dataId)
            .find('input')
            .filterWhere(n => n.key() === fieldName)
            .children()
            .find('input')
            .simulate('change', {target: {value: newValue}});
        expect(wrapper.state().form.fields[groupName].data[dataId][fieldName].value).toBe(newValue);
    });

    it('should add data to the correct section when add button is clicked', () => {
        group.find('.button--add').simulate('click');
        expect(Object.keys(wrapper.state().form.fields[groupName].data).length).toEqual(prevDataLength + 1);
    });

    it('should remove data from the correct section when remove button is clicked', () => {
        group.find('.multi-input__row .button--remove').first().simulate('click');
        expect(Object.keys(wrapper.state().form.fields[groupName].data).length).toEqual(prevDataLength - 1);
    });
});