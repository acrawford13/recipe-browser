import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import RecipeList from './RecipeList';
import RecipeListItem from './RecipeListItem/RecipeListItem';

configure({ adapter: new Adapter() });

describe('<RecipeList />', () => {
    it('should render a list of recipes', () => {
        const wrapper = shallow(<RecipeList recipes={[{id: 1, name: 'Recipe 1'},{id: 2, name: 'Recipe 2'}]} />);
        expect(wrapper.find(RecipeListItem)).toHaveLength(2);
    });

    it('should render an empty list if no recipes are passed in', () => {
        const wrapper = shallow(<RecipeList recipes={[]} />);
        expect(wrapper.find('.recipe-list')).toHaveLength(1);
        expect(wrapper.find(RecipeListItem)).toHaveLength(0);
    });
});