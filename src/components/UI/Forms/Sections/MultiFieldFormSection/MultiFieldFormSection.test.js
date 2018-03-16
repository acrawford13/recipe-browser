import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import MultiFieldFormSection from './MultiFieldFormSection';

configure({ adapter: new Adapter() });

describe('<MultiFieldFormSection />', () => {
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
        let wrapper = shallow(<MultiFieldFormSection fields={fields} />);
        expect(wrapper.find('div.multiInput-row')).toHaveLength(Object.keys(fields.data).length);
    })
})