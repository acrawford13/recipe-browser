import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Modal from './Modal';

configure({ adapter: new Adapter() });

describe('<Modal />', () => {
    it('should not render if show is false', () => {
        const wrapper = shallow(<Modal show={false} />);
        expect(wrapper.find('div').exists()).toBeFalsy();
    });
    
    it('should render content inside a div with class "modal"', () => {
        const wrapper = shallow(<Modal show>Modal test value</Modal>);
        expect(wrapper.find('.modal').text()).toEqual('Modal test value');
    });
});