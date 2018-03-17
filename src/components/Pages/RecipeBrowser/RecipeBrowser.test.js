import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import RecipeBrowser from './RecipeBrowser';
import RecipeList from './RecipeList/RecipeList';

configure({ adapter: new Adapter() });

describe('<RecipeBrowser />', () => {
    it('should display a message if no recipes were passed in', () => {
        const wrapper = shallow(<RecipeBrowser recipes={[]} />);
        expect(wrapper.text()).toContain('No recipes found');
    });
    
    it('should display a message if no recipe ingredients match the search term', () => {
        const wrapper = shallow(<RecipeBrowser recipes={[{ingredients: [{name: 'cheese'}]}]} />);
        wrapper.setState({searchTerm: 'milk'});
        expect(wrapper.text()).toContain('No recipes found');
    });
    
    it('should render a recipe list if recipes match the search term', () => {
        const wrapper = shallow(<RecipeBrowser recipes={[{ingredients: [{name: 'cheese'}]}]} />);
        wrapper.setState({searchTerm: 'cheese'});
        expect(wrapper.text()).toContain("Recipes with ingredients containing 'cheese'");
        expect(wrapper.find(RecipeList)).toHaveLength(1);
    });
    
    it('should render a recipe list if recipes exist and no search term is entered', () => {
        const wrapper = shallow(<RecipeBrowser recipes={[{ingredients: [{name: 'cheese'}]}]} />);
        expect(wrapper.find(RecipeList)).toHaveLength(1);
    });

});