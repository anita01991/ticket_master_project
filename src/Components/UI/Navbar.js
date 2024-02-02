import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {

    const navigate = useNavigate(); // Get the navigate function from react-router
    const isLoggedIn = localStorage.getItem('userinfo');

    const userInfo = JSON.parse(isLoggedIn);

    useEffect(() => {
        const userInfo = localStorage.getItem('userinfo');
        if (userInfo !== null) {

        }
    }, []);

    const logout = () => {
        // localStorage.removeItem('loginObj');
        localStorage.clear();
        alert("Logged out successfully");
        navigate(''); // Redirect to /login on logout
    }

    return (
        <div>
            {isLoggedIn ? (<div className="container-fluid p-0 ">
                <div className="row">
                    <div className="col-12">
                        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                            <div className="container-fluid">
                                {userInfo && (userInfo.role === "Employee" || userInfo.role === "Admin Department Employee" || userInfo.role === "Department Head") && (
                                    <ul className="navbar-nav">
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="dashboard">Dashboard</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="tickets">Ticket</Link>
                                            </li>
                                            
                                            <li className="nav-item">
                                                <Link className="nav-link" to="leave">Leave</Link>
                                            </li>
                                        </>
                                    </ul>
                                )}

                                {userInfo && (userInfo.role === "Super Admin") && (
                                    <ul className="navbar-nav">
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="department">Department</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="leave">Leave</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="employee">Employee</Link>
                                            </li>
                                            <li>
                                                <Link className="nav-link" to="tickets">Ticket</Link>
                                            </li>
                                           
                                            
                                        </>
                                    </ul>
                                )}
                                <div className="d-flex align-items-center">
                                    <span className="me-2" style={{color:'pink'}}>As:{userInfo.role}</span>
                                    <span className="me-2 text-white">{userInfo.emailId}</span>
                                    <button className="btn btn-body" onClick={() => logout()}> <FontAwesomeIcon icon={faArrowRightToBracket} style={{ color: 'white', fontSize: '25px' }} />
                                    </button>

                                </div>

                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            ) : null}
        </div>
    );
};

export default Navbar;