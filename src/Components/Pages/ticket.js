import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaTableCells } from "react-icons/fa6";
import { FaTimes } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencil, BsTrash } from 'react-icons/bs';
import axios from 'axios';
import { FaPhone } from "react-icons/fa";

const Tickets = () => {
    const isLoggedIn = localStorage.getItem('userinfo');
    const userInfo = JSON.parse(isLoggedIn);
    const id = userInfo.employeeId;
    const EmpRole = userInfo.role;
    const ApiEndPoint = 'https://freeapi.miniprojectideas.com/api/Tickets/';

    let [deparmentList, setDeparmentList] = useState([]);
    let [loading, setLoading] = useState(false);
    let [loginEmpid, setLoginEmpId] = useState(0);

    let [showForm, setShowfrom] = useState(false);

    let [ticketList, setTicketList] = useState([]);
    let [empListBydeptid, setEmpListByDeptId] = useState([]);


    let [ticketObj, setTicketObj] = useState({
        "employeeId": id,
        "severity": "",
        "deptId": 0,
        "state": "",
        "requestDetails": ""
    })
   





    useEffect(() => {
        getAllDeparment();

        // const isLoggedIn = localStorage.getItem('userinfo');
        // const userInfo = JSON.parse(isLoggedIn);
        // const id = userInfo.employeeId;
        // const EmpRole = userInfo.role;
        // setLoginEmpId(userInfo);


        if (EmpRole === 'Employee') {
            getTicketCreatedByEmp(userInfo.employeeId);
        }

        else if (EmpRole === 'Department Head') {
            getNewTicketsdeptheadId(id);
            getEmployeesByDeptid(userInfo.deptId);

        } else if (EmpRole === ' Admin Department Employee') {
            getAssignedTickets(userInfo.employeeId);

        }
        else {
            getAllticket();
        }


    }, [])



    const getTicketCreatedByEmp = async (id) => {

        try {
            const response = await axios.get(ApiEndPoint + 'GetTicketsCreatedByEmpId?empId=' + id);
            if (response.data.result) {
                setTicketList(response.data.data);

            }

        } catch (error) {
            toast.error(error.code);

        }
    }

    const getNewTicketsdeptheadId = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(ApiEndPoint + 'getNewTickets?deptHeadEmpId=' + id);
            if (response.data.result) {
                setTicketList(response.data.data);
                setLoading(false);

            }

        } catch (error) {
            toast.error(error.code);

        }

    }

    const getEmployeesByDeptid = async (id) => {
        try {

            const response = await axios.get(ApiEndPoint + "GetEmployeesByDeptId?id=" + id);
            setEmpListByDeptId(response.data.data);

        } catch (error) {
            toast.error(error.code);

        }
    }

    const getAssignedTickets = async (id) => {
        try {
            const response = await axios.post(ApiEndPoint + 'AssignRequest' + id);
            setTicketList(response.data.data);

        }
        catch (error) {
            toast.error(error.code);

        }

    }

    const getAllticket = async () => {
        setLoading(true);
        try {
            const response = await axios.get(ApiEndPoint + 'GetAllTickets');

            setTicketList(response.data.data);
            setLoading();
            // console.log(response.data.data)
        } catch (error) {

            toast.error("Error in finding all deparment");
            setLoading(false);
        }
        finally {
            setLoading(false);
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

    const addTicket = async () => {
        if (ticketObj.employeeId !== '' && ticketObj.deptId !== '' && ticketObj.requestDetails !== '' && ticketObj.severity !== '') {
            setLoading(true)
            try {
                const response = await axios.post(ApiEndPoint + 'CreateNewTicket', ticketObj);
                setLoading(false);
                if (response.data.result) {
                    toast.success("Ticket created successfully");
                    getAllticket();
                    resetForm();
                }

            } catch (error) {


                setLoading(false);
            }
        }
        else {
            toast.warning("Enter all Detail");
        }

    }

    const deleteTicket = async (id) => {
        const isDelete = window.confirm("Are you want delete record");
        if (isDelete) {
            try {
                setLoading(true);
                const response = await axios.delete(ApiEndPoint + 'DeleteTicket?id=' + id);
                setLoading(false);
                if (response.data.result) {
                    toast.success("Ticket Deleted Successfully");
                    getAllticket();

                    resetForm();
                }
                else {
                    setLoading(false);
                    toast.error(response.data.message);

                }
            }
            catch (error) {
                toast.error(error.toast);
                setLoading(false);

            }
        }
    }
    const resetForm = () => {
        setTicketObj({
            "employeeId": 0,
            "severity": "",
            "deptId": 0,
            "state": "",
            "requestDetails": ""
        })
    }

    const inputHandler = (event, key) => {
        setTicketObj(prevObj => ({ ...prevObj, [key]: event.target.value }));
    }
    const closeform = () => {
        setShowfrom(false);
    }

    const convertDate = (dateString) => {
        const parsedDate = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = parsedDate.toLocaleDateString('en-US', options);

        // Split the formatted date and rearrange the parts
        const [month, day, year] = formattedDate.split(' ');
        return `${day} ${month} ${year}`;
    };




    return (
        <div>
            <div className='row'>
                <div className='row'>
                    <div className='col-12 text-end mt-2 mb-2'>
                        <button className='btn btn-sm btn-info text-white text-end mb-2' onClick={() => { setShowfrom(!showForm) }}>
                            Add Tickets</button>
                    </div>
                </div>
                <div className={`${showForm ? 'col-8' : 'col-12'}`}>
                    <div className='card'>
                        <div className='card-header d-flex bg-primary justify-content-between align-items-center'>
                            <div className='text-white text-start'>
                                Ticket List
                            </div>
                        </div>
                        <div className="card-body">
                            {loading && (
                                <div className='text-center'>
                                    <div className='spinner-border text-muted'></div>
                                    <div className='spinner-border text-primary'></div>
                                    <div className='spinner-border text-success'></div>
                                    <div className='spinner-border text-info'></div>
                                    <div className='spinner-border text-warning'></div>
                                    <div className='spinner-border text-danger'></div>
                                    <div className='spinner-border text-secondary'></div>
                                    <div className='spinner-border text-dark'></div>
                                    <div className='spinner-border text-light'></div>
                                </div>
                            )}
                            {!loading && (
                                EmpRole === 'Employee' &&
                                (<div className="row">
                                    {ticketList.map((item, index) => (
                                        <div key={index} className="col-4 mb-4">
                                            <div className="card bg-body-tertiary">
                                                <div className="card-header" style={{ background: 'silver', color: 'black' }}>
                                                    <h5 className="card-title">Ticket No: {item.ticketNo}</h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <strong>Dept-Name:</strong> {item.deptName}
                                                        </div>
                                                        <div className='col-6'>
                                                            <strong>createdDate:</strong> {item.createdDate}
                                                        </div>

                                                    </div>
                                                    <div className='row p-3'>
                                                        <div className='col-6'>
                                                            <strong>Dept Name</strong> - {item.deptName}

                                                        </div>
                                                        <div className='col-6'>
                                                            <strong><FaPhone></FaPhone></strong>{item.contactNo}
                                                        </div>

                                                    </div>
                                                    <div className='row mt-3'>
                                                        <div className='col-6 offset-6 text-end'>
                                                            <button className='btn btn-primary btn-sm mx-1' style={{ pointerEvents: 'none' }}>{item.state}</button>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="card-footer" style={{ textAlign: 'left', fontWeight: 'bold' }}>
                                                    <small className="text-muted">{index + 1}</small>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>)
                            )}

                            {!loading && (
                                EmpRole === 'Department Head' &&
                                (<div className="row">
                                    {ticketList.map((item, index) => (
                                        <div key={index} className="col-4 mb-4">
                                            <div className="card bg-body-tertiary">
                                                <div className="card-header" style={{ background: 'silver', color: 'black' }}>
                                                    <h5 className="card-title">Ticket No: {item.ticketNo}</h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <strong>Employee Name</strong> - {item.employeeName}

                                                        </div>
                                                        <div className='col-6'>
                                                            <strong>createdDate:</strong>{convertDate(item.createdDate)}
                                                        </div>

                                                    </div>
                                                    <div className='row p-3'>
                                                        <div className='col-6'>
                                                            <strong>Expected End Date</strong> -{convertDate(item.expectedEndDate)}
                                                        </div>
                                                        <div className='col-6'>
                                                            <strong>Severity</strong>{item.severity}
                                                        </div>

                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <select className='form-select'>
                                                                <option value=''>Select Employee</option>
                                                                {
                                                                    empListBydeptid.map((item) => {
                                                                        return (<option value={item.employeeId}>{item.employeeName}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className='col-6 text-end'>
                                                            <button className='btn btn-primary btn-sm mx-1' style={{ pointerEvents: 'none' }}>{item.state}</button>
                                                        </div>
                                                    </div>

                                                </div>


                                            </div>
                                            <div className="card-footer" style={{ textAlign: 'left', fontWeight: 'bold' }}>
                                                <small className="text-muted">{index + 1}</small>
                                            </div>
                                        </div>

                                    ))}
                                </div>)
                            )}




                        </div>



                    </div>
                </div>
                {showForm && <div className='col-4'>
                    <div className='card'>
                        <div className='card-header bg-primary text-white d-flex align-items-center justify-content-between'>
                            Ticket Information
                            <button className='btn btn-body text-white' onClick={closeform}><FaTimes /></button>
                        </div>
                        <div className='card-body custom-BG'>
                            <div className='row mt-2'>

                                <div className='col-6'>
                                    <label>Severity</label>
                                    <select value={ticketObj.severity} onChange={(event) => { inputHandler(event, 'severity') }} className='form-control'>
                                        <option>Select Severity</option>
                                        <option value='H'>High</option>
                                        <option value='L'>Low</option>
                                        <option value='M'>Medium</option>

                                    </select>
                                </div>


                                <div className='col-6'>
                                    <label>DeptId</label>
                                    <select value={ticketObj.deptId} onChange={(event) => { inputHandler(event, 'deptId') }} className='form-control'>

                                        <option value=''>Select Dept</option>
                                        {
                                            deparmentList.map((item, index) => {
                                                return (<option key={index} value={item.deptId}>{item.deptName}</option>)
                                            })
                                        }

                                    </select>

                                </div>


                            </div>
                            <div className='row mt-2'>

                                <div className='col-12'>
                                    <label>RequestDetails</label>
                                    <textarea className='form-control' value={ticketObj.requestDetails} onChange={(event) => { inputHandler(event, 'requestDetails') }} ></textarea>

                                </div>


                            </div>
                            <div className='row mt-3'>
                                <div className='col-6  text-start'>
                                    <button className='btn btn-success' onClick={addTicket} disabled={ticketObj.employeeId === '' || ticketObj.deptId === '' || ticketObj.requestDetails === '' || ticketObj.severity === ''}> {loading ? 'Saving' : 'Save'}</button>
                                    {/* {departmentObj.deptId !== 0 && <button className='btn btn-warning' onClick={updateDeaprmentData}> {loading ? 'Updating...' : 'Update'}</button>} */}
                                </div>
                                <div className='col-6 text-end'>
                                    <button className='btn btn-secondary'>Reset</button>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>}

            </div>

        </div >
    );
};

export default Tickets;