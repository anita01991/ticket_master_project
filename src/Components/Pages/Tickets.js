import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getTicket, saveTicket, getTicketDepartDropdown, getTicketById, getNewTickets, getAssignedTickets, GetEmployeesByDeptId, ticketRequest, startTicket, closetTicket } from "../Services/Api"




const Tickets = () => {

    const isLoggedIn = localStorage.getItem('userinfo');
    const userInfo = JSON.parse(isLoggedIn);
    const id = userInfo.employeeId;
    // const name=userInfo.employeeName;
    const EmpRole = userInfo.role;
    const depId = userInfo.deptId;

    let [ticketData, setTicketData] = useState([]);
    let [ticketObj, setTicketObj] = useState({
        "employeeId": id,
        "severity": "",
        "deptId": 0,
        "state": "",
        "requestDetails": ""
    });
    let [depData, setDepData] = useState([]);
    let [empData, setEmpData] = useState([]);
    let [isFormSubmitted, setisFormSubmitted] = useState(false);
    let [isShowForm, setIsShowForm] = useState(false);
    const [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        if (EmpRole === 'Employee') {
            showTicketCreatedByEmpId();
        }
        else if (EmpRole === 'Department Head') {

            showNewTicketByEmpId();
            GetAllEmployeesByDeptId();
        }
        else if (EmpRole === 'Admin Department Employee') {
            showAssignedTicketByEmpId();
        }
        else {
            showAllTicketData();
        }
        getAllDepartments();

    }, []);

    const showAllTicketData = () => {
        getTicket().then((data) => {
            setTicketData(data.data);
            setIsLoader(false);
        })
    }

    const showTicketCreatedByEmpId = () => {
        getTicketById(id).then((data) => {
            setTicketData(data.data);
            setIsLoader(false);
        })
    }

    const showNewTicketByEmpId = () => {
        getNewTickets(id).then((data) => {
            setTicketData(data.data);
            setIsLoader(false);
            // console.log('Ticket Data:', ticketData);
        })
    }

    const showAssignedTicketByEmpId = () => {
        getAssignedTickets(id).then((data) => {
            setTicketData(data.data);
            setIsLoader(false);
        })
    }

    const GetAllEmployeesByDeptId = () => {
        GetEmployeesByDeptId(depId).then((data) => {
            setEmpData(data.data);
            setIsLoader(false);
            // console.log('Employee Data:', empData);
        })
    }

    const getAllDepartments = () => {
        getTicketDepartDropdown(ticketObj).then((data) => {
            setDepData(data.data);
            // console.log('Department Data:', depData);

        });
    }



    const onChangeHandler = (event, key) => {
        setTicketObj(prevData => ({ ...prevData, [key]: event.target.value }));
    }



    const addAllTicketData = () => {
        saveTicket(ticketObj).then((data) => {
            if (data.result) {
                alert('Ticket Added Successfully');
                if (EmpRole === 'Employee') {
                    showTicketCreatedByEmpId();
                }
                else if (EmpRole === 'Department Head') {
                    showNewTicketByEmpId();
                }
                else if (EmpRole === 'Admin Department Employee') {
                    showAssignedTicketByEmpId();
                }
                else {
                    showAllTicketData();
                }
            }
            else {
                alert(data.message);
            }
        })
    }


    const resetForm = () => {
        setisFormSubmitted(false);
        setTicketObj({
            "employeeId": 0,
            "severity": "",
            "deptId": 0,
            "state": "",
            "requestDetails": ""
        })
    }

    const showForm = () => {
        setIsShowForm(true);
    }

    const closeForm = () => {
        setIsShowForm(false);
    }

    const convertDate = (dateString) => {
        const parsedDate = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = parsedDate.toLocaleDateString('en-US', options);

        // Split the formatted date and rearrange the parts
        const [month, day, year] = formattedDate.split(' ');
        return `${day} ${month} ${year}`;
    };

    // assign ticket

    const getTicketRequest = (event, ticketId) => {
        const newticketObj = ({

            "ticketId": ticketId,
            "assignedTo": event.target.value

        })

        ticketRequest(newticketObj).then((res) => {
            if (res.result) {
                toast.success("Ticket assigned successfully");
                showNewTicketByEmpId();

            }
            else {
                toast.error('Error at the assigning ticket');
            }

        })

    }


    const startNewTicket = (id) => {
        startTicket(id).then((data) => {
            if (data.result) {
                toast.success('Ticket Start now');
                showNewTicketByEmpId();
            }
            else {
                toast.error('Ticket Not Start')
            }
        })
    }

    const closeNewTicket = (id) => {
        closetTicket(id).then((data) => {
            if (data.result) {
                toast.success('Ticket Closed')
            }
            else {
                toast.error(data.message)
            }
        })
    }


    return (
        <div>
            <ToastContainer />
            <div className="container-fluid mt-2">
                <div className="row">
                    <div className="col-12 mb-2 text-end">
                        <button className="btn btn-secondary mb-2" onClick={showForm}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <div className={`${isShowForm ? 'col-8' : 'col-12'}`}>
                        <div className="card">
                            <div className="card-header bg-primary">
                                <div className="row">
                                    <div className="col-6">
                                        <strong className="text-white text-start">All Tickets</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                {isLoader && (
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
                                {!isLoader && (
                                    EmpRole === 'Employee' && <div className="row">
                                        {ticketData.map((item, index) => (
                                            <div key={index} className="col-4 mb-4">
                                                <div className="card bg-body-tertiary">
                                                    <div className="card-header" style={{ background: 'silver', color: 'black' }}>
                                                        <h5 className="card-title">Ticket No: {item.ticketNo}</h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <p className="card-text" style={{ fontSize: '15px' }}>
                                                            <strong>Created Date:</strong> {convertDate(item.createdDate)}
                                                        </p>
                                                        <p className="card-text" style={{ fontSize: '15px' }}>
                                                            <strong>Expected End Date:</strong> {convertDate(item.expectedEndDate)}
                                                        </p>
                                                        <p className="card-text" style={{ fontSize: '15px' }}>
                                                            <strong>Dept Name:</strong> {item.deptName}
                                                        </p>
                                                        <p className="card-text" style={{ fontSize: '15px' }}>
                                                            <strong>Contact No:</strong> {item.contactNo}
                                                        </p>

                                                    </div>
                                                    <div className='row mb-3'>
                                                        <div className='col-6 offset-6 text-end'>
                                                            <button className='btn btn-info btn-sm mx-1'>{item.state}</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {!isLoader && (
                                    EmpRole === 'Department Head' && <div className="row">
                                        {ticketData.map((item, index) => (
                                            <div key={index} className="col-4 mb-4">
                                                <div className="card bg-body-tertiary">
                                                    <div className="card-header" style={{ background: 'silver', color: 'black' }}>
                                                        <h5 className="card-title">Ticket No: {item.ticketNo}</h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <p className="card-text" style={{ fontSize: '15px' }}>
                                                            <strong>Created Date:</strong> {convertDate(item.createdDate)}
                                                        </p>
                                                        <p className="card-text" style={{ fontSize: '15px' }}>
                                                            <strong>Expected End Date:</strong> {convertDate(item.expectedEndDate)}
                                                        </p>
                                                        <p className="card-text" style={{ fontSize: '15px' }}>
                                                            <strong>Severity:</strong> {item.severity}
                                                        </p>

                                                    </div>
                                                    <div className='row mb-3'>
                                                        <div className='col-6 text-start'>
                                                            <select className='form-select' onChange={(event) => { getTicketRequest(event, item.ticketId) }}>

                                                                <option>Select Employee</option>
                                                                {empData.map((item) => (
                                                                    <option key={item.employeeId} value={item.employeeId}>
                                                                        {item.employeeName}
                                                                    </option>
                                                                ))}
                                                            </select>

                                                        </div>

                                                        <div className='col-6 mb-3 text-end'>
                                                            <button className='btn btn-info btn-sm mx-1' style={{ pointerEvents: 'none' }}>{item.state}</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {!isLoader && (
                                    EmpRole === 'Admin Department Employee' && (
                                        <div className="row">
                                            {ticketData && ticketData.map((item, index) => (
                                                <div key={index} className="col-4 mb-4">
                                                    <div className="card bg-body-tertiary">
                                                        <div className="card-header" style={{ background: 'silver', color: 'black' }}>
                                                            <h5 className="card-title">Ticket No: {item.ticketNo}</h5>
                                                        </div>
                                                        <div className="card-body">
                                                            <p className="card-text" style={{ fontSize: '15px' }}>
                                                                <strong>Created Date:</strong> {convertDate(item.createdDate)}
                                                            </p>
                                                            <p className="card-text" style={{ fontSize: '15px' }}>
                                                                <strong>Expected End Date:</strong> {convertDate(item.expectedEndDate)}
                                                            </p>
                                                            <p className="card-text" style={{ fontSize: '15px' }}>
                                                                <strong>Severity:</strong> {item.severity}
                                                            </p>
                                                            {/* <p className="card-text" style={{ fontSize: '15px' }}>
                                                                <strong>State:</strong> {item.state}
                                                            </p>
                                                            <p className="card-text" style={{ fontSize: '15px' }}>
                                                                <strong>Role:</strong> {item.role}
                                                            </p> */}
                                                            <p className="card-text" style={{ fontSize: '15px' }}>
                                                                <strong>Employee Name:</strong> {item.employeeName}
                                                            </p>
                                                            <p className="card-text" style={{ fontSize: '15px' }}>
                                                                <strong>Department Name</strong> - {item.deptName}
                                                            </p>

                                                        </div>
                                                        <div className='row mb-2'>
                                                            <div className='col-6 text-end'>
                                                                {
                                                                    item.state === 'Assigned' && <button className='btn btn-warning btn-sm mx-1' onClick={() => startNewTicket(item.ticketId)}>Start Ticket</button>
                                                                }
                                                                {
                                                                    item.state === 'In-Progress' && <button className='btn btn-danger btn-sm mx-1' onClick={() => closeNewTicket(item.ticketId)}>Close Ticket</button>
                                                                }

                                                            </div>

                                                            <div className='col-6 text-end'>
                                                                <button className='btn btn-info btn-sm mx-1' style={{ pointerEvents: 'none' }}>{item.state}</button>
                                                            </div>
                                                        </div>



                                                    </div>
                                                </div>

                                            ))}
                                        </div>
                                    )
                                )}

                                {!isLoader && (
                                    EmpRole === 'Super Admin' && (
                                        <div className="row">
                                            {ticketData && ticketData.map((item, index) => (
                                                <div key={index} className="col-4 mb-4">
                                                    <div className="card bg-body-tertiary">
                                                        <div className="card-header" style={{ background: 'silver', color: 'black' }}>
                                                            <h5 className="card-title">Ticket No: {item.ticketNo}</h5>
                                                        </div>
                                                        <div className="card-body">
                                                            <p className="card-text" style={{ fontSize: '15px' }}>
                                                                <strong>Created Date:</strong> {convertDate(item.createdDate)}
                                                            </p>
                                                            <p className="card-text" style={{ fontSize: '15px' }}>
                                                                <strong>Expected End Date:</strong> {convertDate(item.expectedEndDate)}
                                                            </p>
                                                            <p className="card-text" style={{ fontSize: '15px' }}>
                                                                <strong>Severity:</strong> {item.severity}
                                                            </p>

                                                           
                                                            <p className="card-text" style={{ fontSize: '15px' }}>
                                                                <strong>Department Name</strong> - {item.deptName}
                                                            </p>

                                                        </div>
                                                        <div className='row mb-2 text-end'>


                                                            <div className='col-6 '>
                                                                <button className='btn btn-info btn-sm mx-1' style={{ pointerEvents: 'none' }}>{item.state}</button>
                                                            </div>
                                                        </div>



                                                    </div>
                                                </div>

                                            ))}
                                        </div>
                                    )
                                )}


                            </div>
                        </div>
                    </div>



                    <div className="col-4">
                        {isShowForm && (
                            <div className="card">
                                <div className="card-header bg-primary">
                                    <div className="row">
                                        <div className="col-6 text-start">
                                            <strong className="text-white">New Ticket</strong>
                                        </div>
                                        <div className="col-6 text-end">
                                            <button className="btn p-0 btn-body" onClick={closeForm}>
                                                <i className="fa fa-times fa-lg text-white"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body custom-BG">
                                    <div className="row">
                                        <div className="col-6">
                                            <label>Select Severity</label>
                                            <select
                                                value={ticketObj.severity}
                                                onChange={(event) => { onChangeHandler(event, 'severity') }}
                                                className="form-select"
                                            >
                                                <option>Select</option>
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </select>
                                            <div className="text-danger">
                                                {isFormSubmitted && ticketObj.severity === '' && <span>Severity is required.</span>}
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <label>Select Department</label>
                                            <select className="form-select" value={ticketObj.deptId} onChange={(event) => { onChangeHandler(event, 'deptId') }}>
                                                <option>Select</option>
                                                {depData && depData.length > 0 &&
                                                    depData.map((item) => (
                                                        <option key={item.deptId} value={item.deptId}>
                                                            {item.deptName}
                                                        </option>
                                                    ))
                                                }
                                            </select>


                                            <div className="text-danger">
                                                {isFormSubmitted && !ticketObj.deptId && <span>Department is required.</span>}
                                            </div>
                                        </div>
                                    </div>


                                    <br></br>
                                    <div className="row">
                                        <div className="col-12">
                                            <label>Enter Your Ticket Details</label>
                                            <textarea
                                                value={ticketObj.requestDetails}
                                                onChange={(event) => { onChangeHandler(event, 'requestDetails') }}
                                                className="form-control"
                                            ></textarea>
                                            <div className="text-danger">
                                                {isFormSubmitted && ticketObj.requestDetails === '' && <span>RequestDetails is required.</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6  text-center">
                                        <button className="btn btn-secondary btn-sm" onClick={resetForm} style={{ marginBottom: '10px' }}>
                                            Reset
                                        </button>
                                    </div>
                                    <div className="col-6  text-center">
                                        <button className="btn btn-success btn-sm" onClick={addAllTicketData} style={{ marginBottom: '10px' }}>
                                            Save Data
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>



        </div>

    );
};
export default Tickets;