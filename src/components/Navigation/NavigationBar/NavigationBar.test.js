import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import NavigationBar from './NavigationBar';
import { Link } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('<NavigationBar />', () => {
    it('should render a link to the homepage if toHome is true', () => {
        const wrapper = shallow(<NavigationBar toHome />);
        expect(wrapper.find(Link).filterWhere(n => n.hasClass('button--toHome'))).toHaveLength(1);
    });
    
    it('should render a link to add a recipe if addRecipe is true', () => {
        const wrapper = shallow(<NavigationBar addRecipe />);
        expect(wrapper.find(Link).filterWhere(n => n.hasClass('button--addRecipe'))).toHaveLength(1);
    });
});