import React, { Component } from 'react'
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
    NavbarText
  } from 'reactstrap';
export default class Header extends Component {
    
    constructor(props){
        super(props);
        this.state={ isOpen: false};

    }

     setIsOpen=()=>{
     this.setState({isOpen: !this.state.isOpen})
 }
 toggle=()=>{
     this.setIsOpen();
 } 
    render() {
        return (
            <div>
                <Navbar color="light" fixed="top"  light expand="md">
        <NavbarBrand href="/">DYDQuizMaker</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          {/* <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav> */}
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
            </div>
        )
    }
}
