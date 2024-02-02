import React, { useEffect, useState } from 'react';
import loadingImg from '../../Assets/Images/loadingImg.gif';
import { BsPencil, BsTrash } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTableCells } from "react-icons/fa6";
import { FaTimes } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const Departments = () => {
    const ApiEndPoint = 'https://freeapi.gerasim.in/api/Tickets/';

    let [loading, setLoading] = useState(false);
    let [showForm, setShowfrom] = useState(false);
    let [showTable, setShowTable] = useState(false);

    let [getEmployeeList, setEmployeeList] = useState([]);
    let [departmentList, setDeparmentList] = useState([]);
    let [departmentObj, setDeparmentObj] = useState({
        "deptId": 0,
        "deptName": "",
        "deptHeadEmpId": 0,
        "createdDate": new Date()
    })

    useEffect(() => {
        getEmployeeDetail();
        // getAllDeparment();

    }, [])

    const getEmployeeDetail = async () => {
        try {
            const result = await axios.get(ApiEndPoint + "GetEmployees");
            setEmployeeList(result.data.data);

        } catch (error) {
            alert(error.code);

        }

    }

    const getAllDeparment = async () => {
        try {
            const response = await axios.get(ApiEndPoint + 'GetDepartments');
            setLoading(false);
            setDeparmentList(response.data.data);
        } catch (error) {

            toast.error("Error in finding all deparment");
            setLoading(false);
        }
    }

    const addDepartment = async () => {
        setLoading(true);
        try {

            const response = await axios.post(ApiEndPoint + 'CreateDepartment', departmentObj);

            if (response.data.result) {
                toast.success("Deparment created successfully");
                setLoading(false);
                getAllDeparment();
                setShowfrom(false);
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

    const editDeparmentData = async (item) => {
        setShowfrom(true);
        setDeparmentObj({
            deptId: item.deptId,
            deptName: item.deptName,
            deptHeadEmpId: item.deptHeadEmpId,
            createdDate: item.createdDate,

        })

    }

    const updateDeaprmentData = async () => {
        setLoading(true);
        try {
            const response = await axios.put(ApiEndPoint + 'UpdateDepartment', departmentObj);
            if (response.data.result) {
                toast.success("Deparement Updated Successfully");
                setLoading(false);
                getAllDeparment();
                setShowfrom(false);
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

    const deleteDeparment = async (id) => {
        const isDelete = window.confirm("Are you want delete record");
        if (isDelete) {
            try {
                setLoading(true);
                const response = await axios.delete(ApiEndPoint + 'DeleteDepartment?id=' + id);
                if (response.data.result) {
                    toast.success("Deparment Deleted Successfully");
                    getAllDeparment();
                    setLoading(false);
                    resetFormData();
                }

            } catch (error) {
                toast.error(error.code);
                setLoading(false);

            }
        }
    }

    const inputHandler = (event, key) => {
        setDeparmentObj(prevObj => ({ ...prevObj, [key]: event.target.value }));
    }

    const resetFormData = () => {
        setDeparmentObj({
            "deptId": 0,
            "deptName": "",
            "deptHeadEmpId": 0,
            "createdDate": new Date()
        })

    }

    const closeform = () => {
        setShowfrom(false);
    }

    return (
        <div className='container-fluid'>
            <div className='row m-4'>
                <div className='row'>
                    <div className='col-12 text-end'>
                        <button className='btn btn-sm btn-info text-white text-end mb-2' onClick={() => { setShowfrom(!showForm) }}>
                            Add Department</button>
                    </div>
                </div>
                <div className={`${showForm ? 'col-8' : 'col-12'}`}>
                    <div className='card'>
                        <div className='card-header d-flex bg-primary justify-content-between align-items-center'>
                            <div className='text-white text-start'>
                                Department List
                            </div>
                            <div>
                                <button className='btn btn-link text-end text-white' onClick={() => { getAllDeparment(setShowTable(!showTable)) }}><FaTableCells size={15} /></button>
                            </div>

                        </div>
                        {loading && (
                            <div className='text-center'>
                                <img src={loadingImg} alt='loader' style={{ display: loading ? 'block' : 'none', margin: 'auto' }}></img>
                            </div>
                        )}
                        {
                            showTable && !loading && (
                                <div className='card-body'>
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>Sr No.</th>
                                                <th>Department Name</th>
                                                <th>DepartmentHeadID </th>
                                                <th>Edit</th>
                                                <th>Delete</th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                departmentList.map((item, index) => {
                                                    return (<tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.deptName}</td>
                                                        <td>{item.deptName}</td>
                                                        <td><button className='btn btn-sm btn-primary me-2' onClick={() => { editDeparmentData(item) }}><BsPencil /></button></td>
                                                        <td> <button className='btn btn-sm btn-danger' onClick={() => { deleteDeparment(item.deptId) }}><BsTrash /></button></td>
                                                    </tr>)
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>)


                        }
                        {!showTable && !loading && (
                            <div className='card-body'>
                                <div className='row'>
                                    {departmentList.map((item, index) => {
                                        return (
                                            <div className='col-md-4'>
                                                <div className='card mb-3'>
                                                    <div className='card-header'>
                                                        <strong>Department Information</strong>
                                                    </div>
                                                    <div className='card-body'>
                                                        <h5 className='card-title'>{item.deptName}</h5>
                                                        <p className='card-text'>
                                                            <strong>Department Head:</strong> {item.deptHeadName}
                                                        </p>
                                                        <div className='d-flex justify-content-end'>
                                                            <button className='btn btn-sm btn-primary me-2' onClick={() => { editDeparmentData(item) }} >
                                                                <BsPencil className='mb-1' />
                                                            </button>
                                                            <button className='btn btn-sm btn-danger' onClick={() => { deleteDeparment(item.deptId) }}>
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
                {showForm &&
                    (<div className='col-4'>
                        <div className='card'>
                            <div className='card-header bg-primary text-white d-flex align-items-center justify-content-between'>
                                Department Information
                                <button className='btn btn-body text-white' onClick={closeform}><FaTimes /></button>
                            </div>
                            <div className='card-body custom-BG'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Department Name</label>
                                        <input type='text' className='form-control' value={departmentObj.deptName} onChange={(event) => { inputHandler(event, 'deptName') }} />
                                    </div>
                                    <div className=' col-6'>
                                        <label>Department Head Id</label>
                                        <select className='form-control' value={departmentObj.deptHeadEmpId} onChange={(event) => { inputHandler(event, 'deptHeadEmpId') }}>
                                            <option value=''>Select Head</option>
                                            {
                                                getEmployeeList.map((item, index) => {
                                                    return (<option key={index} value={item.employeeId}>{item.employeeName}</option>)
                                                })
                                            }
                                        </select>

                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6  text-start'>
                                            {departmentObj.deptId === 0 && <button className='btn btn-success' disabled={departmentObj.deptName === '' || departmentObj.deptHeadEmpId === ''} onClick={addDepartment}> {loading ? 'Saving' : 'Save'}</button>}
                                            {departmentObj.deptId !== 0 && <button className='btn btn-warning' onClick={updateDeaprmentData}> {loading ? 'Updating...' : 'Update'}</button>}
                                        </div>
                                        <div className='col-6 text-end'>
                                            <button className='btn btn-secondary'>Reset</button>
                                        </div>

                                    </div>

                                </div>


                            </div>

                        </div>

                    </div>)}
            </div>
        </div>
    );
};
export default Departments;