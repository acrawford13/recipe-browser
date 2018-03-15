import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import RecipeForm from './RecipeForm';
import MultiFormFieldSection from '../../components/UI/Forms/Sections/MultiFieldFormSection/MultiFieldFormSection';

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
                            value: 'test value',
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
    let groupName, group;
    
    beforeEach(() => {
        wrapper = mount(<RecipeForm />);
        wrapper.setState(data);
        prevDataLength = Object.keys(data.form.fields.group1.data).length;
        groupName = 'group1';
        group = wrapper.find(MultiFormFieldSection).findWhere(n => n.key() === groupName);
    });

    it('should update the correct defaultField value when the active field is updated', () => {
        const fieldName = 'field1';
        const newValue = 'test value';
        group.find('.multiInput-row--active input').findWhere(n => n.key() === fieldName).simulate('change', {target: {value: newValue}});
        expect(wrapper.state().form.fields[groupName].defaultFields[fieldName].value).toBe(newValue);
    });

    it('should update the correct data value when an existing field is updated', () => {
        const fieldName = 'field1';
        const dataId = 'group11234';
        const newValue = 'test value';
        group.find('.multiInput-row').findWhere(n => n.key() === dataId).find('input').findWhere(n => n.key() === fieldName).simulate('change', {target: {value: newValue}});
        expect(wrapper.state().form.fields[groupName].data[dataId][fieldName].value).toBe(newValue);
    });

    it('should add data to the correct section when add button is clicked', () => {
        group.find('.multiInput-row .button--add').first().simulate('click');
        expect(Object.keys(wrapper.state().form.fields[groupName].data).length).toEqual(prevDataLength + 1);
    });

    it('should remove data from the correct section when remove button is clicked', () => {
        group.find('.multiInput-row .button--remove').first().simulate('click');
        expect(Object.keys(wrapper.state().form.fields[groupName].data).length).toEqual(prevDataLength - 1);
    });
});