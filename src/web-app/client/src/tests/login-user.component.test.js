import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import LoginUser from '../components/login-user.component';

describe('Test case for testing login',() =>{
window.URL.createObjectURL = function() {};
Enzyme.configure({ adapter: new Adapter() })
let wrapper;
test('username check',()=>
{
    wrapper = shallow(<LoginUser/>);
    wrapper.find('input[type="text"]').simulate('change', {target: {placeholder: 'username', value: 'sai'}});
    expect(wrapper.state('username')).toEqual('sai');
})
it('password check',()=>{
    wrapper = shallow(<LoginUser/>);
    wrapper.find('input[type="password"]').simulate('change', {target: {placeholder: 'password', value: 'sai'}});
    expect(wrapper.state('password')).toEqual('sai');
})
test('Checking a valid login for admin', async() => {
    const axios = require('axios');
    const res=await axios.post('http://localhost:4000/api/validate', {
        username: "sai",
        password: "sai",
        type: "admin"
    })
    // console.log(res);
    expect(res.data).not.toEqual(false)
});
test('Checking an invalid login for admin', async() => {
    const axios = require('axios');
    const res=await axios.post('http://localhost:4000/api/validate', {
        username: "sai",
        password: "sa",
        type: "admin"
    })
    // console.log(res);
    expect(res.data).toEqual(false)
});
test('Checking a valid login for monitor', async() => {
    const axios = require('axios');
    const res=await axios.post('http://localhost:4000/api/validate', {
        username: "sai",
        password: "new",
        type: "monitor"
    })
    // console.log(res);
    expect(res.data).not.toEqual(false)
});
test('Checking an invalid login for monitor', async() => {
    const axios = require('axios');
    const res=await axios.post('http://localhost:4000/api/validate', {
        username: "sai",
        password: "sa",
        type: "monitor"
    })
    // console.log(res);
    expect(res.data).toEqual(false)
});
})

