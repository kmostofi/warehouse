import react, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export class Navigation extends Component{

    render(){
        return (
            <Navbar className="Nav ">
                

<Navbar.Collapse id='basic-navbar-nav'>
    <Nav>
        <NavLink className="d-inline p-2 bg-dark text-white " to="/">Home</NavLink>
        <NavLink className="d-inline p-2 bg-dark text-white " to="/Vehicles">Vehicles</NavLink>
    </Nav>
</Navbar.Collapse>

           </Navbar>
        )
    }
}



