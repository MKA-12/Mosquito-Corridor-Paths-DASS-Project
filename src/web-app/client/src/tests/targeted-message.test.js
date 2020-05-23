import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import AddMessage from '../components/targeted-message';
function makeMsg(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
describe('Test case for testing to enter a Message', () => {
    Enzyme.configure({ adapter: new Adapter() })
    let wrapper;
    test('URL enter', () => {
        wrapper = shallow( < AddMessage/> );
        wrapper.find('textarea').simulate('change', { target: {value: 'Testing Message' } });
        expect(wrapper.state('Message')).toEqual('Testing Message');
    })
    test('Checking the entry of message to db', async() => {
        var msg=makeMsg(10);
        const axios = require('axios');
        const res=await axios.post('http://localhost:4000/api/TargetedMessage', {
            message: msg
        })
        // console.log(res);
        expect(res.data).toEqual(true);
        expect(res.status).toEqual(200);
    });
})