import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import MultiInput from './MultiInput';

configure({ adapter: new Adapter() });

describe('<MultiInput />', () => {
    it('should render the correct number of rows', () => {
        let fields = {
            defaultFields: {
                name: {
                    type: 'text',
                }
            },
            data: {
                'test-id1': {
                    name: {
                        type: 'text',
                        value: 'test-value'
                    }
                }
            },
        }
        let wrapper = shallow(<MultiInput fields={fields} />);
        expect(wrapper.find('div.multi-input__row')).toHaveLength(Object.keys(fields.data).length);
    })
})