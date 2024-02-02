import React, { useState, } from 'react';
import { getLogin } from "../Services/Api";
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [loginObj, setLoginObj] = useState({ emailId: '', password: '' });
    const [isFormSubmitted, setisFormSubmitted] = useState(false);

    const navigate = useNavigate();


    const login = () => {
        try {
            setisFormSubmitted(true);
            if (loginObj.emailId !== '' && loginObj.password !== '') {
                getLogin(loginObj).then((data) => {
                    if (data.data) {
                        // Store email and password in localStorage
                        localStorage.setItem("userinfo", JSON.stringify(data.data));
                        toast.success("Login Successfully");
                        navigate('dashboard');
                        resetFormData();
                    } else {
                        toast.error('Login failed');
                    }
                })
            }

        } catch (error) {
            alert(error.code)
        }

    }
    //check validation
    const isEmailValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(loginObj.emailId);
    };


    const changeFormValues = (event, key) => {
        setLoginObj(prevObj => ({ ...prevObj, [key]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    }

    const resetFormData = () => {
        setLoginObj({
            emailId: '',
            password: ''

        })
    }

    return (
        <div>
            <div className='container mt-3'>
                <div className='row justify-content-center mt-3'>
                    <div className='col-md-6 col-lg-6'>
                        <Card >
                            <div>
                                <div className='card-header bg-info text-center'>
                                    <strong className='text-black'>Login</strong>
                                </div>
                                <div className='card-body pt-0 shadow'>
                                    <form onSubmit={handleSubmit}>
                                        <div className='row justify-content-center'>
                                            <div className='row'>
                                                <label className='form-label text-center col-12'><strong>Email</strong></label>
                                                <div className='col-12 input-group'>
                                                    <span className='input-group-text'><i className='fa fa-envelope'></i></span>
                                                    <input type='text' className='form-control' placeholder='Enter Email' onChange={(event) => changeFormValues(event, 'emailId')} />
                                                </div>
                                                {isFormSubmitted && !isEmailValid() && (
                                                    <span className='text-danger col-12'>Enter a valid email address</span>
                                                )}

                                                <label className='form-label text-center col-12 mt-2'><strong>Password</strong></label>
                                                <div className='col-12 input-group mb-3'>
                                                    <span className='input-group-text'><i className='fa fa-lock'></i></span>
                                                    <input type='password' className='form-control' placeholder='Enter Password' onChange={(event) => changeFormValues(event, 'password')} />
                                                </div>
                                                {isFormSubmitted && loginObj.password === '' && <span className='text-danger col-12'>Password is Required</span>}
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 text-center'>
                                                <Button variant="outline-info text-black" onClick={login}><b>Login</b></Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>


        </div >
    );
};

export default Login;
