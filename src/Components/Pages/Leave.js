import React, { useEffect, useState } from 'react';
import loadingImg from '../../Assets/Images/loadingImg.gif';
import { toast } from 'react-toastify';
// import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Leave = () => {
    const isLoggedIn = localStorage.getItem('userinfo');
    const userInfo = JSON.parse(isLoggedIn);
    const id = userInfo.employeeId;
    const EmpRole = userInfo.role;
    const depId = userInfo.deptId;


    const ApiEndPoint ='https://freeapi.gerasim.in/api/Tickets/';
    
    const [isLoader, setIsLoader] = useState(false);
    const [showForm, setShowfrom] = useState(false);
    let [isFormSubmitted, setisFormSubmitted] = useState(false);

    let [leaveList, setLeaveList] = useState([]);
    let [leaveObj, setLeaveObj] = useState({
        "leaveId": 0,
        "employeeId": id,
        "fromDate": new Date(),
        "toDate": '',
        "noOfDays": 0,
        "leaveType": new Date(),
        "details": "",
        "approvedDate": new Date()
    })

    useEffect(() => {
        if (EmpRole === 'Employee') {
            getAllLeaveByEmpId();
        }
        else if (EmpRole === 'Department Head') {
            getAllLeaveForApproval();
        } else {
            getAllLeaveData();
        }

    }, [])

    const getAllLeaveByEmpId = async () => {
        setIsLoader(true);
        try {
            const response = await axios.get(ApiEndPoint + 'GetAllLeavesByEmployeeId?id=' + id);
            setLeaveList(response.data.data);
            setIsLoader(false);

        } catch (error) {
            toast.error(error.code);

        }
    }

    const getAllLeaveData = async () => {
        try {
            const response = await axios.get(ApiEndPoint + 'GetAllLeaves');
            setLeaveList(response.data.data);

        } catch (error) {
            toast.error(error.code);

        }
    }

    const addLeave = async () => {
        try {
            const response = await axios.post(ApiEndPoint + 'AddLeave', leaveObj);
            if (response.data.result) {
                toast.success("Leave Added Successfully");
                getAllLeaveByEmpId();
                resetFormData();
                setShowfrom(false);
            }
            else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error('Error At the Tme of creating Leave');

        }

    }

    const inputChange = (event, key) => {
        setLeaveObj((prevObj => ({ ...prevObj, [key]: event.target.value })))
    }

    const approveLeave = async (leaveId) => {
        setIsLoader(true);
        try {
            const response = await axios.get(ApiEndPoint + 'ApproveLeave?id=' + leaveId);
            if (response.data.result) {
                toast.success('leave Approved');
                setIsLoader(false);

            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.code);

        }
    }

    const rejectLeave = async (leaveId) => {
        try {
            const response = await axios.get(ApiEndPoint + 'RejectLeave?id=' + leaveId);
            if (response.data.result) {
                toast.success('Leave is Reject');
            }
            else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error(error.code);

        }
    }


    //fuction for fetch all leave approve by Deparment head
    const getAllLeaveForApproval = async () => {
        try {
            const response = await axios.get(ApiEndPoint + '/GetLeavesForApprovalBySuperwiserId?id=' + id);
            {
                setLeaveList(response.data.data);
                setIsLoader(false);
            }

        } catch (error) {

            toast.error(error.code);
        }
    }
    const resetFormData = () => {
        setLeaveObj({
            "leaveId": 0,
            "employeeId": 0,
            "fromDate": new Date(),
            "toDate": '',
            "noOfDays": 0,
            "leaveType": new Date(),
            "details": "",
            "approvedDate": new Date()

        })
    }



    const convertDate = (dateString) => {
        const parsedDate = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = parsedDate.toLocaleDateString('en-US', options);

        // Split the formatted date and rearrange the parts
        const [month, day, year] = formattedDate.split(' ');
        return `${day} ${month} ${year}`;
    };

    const closeForm = () => {
        setShowfrom(false);
    }


    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='row mb-2 mt-2'>
                        <div className='col-12 text-end'>
                            <button className='btn btn-sm btn-info text-white text-end mb-2' onClick={() => { setShowfrom(!showForm) }}>
                                Add Leave</button>

                        </div>
                    </div>
                    <div className={`${showForm ? 'col-8' : 'col-12'}`}>
                        <div className='card'>

                            <div className='card-header bg-primary text-white'>
                                Leave List
                            </div>
                            <div className='card-body' style={{overflow:'auto'}}>
                                {EmpRole === 'Employee' && (
                                    <div className='row'>
                                        <table className='table bordered'>
                                            <thead>
                                                <tr>
                                                    <th>Sr No.</th>
                                                    <th>To Date</th>
                                                    <th>Form Date</th>
                                                    <th>Number Of Days</th>
                                                    <th>Details</th>
                                                    <th>Leave Type</th>
                                                    <th>Request</th>
                                                </tr>
                                            </thead>
                                            {isLoader && <tbody><div>
                                                <img src={loadingImg} alt='loader'></img>
                                            </div>

                                            </tbody>}
                                            {!isLoader && <tbody>
                                                {leaveList.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{convertDate(item.toDate)}</td>
                                                            <td>{convertDate(item.fromDate)}</td>
                                                            <td>{item.noOfDays}</td>
                                                            <td>{item.details}</td>
                                                            <td>{item.leaveType}</td>
                                                            <td>
                                                                <strong>{item.isApproved ? 'Approve' : 'Pending'}</strong>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>}

                                        </table>


                                    </div>)}
                                {/* Department Head Role */}
                                {EmpRole === 'Department Head' && (
                                    <div className='row'>
                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>Sr No</th>
                                                    <th>Emp Name</th>
                                                    <th>From Date</th>
                                                    <th>To Date</th>
                                                    <th>No Of Days</th>
                                                    <th>Details</th>
                                                    <th>Request</th>
                                                    <th>Approve</th>
                                                    <th>Reject</th>
                                                </tr>
                                            </thead>
                                            {isLoader ? (
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={9} className='text-center'>
                                                            {/* Spinner elements */}
                                                            <div class="spinner-border text-muted"></div>
                                                            <div class="spinner-border text-primary"></div>
                                                            <div class="spinner-border text-success"></div>
                                                            <div class="spinner-border text-info"></div>
                                                            <div class="spinner-border text-warning"></div>
                                                            <div class="spinner-border text-danger"></div>
                                                            <div class="spinner-border text-secondary"></div>
                                                            <div class="spinner-border text-dark"></div>
                                                            <div class="spinner-border text-light"></div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ) : (
                                                <tbody>
                                                    {leaveList.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.employeeName}</td>
                                                            <td>{item.fromDate}</td>
                                                            <td>{item.toDate}</td>
                                                            <td>{item.noOfDays}</td>
                                                            <td>{item.details}</td>
                                                            <td>
                                                                <strong>{item.isApproved ? 'Approved' : 'Pending'}</strong>
                                                            </td>
                                                            <td>
                                                                <button className='btn btn-warning btn-sm' onClick={() => approveLeave(item.leaveId)}>
                                                                   {isLoader?'Approve':'Approved'}
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button className='btn btn-danger btn-sm' onClick={() => rejectLeave(item.leaveId)}>
                                                                    Reject
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                )}

                                {/* Super Admin Role */}
                                {EmpRole === 'Super Admin' && (
                                    <div className='row'>
                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>Sr No</th>
                                                    <th>Emp Name</th>
                                                    <th>From Date</th>
                                                    <th>To Date</th>
                                                    <th>Approved Date</th>
                                                    <th>No Of Days</th>
                                                    <th>Request</th>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            {isLoader ? (
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={9} className='text-center'>
                                                            {/* Spinner elements */}
                                                            <div class="spinner-border text-muted"></div>
                                                            <div class="spinner-border text-primary"></div>
                                                            <div class="spinner-border text-success"></div>
                                                            <div class="spinner-border text-info"></div>
                                                            <div class="spinner-border text-warning"></div>
                                                            <div class="spinner-border text-danger"></div>
                                                            <div class="spinner-border text-secondary"></div>
                                                            <div class="spinner-border text-dark"></div>
                                                            <div class="spinner-border text-light"></div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ) : (
                                                <tbody>
                                                    {leaveList.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.employeeName}</td>
                                                            <td>{item.fromDate}</td>
                                                            <td>{item.toDate}</td>
                                                            <td>{item.approvedDate}</td>
                                                            <td>{item.noOfDays}</td>
                                                            <td>
                                                                <strong>{item.isApproved ? 'Approved' : 'Pending'}</strong>
                                                            </td>
                                                            <td>{item.details}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {showForm && <div className='col-4'>
                        <div className='card'>
                            <div className='card-header bg-primary'>
                                <div className='row'>
                                    <div className='col-6 text-start'>
                                        <strong className='text-white'>New Leave</strong>
                                    </div>
                                    <div className='col-6 text-end'>
                                        <button className='btn p-0 btn-body' onClick={closeForm}>
                                            <i className='fa fa-times fa-lg text-white'></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='card-body'>
                                <div className='row mb-2'>
                                    <div className='col-6'>
                                        <label>From Date:</label>
                                        <input type='date' value={leaveObj.fromDate} placeholder='enter to date' className='form-control' onChange={(event) => { inputChange(event, 'fromDate') }} />
                                    </div>
                                    <div className='col-6'>
                                        <label>To Date:</label>
                                        <input type='date' value={leaveObj.toDate} placeholder='enter to date' className='form-control' onChange={(event) => { inputChange(event, 'toDate') }} />
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className='col-6'>
                                        <label>Number of days:</label>
                                        <input type='text' value={leaveList.noOfDays} placeholder='no of levave day' className='form-control' onChange={(event) => { inputChange(event, 'noOfDays') }} />

                                    </div>
                                    <div className='col-6'>
                                        <label>Leave Type:</label>
                                        <input type='text' value={leaveObj.leaveType} placeholder='type of levave' className='form-control' onChange={(event) => { inputChange(event, 'leaveType') }} />

                                    </div>
                                </div>
                                <div>
                                    <div className='row mb-2'>
                                        <div className='col-12'>
                                            <label>Details</label>
                                            <textarea className='form-control' value={leaveObj.details} onChange={(event) => { inputChange(event, 'details') }}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='row mb-2'>
                                        <div className='col-6'>
                                            <button className='btn btn-sm btn-success' onClick={addLeave}>Save</button>
                                        </div>
                                        <div className='col-6'>
                                            <button className='btn btn-sm btn-secondary' onClick={resetFormData}>Reset</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}

                </div>
            </div>

        </div>
    );
};

export default Leave;