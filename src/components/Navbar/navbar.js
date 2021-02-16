import react from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import {connect} from 'react-redux'
import { logout } from '../../store/actions/auth';

const NavBar = ({isAuthenticated, logout }) => {
    return(
        <div>
            <Navbar bg="primary" variant="dark" style={{minHeight:'4em',fontSize:'large'}}>
                <Navbar.Brand href="/"><b>TheFamilyApp</b></Navbar.Brand>
                <Nav className="ml-auto">
                <Nav.Link active href="/bills"><b>Bills</b></Nav.Link>
                <Nav.Link active href="/events"><b>Events</b></Nav.Link>
                <Nav.Link active href="/groceries"><b>Groceries</b></Nav.Link>
                <Nav.Link active href="/todos"><b>ToDos</b></Nav.Link>
                <Nav.Link active href="/location"><b>Location</b></Nav.Link>
                {isAuthenticated?
                 <Nav.Link active onClick={() => logout()}><b>Logout</b></Nav.Link> :
                <Nav.Link active href="/login"><b>Login</b></Nav.Link> }
                </Nav>
            </Navbar>
        </div>
    )
}

  
const mapStateToProps = (state) => {
    console.log(state)
    return{
        isAuthenticated: state.auth.token!=null
    }
}

export default connect(mapStateToProps,{logout})(NavBar);
