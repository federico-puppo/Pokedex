import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import pokeballIcon from '../images/pokedex/pokeballLogo.svg'

const Footer = () => (
  <>
    <Navbar bg="dark" variant="dark" fixed="bottom">
      <Container>
        <Navbar.Brand>
          <img
            alt=""
            src={pokeballIcon}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Creado por <a href="https://www.linkedin.com/in/federico-puppo/">Federico Puppo</a>
        </Navbar.Brand>
      </Container>
    </Navbar>
  </>
);
export default Footer;
