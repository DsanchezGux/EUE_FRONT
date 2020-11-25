import React, { Component, Fragment } from "react";
import { Dispatch } from 'redux';
//import classes from './NavBar.module.scss';
import { Button, Navbar, Form, NavDropdown, FormControl, Nav } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import logo from '../../../assets/img/logo-snrsj.jpg'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Badge from 'react-bootstrap/Badge'
import "./EUENavBar.scss";
export class EUENavBar extends Component {

  constructor(props:any) {
    super(props);
  }

  render() {
	let usuario;
	let ruta = window.location.href;
	var n = ruta.lastIndexOf('/');
	var result = ruta.substring(n + 1);
	if(!result.startsWith("pi")) {
	  usuario = <a>Encargado(a) de Ingreso</a> 
	} else {
	  usuario = <a>Gestor(a) de Caso</a> 
	}
    return ( 
      <Fragment>
		  <Navbar className="nav">
			  <Navbar.Brand href="#"><img id="logo"  src={logo}></img></Navbar.Brand>
			  <Navbar.Toggle />
			  <Nav className="ml-auto enlaces">
				  <Nav.Link className="justify-content-end" href="#"><b>Inicio</b></Nav.Link>
			  	  <Nav.Link className="justify-content-end" href="#"><b>Formularios</b></Nav.Link>
			      <Nav.Link className="justify-content-end" href="#"><b>Contacto</b></Nav.Link>
			  </Nav>
			  <Nav>
			    <Navbar.Collapse className="justify-content-end">
				    <Image className="profilepic" src={logo} roundedCircle />
				    <Navbar.Text >
				       <a href="#">Juana Espinoza</a><br/>
				       {usuario}				       
				       
				    </Navbar.Text>
				    <FontAwesomeIcon  icon={faBell} className="notification" />
				   	<Badge pill variant="danger">
					    5
				    </Badge>{' '}
			    </Navbar.Collapse>
			  </Nav>

		 </Navbar>
      </Fragment>
    ) 
  }
}

export default EUENavBar
