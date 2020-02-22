import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Listing from './components/Listing'
import AppNavbar from './components/Navbar'
import './App.css';
import VendorRegister from './components/VendorRegister';
import VendorLogin from './components/VendorLogin';
import CustomerLogin from './components/CustomerLogin';
// import {test} from './components/VendorLogin';
import CustomerRegister from './components/customerRegister';
import { BrowserRouter as Router,Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
// import Profile from "./components/profile";

// import {Provider} from 'react-redux';
// import store from './store';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      vendorloggedin:false
    }
  }
  render(){
    // console.log(`test is: ${ test }`);

  return (
  <Router>
    <div className="App">
      <AppNavbar/>
      <Link to="/CustomerRegister">CustomerRegister</Link>
      <Link to="/VendorRegister">VendorRegister</Link>
      <Link to="/VendorLogin">VendorLogin</Link>
      <Link to="/CustomerLogin">CustomerLogin</Link>
      <Link to="/Items_actions">Listing</Link>
      <Route path="/CustomerRegister" exact render={()=>{return (<CustomerRegister/>)}}/>
      <Route path="/VendorRegister" exact render={()=>{return (<VendorRegister/>)}}/>
      <Route path="/VendorLogin" exact render={()=>{return (<VendorLogin/>)}}/>
      <Route path="/CustomerLogin" exact render={()=>{return (<CustomerLogin/>)}}/>
      <Route path="/Items_actions" exact render={()=>{return (<Listing/>)}}/>
      {/* <Route path="/profile" render={()=>{return (<Profile/>)}}/> */}
    </div>
  </Router>
  );}
}

export default App;
