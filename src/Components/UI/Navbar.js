import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavbarExample = () => {
    return (
        <div>
           <>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                        <Nav className="me-auto">
                            <Nav.Link href="#">Dashboard</Nav.Link>
                            <Nav.Link href="#login">Login</Nav.Link>
                            <Nav.Link href="#department">Departments</Nav.Link>
                            <Nav.Link href="#employee">Employee</Nav.Link>
                            <Nav.Link href="#leave">Leave</Nav.Link>
                            <Nav.Link href="#tickets">Tickets</Nav.Link>

                        </Nav>
                    </Container>
                </Navbar>
            </>
        </div>
    );
};

export default NavbarExample;