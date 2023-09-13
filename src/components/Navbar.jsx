import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';

function Menu() {
  return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container >
          <a class="navbar-brand" href='/'><Navbar.Brand>Database</Navbar.Brand></a>
          <Nav className="me-auto">
          <Link to = "DataItemList" className='nav-link'>Data List </Link>
          <Link to = "DataItemForm" className='nav-link'> Data Form</Link>
          </Nav>
        </Container>
      </Navbar> 
  )
}    

export default Menu;