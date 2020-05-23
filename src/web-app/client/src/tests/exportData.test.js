import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import ExportData from '../components/exportData';

describe('Test case for exporting data',() =>{
Enzyme.configure({ adapter: new Adapter() })
let wrapper;
test('From date check',()=>
{
    wrapper = shallow(<ExportData/>);
    wrapper.find('input[type="date"][id="fromDate"]').simulate('change', {target: { value: '20/04/2020'}});
    expect(wrapper.state('fromDate')).toEqual('20/04/2020');
})
test('To date check',()=>
{
    wrapper = shallow(<ExportData/>);
    wrapper.find('input[type="date"][id="toDate"]').simulate('change', {target: { value: '22/04/2020'}});
    expect(wrapper.state('toDate')).toEqual('22/04/2020');
})

test('Checking an entry of dates', async() => {
    const axios = require('axios');
    const res=await axios.put('http://localhost:4000/api/macroWeatherData', {
        fromDate: new Date('20/04/2020'),
        toDate: new Date('22/04/2020')
    })
    // console.log(res);
    expect(res.status).toEqual(200)
});
})

