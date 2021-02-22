import React, { Component } from 'react'
import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    // Nav,
    // NavItem,
    // NavLink,
    // UncontrolledDropdown,
    // DropdownToggle,
    // DropdownMenu,
    // DropdownItem,
    // NavbarText
  } from 'reactstrap';
import Countdown from "react-countdown";
class Header extends Component {
    
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
      const Completionist = () => <span>You are good to go!</span>;
      const remainingTime = Date.now() + this.props.time * 60 * 1000
      let rem = <div></div>
      if(this.props.com === "Test"){
        rem = <div style={{float:"right", paddingRight:"40px"}}>
        <Countdown date={parseInt(remainingTime)} onComplete={this.onCompleteC}   >
        {/* <Countdown date={Date.now() + 5000} onComplete={()=>{this.props.onCompleteC()}}   > */}
      <Completionist />
      </Countdown>
        </div>
      }
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
        {rem}
      </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    time: state.question.time
  }}

  export default withRouter(connect(mapStateToProps)(Header))