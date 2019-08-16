import React from 'react'
import { shallow } from 'enzyme'
import Link from './link.jsx'

const props = {
    selected: true,
    children: 'All',
    onClick: jest.fn()
}


describe('<Link/>', () => {
    const warpper = shallow(
        <Link {...props} />
    );
    const anode = warpper.find('span');
    it('click ', () => {
        anode.simulate('click');
        expect(props.onClick).toHaveBeenCalled();
    });
    it('class ', () => {
        expect(anode.hasClass('selected')).toEqual(true);
        expect(anode.children().debug()).toEqual('All');

    });
})