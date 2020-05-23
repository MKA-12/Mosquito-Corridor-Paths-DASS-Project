import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import LogicBuilder from '../components/logic-builder';

describe('Test case for testing login', () => {
    window.URL.createObjectURL = function() {};
    Enzyme.configure({ adapter: new Adapter() })
    let wrapper;
    test('Checking an entry for logic builder', async() => {
        const axios = require('axios');
        const res = await axios.post('http://localhost:4000/api/logic', {
                tempMax: 25,
                tempMin: 50,
                humidityMax: 30,
                humidityMin: 70,
                windMax: 30,
                windMin: 40
            })
            // console.log(res);
        expect(res.status).toEqual(200);
    });
})