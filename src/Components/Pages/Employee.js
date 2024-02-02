import React, { useEffect, useState } from 'react';
import loadingImg from '../../Assets/Images/loadingImg.gif';
import { BsPencil, BsTrash } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTableCells } from "react-icons/fa6";
import { FaTimes } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { getAllEmployeeData, getAllRoleData } from '../Services/Api';

const Employee = () => {
    const ApiEndPoint = 'https://freeapi.gerasim.in/api/Tickets/';

    let [loading, setLoading] = useState(false);
    let [showForm, setShowfrom] = useState(false);
    let [showTable, setShowTable] = useState(false);

    let [deparmentList, setDeparmentList] = useState([]);
    const [gender, setGender] = useState('');

    let [getRoleList, setRole] = useState([]);
    let [employeeList, setEmployeeList] = useState([]);
    let [employeeObj, setEmployeeObj] = useState({

        "employeeId": 0,
        "employeeName": "",
        "contactNo": "",
        "emailId": "",
        "deptId": 0,
        "password": "",
        "reportsTo": 0,
        "gender": ""
    })
    useEffect(() => {

        getdeparmentDetail();
        getAllRole();
    }, [])

    const getAllEmployee = async () => {
        try {
            getAllEmployeeData().then((data) => {
                setLoading(true);
                setEmployeeList(data.data);
                setLoading(false);

            })

        } catch (error) {

            toast.error("Error in finding all deparment");
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    }

    const getAllRole = async () => {
        // const result = await axios.get(ApiEndPoint + 'GetAllRoles');
        getAllRoleData().then((data) => {
            setRole(data.data)

        })


    }

    const getdeparmentDetail = async () => {
        try {
            setLoading(true);
            const response = await axios.get(ApiEndPoint + 'GetDepartments');
            setLoading(false);
            setDeparmentList(response.data.data);
        } catch (error) {

            toast.error("Error in finding all deparment");
            setLoading(false);
        }
    }

    const addEmployee = async () => {
        if (employeeObj.employeeName !== '' && employeeObj.contactNo !== '' && employeeObj.emailId !== '' && employeeObj.password !== '' &&
            employeeObj.deptId !== '' && employeeObj.gender !== '') {
            setLoading(true);
            try {

                const response = await axios.post(ApiEndPoint + 'CreateEmployee', employeeObj);

                if (response.data.result) {
                    toast.success("Employee created successfully");
                    setLoading(false);
                    getAllEmployee();
                    setShowfrom(false);
                    resetFormData();

                }
                else {
                    toast.error(response.data.message);
                    setLoading(false);
                    setShowfrom(false);
                }

            } catch (error) {
                toast.error(error.code);
                setLoading(false);

            }
        }
        else {
            toast.warning('enter all detail')
            setShowfrom(false);

        }

    }

    const editEmployeeData = async (id) => {
        setShowfrom(true);
        try {
            const result = await axios.get(ApiEndPoint + 'GetEmployeeById?id=' + id);
            if (result.data.result) {
                setEmployeeObj(result.data.data);

            } else {
                toast.error(result.data.message);
            }
        } catch (error) {
            toast.error('Error fetching Employee  for edit:', error);
        }

    }

    const updateEmployee = async () => {
        setLoading(true);
        try {
            const response = await axios.put(ApiEndPoint + 'UpdateEmployee', employeeObj);
            if (response.data.result) {
                toast.success("Employee Updated Successfully");
                setLoading(false);
                getAllEmployee();
                setShowfrom(false);
                resetFormData();

            }
            else {
                toast.error(response.data.message);
                setLoading(false);
                resetFormData();
                setShowfrom(false);
            }
        } catch (error) {
            toast.error(error.code);
            setLoading(false);
            setShowfrom(false);

        }
    }



    const deleteEmployee = async (id) => {
        const isDelete = window.confirm("Are you want delete record");
        if (isDelete) {
            try {
                setLoading(true);
                const response = await axios.delete(ApiEndPoint + 'DeleteEmployee?id=' + id);
                setLoading(false);
                if (response.data.result) {
                    toast.success("Employee Deleted Successfully");
                    getAllEmployee();

                    resetFormData();
                }
                else {
                    toast.error(response.data.message);
                    setLoading(false);
                }

            } catch (error) {
                toast.error(error.code);
                setLoading(false);

            }
        }

    }

    const inputHandler = (event, key) => {
        setEmployeeObj(prevObj => ({ ...prevObj, [key]: event.target.value }));
    }

    const resetFormData = () => {
        setEmployeeObj({
            "employeeId": 0,
            "employeeName": "",
            "emailId": "",
            "deptId": 0,
            "password": "",
            "gender": "",
            "role": ""

        })
    }

    const closeform = () => {
        setShowfrom(false);
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    return (
        <div className='container-fluid'>
            
                <div className='row mt-2'>
                    <div className='row mb-2'>
                        <div className="col-12 mb-2 text-end">
                            <button className='btn btn-info mb-2 text-white' onClick={() => { setShowfrom(!showForm) }}>
                                Add Employee</button>

                        </div>
                    </div>

                    <div className={`${showForm ? 'col-8' : 'col-12'}`}>
                        <div className='card'>
                            <div className='card-header d-flex bg-primary justify-content-between align-items-center'>
                                <div className='text-white text-start'>
                                    Employee List
                                </div>
                                <div>
                                    <button className='btn btn-link text-end text-white' onClick={() => { getAllEmployee(setShowTable(!showTable)) }}><FaTableCells size={15} /></button>
                                </div>
                            </div>
                            {loading && (<div className='text-center'>
                                <img src={loadingImg} alt='loader' style={{ display: loading ? 'block' : 'none', margin: 'auto' }} />
                            </div>)}
                            {showTable && !loading && (<div className='card-body' style={{overflow:'auto'}}>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Employee Name</th>
                                            <th>Email ID </th>
                                            <th>Contact no</th>
                                            <th>Dept Name</th>
                                            <th>Edit</th>
                                            <th>Delete</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            employeeList.map((item, index) => {
                                                return (<tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.employeeName}</td>
                                                    <td>{item.emailId}</td>
                                                    <td>{item.contactNo}</td>
                                                    <td>{item.deptName}</td>
                                                    <td><button className='btn btn-sm btn-primary me-2' onClick={() => { editEmployeeData(item.employeeId) }}><BsPencil /></button></td>
                                                    <td> <button className='btn btn-sm btn-danger' onClick={() => { deleteEmployee(item.employeeId) }}><BsTrash /></button></td>
                                                </tr>)
                                            })
                                        }

                                    </tbody>
                                </table>

                            </div>)}
                            {!showTable && !loading && (
                                <div className='card-body'>
                                    <div className='row'>
                                        {employeeList.map((item, index) => {
                                            return (
                                                <div className='col-md-4'>
                                                    <div className='card mb-3'>
                                                        <div className='card-header'>
                                                            <strong>Employee Information</strong>
                                                        </div>
                                                        <div className='card-body'>
                                                            <h5 className='card-title'>{item.employeeName}</h5>
                                                            <p className='card-text'>
                                                                <strong>Email Id:</strong> {item.emailId}
                                                                <p> ContactNo:{item.contactNo}</p>
                                                                <p>Departmen Name:{item.deptName}</p>
                                                            </p>
                                                            <div className='d-flex justify-content-end'>
                                                                <button className='btn btn-sm btn-primary me-2' onClick={() => { editEmployeeData(item.employeeId) }} >
                                                                    <BsPencil className='mb-1' />
                                                                </button>
                                                                <button className='btn btn-sm btn-danger' onClick={() => { deleteEmployee(item.employeeId) }}>
                                                                    <BsTrash className='mb-1' />
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>

                                            )
                                        })}

                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                    <div className='col-4'>
                        {showForm && (<div className='card'>
                            <div className='card-header bg-primary text-white d-flex align-items-center justify-content-between'>
                                EmployeeName Information
                                <button className='btn btn-body text-white' onClick={closeform}><FaTimes /></button>
                            </div>
                            <div className='card-body custom-BG'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>EmployeeName</label>
                                        <input type='text' value={employeeObj.employeeName} onChange={(event) => { inputHandler(event, 'employeeName') }} className='form-control' />

                                    </div>
                                    <div className='col-6'>
                                        <label>ContactNo</label>
                                        <input type='text' maxLength={10} value={employeeObj.contactNo} onChange={(event) => { inputHandler(event, 'contactNo') }} className='form-control' />

                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>EmailId</label>
                                        <input type='email' value={employeeObj.emailId} onChange={(event) => { inputHandler(event, 'emailId') }} className='form-control' />
                                    </div>

                                    <div className='col-6'>
                                        <label>Password</label>
                                        <input type='password' value={employeeObj.password} onChange={(event) => { inputHandler(event, 'password') }} className='form-control' />

                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Select Department</label>
                                        <select className='form-select' value={employeeObj.deptId} onChange={(event) => { inputHandler(event, 'deptId') }}>
                                            <option value=''>Select Dept</option>
                                            {
                                                deparmentList.map((item, index) => {
                                                    return (<option key={index} value={item.deptId}>{item.deptName}</option>)
                                                })
                                            }
                                        </select>

                                    </div>
                                    <div className='col-6'>
                                        <label>Gender</label>
                                        <div style={{ marginBottom: '8px' }}>
                                            <label style={{ marginRight: '10px' }}>
                                                <input
                                                    type='radio'
                                                    value='male'
                                                    checked={employeeObj.gender === 'male'}
                                                    onChange={(event) => { inputHandler(event, 'gender') }}
                                                />
                                                Male
                                            </label>
                                            <label>
                                                <input
                                                    type='radio'
                                                    value='female'
                                                    checked={employeeObj.gender === 'female'}
                                                    onChange={(event) => { inputHandler(event, 'gender') }}
                                                />
                                                Female
                                            </label>
                                        </div>
                                        {/* <div className='text-danger' >
                                            {isFormSubmitted && !employeeobj.gender && <span>Gender is required.</span>}
                                        </div> */}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Role</label>
                                        <select value={employeeObj.role} onChange={(event) => { inputHandler(event, 'role') }} className='form-control'>
                                            <option value=''>Select Role</option>
                                            {
                                                getRoleList.map((item, index) =>
                                                (
                                                    <option key={index} value={item}>
                                                        {item}
                                                    </option>
                                                ))
                                            }


                                        </select>
                                    </div>
                                </div>

                                <br></br>
                                <div className='row d-flex justify-content-between align-items-center'>
                                    <div className='col-6 text-start'>
                                        {employeeObj.employeeId === 0 && (
                                            <button className='btn btn-sm btn-success' onClick={addEmployee} disabled={employeeObj.employeeName === '' || employeeObj.contactNo === '' || employeeObj.emailId === '' || employeeObj.password === '' ||
                                                employeeObj.deptId === '' || employeeObj.gender === ''}>
                                                {loading ? 'Saving' : 'Save'}
                                            </button>
                                        )}
                                        {employeeObj.employeeId !== 0 && (
                                            <button className='btn btn-sm btn-warning' onClick={updateEmployee} >
                                                {loading ? 'Updating...' : 'Update'}
                                            </button>
                                        )}
                                    </div>
                                    <div className='col-6 text-end'>


                                        <button className='btn btn-sm btn-secondary' onClick={resetFormData}>
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>



                </div>

            </div >
        
    );
};

export default Employee;