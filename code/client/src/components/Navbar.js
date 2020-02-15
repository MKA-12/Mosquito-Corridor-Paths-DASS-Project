import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Container
} from 'reactstrap';

class AppNavbar extends Component {
    logOut(e){
        e.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.history.push('/');
    }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isopen: false
    //     }
    //     this.toggle = this.toggle.bind(this);
    // }

    // toggle() {
    //     this.setState({
    //         isopen: !this.state.isopen
    //     });
    // }

//     render() {
//         return(
//             <div>
//             <Navbar color="dark">
//                 <Container>
//                     <NavbarBrand href="/">Home</NavbarBrand>
//                     <NavbarToggler onClick={this.toggle}/>
//                     <Collapse isOpen={this.state.isopen} navbar>
//                         <Nav className="ml-auto" navbar>
//                             <NavItem>
//                                 <NavLink>open</NavLink>
//                                 <h3>jkl</h3>
//                             </NavItem>
//                         </Nav>
//                     </Collapse>
//                 </Container>
//             </Navbar>
//         </div>
//         )
//     }
// }

// export default AppNavbar;

render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/VendorLogin" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    )

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            User
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    )
  }
}

export default withRouter(AppNavbar);