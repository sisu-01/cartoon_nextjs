"use client";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Links from "./links/links";

const Header = () => {
  const expand = "sm";
  return (
    <header>
      <>
        <Navbar
          expand={expand}
          fixed={"top"}
          className="bg-body-tertiary mb-3"
        >
          <Container fluid={"sm"}>
            <Navbar className="bg-body-tertiary">
              <Container>
                <Navbar.Brand href="/">
                  <img
                    alt=""
                    src="/favicon.ico"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />{' '}
                  이름미정
                </Navbar.Brand>
              </Container>
            </Navbar>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="bottom"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menus
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Links />
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </>
    </header>
  );
}

export default Header;