import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import AddVideo from '../components/targeted-video';
describe('Test case for testing to enter a URL', () => {
    Enzyme.configure({ adapter: new Adapter() })
    let wrapper;
    test('URL enter', () => {
        wrapper = shallow( < AddVideo / > );
        wrapper.find('input[type="text"]').simulate('change', { target: { placeholder: 'Enter the URL here', value: 'Testing URL' } });
        expect(wrapper.state('URL')).toEqual('Testing URL');
    })
    test('Checking the entry of URL to db', async() => {
        const axios = require('axios');
        const res = await axios.post('http://localhost:4000/api/TargetedVideo', {
                url: "http://localhost:4000/api/TargetedVideo"
            })
            // console.log(res);
        expect(res.data).toEqual(true);
        expect(res.status).toEqual(200);
    })
})