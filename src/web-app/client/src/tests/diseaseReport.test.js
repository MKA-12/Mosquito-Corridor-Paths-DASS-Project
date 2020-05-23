import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import DiseaseReport from '../components/diseaseReport';

describe('Test case for geting data of disease report from db', () => {
    Enzyme.configure({ adapter: new Adapter() })
    test('Checking the retrieved data', async() => {
        const axios = require('axios');
        const res = await axios.get("http://localhost:4000/api/diseaseReport");
        console.log(res.data);
        // expect(res.data).not.toEqual(false)
    });
})