import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import logo from '../images/pokedex/pokemonLogo.svg'
import { Whatsapp, Github, Linkedin, FileEarmarkPerson } from "react-bootstrap-icons";

const NavBar = () => (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand>
          <img
            alt=""
            src={logo}
            width="100"
            height="50"
            className="d-inline-block align-center"            
          />{' Pokedex '}
        </Navbar.Brand>
        <span className="navbar-text">
              <div className="social-icon">
                <a href={process.env.REACT_APP_LINKEDIN} target="_blank" rel="noopener noreferrer"><Linkedin size={24} /></a>
                <a href={process.env.REACT_APP_GITHUB} target="_blank" rel="noopener noreferrer"><Github size={24} /></a>
                <a href={process.env.REACT_APP_WHATSAPP} target="_blank" rel="noopener noreferrer"><Whatsapp size={24} /></a>
                <a href={process.env.REACT_APP_CV_LINK} target="_blank" rel="noopener noreferrer"><FileEarmarkPerson size={24} /></a>
              </div>
        </span>
        
      </Container>
      
    </Navbar>
);
export default NavBar;
