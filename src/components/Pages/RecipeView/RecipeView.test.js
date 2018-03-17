import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import RecipeView from './RecipeView';
import { Redirect } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('<RecipeView />', () => {
    let wrapper;
    const data = {
        name: "Recipe name",
        ingredients: [{
            amount: 4,
            unit: '',
            name: 'items with no unit'
        },{
            amount: 4,
            unit: 'g',
            name: 'of items without a space'
        },{
            amount: 4,
            unit: 'bunches',
            name: 'of items with a space'
        }]
    }
    
    it('should format ingredients properly', () => {
        wrapper = shallow(<RecipeView recipe={data} />);
        expect(wrapper.text()).toContain('4 bunches of items with a space');
        expect(wrapper.text()).toContain('4g of items without a space');
        expect(wrapper.text()).toContain('4 items with no unit');
    });

    it('should render a redirect if no recipe is passed in', () => {
        wrapper = shallow(<RecipeView />);
        expect(wrapper.find(Redirect)).toHaveLength(1);
    });

    it('should not render a container if no value is defined for that field', () => {
        wrapper = shallow(<RecipeView recipe={{name: 'test'}} />);
        expect(wrapper.find('div.recipe-detail__description')).toHaveLength(0);
        expect(wrapper.find('div.recipe-detail__image')).toHaveLength(0);
        expect(wrapper.find('div.recipe-detail__ingredients')).toHaveLength(0);
        expect(wrapper.find('div.recipe-detail__seasonings')).toHaveLength(0);
        expect(wrapper.find('div.recipe-detail__steps')).toHaveLength(0);
    });
});