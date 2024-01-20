import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignInAlt, faUserPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <a className="navbar-brand" href="/">Tickets Master</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link " to="/" >Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="employee">Employee</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link " to="department" >Department</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " to="leave" >Leave</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link " to="tickets" > Tickets</Link>
                        </li>
                    </ul>
                    <div className="d-flex form-group">
                        <button className=" btn btn-outline-success me-2" type="button"><Link to={'\login'}>Login</Link></button >
                    </div>

                </div>
            </nav>
        </div>
    );
};

export default Navbar;