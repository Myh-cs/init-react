import React from 'react'
import { shallow } from 'enzyme'
import Footer from './footer.jsx'


const setup = (props) => {

    let component = shallow(
        <Footer {...props} />
    )
    return component
}

describe('<Footer/>', () => {
    it('have all link', () => {
        const component = setup({filter: 'All'})
 
        expect(component.find('Link').find({ selected: true }).length).toBe(1)
        expect(component.find('Link').find({ selected: false}).length).toBe(2)
    });
    it('have Active link', () => {
        const component = setup({ filter: 'Active' })

        expect(component.find('Link').find({ selected: true }).length).toBe(1)
        expect(component.find('Link').find({ selected: false }).length).toBe(2)
    });
    it('have Completed link', () => {
        const component = setup({ filter: 'Completed' })
        expect(component.find('Link').find({ selected: true }).length).toBe(1)
        expect(component.find('Link').find({ selected: false }).length).toBe(2)
    });
})