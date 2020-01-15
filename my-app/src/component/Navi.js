import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    NavbarText  
} from 'reactstrap';
import  {connect} from 'react-redux'
import { Link } from 'react-router-dom'

class Navi extends Component {
    state = {
        isOpen: false
    };
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };
    render() {
        let addItem=null;
        if(this.props.userEmail==="cool1234@gmail.com"){
            addItem=<NavItem>
            <Link to="/addItem" className="text-dark  p-3" >AddItem</Link>
            <Link to="/deleteItem" className="text-dark  p-3" >DeleteItem</Link>
            </NavItem>
            
           
        }
        return (
            <div>
                <Navbar style={{ backgroundColor: "#f2f2f2" }} light expand='sm' sticky="top" className='mb-5'>
                    <Container>
                        <NavbarBrand href='/'><strong>TeamBantai</strong></NavbarBrand>
                    <NavbarText className="text-dark p-3">{this.props.userEmail?this.props.userEmail:null}</NavbarText>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className='ml-auto' navbar>
                                <NavItem>
                                    <Link to="/" className="text-dark  p-3" >Home</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/cart" className=" text-dark p-3">Cart</Link>
                                </NavItem>
                                <NavItem>
                                {this.props.isAuth? 
                                <Link to="/logout" className=" text-dark p-3">Logout</Link>:<Link to="/auth" className=" text-dark p-3">Authenticate</Link>}
                                </NavItem>
                                {addItem}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    console.log(state   )
    return{
        isAuth:state.auth.Authenticated,
        userEmail:state.auth.userEmail
    }
}

export default connect(mapStateToProps)(Navi)