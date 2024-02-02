import React, { useState, useEffect } from 'react';
import { getDashboard, getEmployeeDashByEmpId, getAdminEmployeeDashByEmpId, getDeptHeadDashboardByDeptHead } from "../Services/Api"

const Dashboard = () => {

    const isLoggedIn = localStorage.getItem('userinfo');
    const userInfo = JSON.parse(isLoggedIn);
    const id = userInfo.employeeId;
    const EmpRole = userInfo.role;

    const [superAdminData, setSuperAdminData] = useState({});
    const [employeeData, setEmployeeData] = useState({});
    const [deptHeadData, setDeptHeadData] = useState({});
    const [adminEmployeeData, setAdminEmployeeData] = useState({});



    useEffect(() => {
        if (EmpRole === 'Employee') {
            employeeDashboard();
        }
        else if (EmpRole === 'Department Head') {
            deptHeadDashboard();
        }
        else if (EmpRole === 'Admin Department Employee') {

            adminEmployeeDashboard();
        }
        else {
            superAdminDashboard();
        }
    }, []);



    const superAdminDashboard = () => {
        getDashboard().then((data) => {
            setSuperAdminData(data.data);

        })
    }
    const employeeDashboard = () => {
        getEmployeeDashByEmpId(id).then((data) => {
            setEmployeeData(data.data);

        })
    }
    const adminEmployeeDashboard = () => {
        getAdminEmployeeDashByEmpId(id).then((data) => {
            setAdminEmployeeData(data.data);

        })
    }
    const deptHeadDashboard = () => {
        getDeptHeadDashboardByDeptHead(id).then((data) => {
            setDeptHeadData(data.data);

        })
    }



    return (
        <div className="container" style={{ backgroundColor: 'lightpink', minHeight: '80vh' }}>
            <div className="row mt-5">
                <div className='col-md-12'>
                    <h3 style={{ color: 'cyan', fontFamily: 'cursive', textShadow: '2px 2px 4px #333' }}>Welcome {userInfo.employeeName}</h3>
                </div>
                {EmpRole === 'Super Admin' && (
                    <>
                        <div className="col-md-4 col-lg-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '22px'}}>Total Employees</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className="fa fa-users f-left" style={{ fontSize: '50px', color: 'steelblue' }}></i>

                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', marginBottom: '100px', marginRight: "70px", fontSize: '24px', color: 'gray' }}>{superAdminData.totalEmployees}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Departments Card */}
                        <div className="col-md-4 col-lg-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{fontWeight: 'bold', color: 'black', fontSize: '22px'}}>TotalDepartment</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className="fa fa-building f-left" style={{ fontSize: '50px', color: 'brown' }}></i>

                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "70px", fontSize: '24px', color: 'gray' }}>{superAdminData.totalDepartments}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Tickets Card */}
                        <div className="col-md-4 col-lg-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '24px' }}>Total Tickets</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className=" fa fa-hourglass-1 f-left" style={{ fontSize: '50px', color: 'slategray' }}></i>

                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "40px", fontSize: '20px', color: 'gray' }}>{superAdminData.totalTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* UnAssignedTickets Card */}
                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '20px' }}>UnAssignedTickets</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className="fa fa-line-chart f-left" style={{ fontSize: '50px', color: 'plum' }}></i>

                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "50px", fontSize: '24px', color: 'gray' }}>{superAdminData.totalUnAssignedTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Assigned Card */}
                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '24px' }}>Assigned</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className="fa fa-tasks f-left" style={{ fontSize: '50px', color: 'rosybrown' }}></i>

                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "70px", fontSize: '24px', color: 'gray' }}>{superAdminData.totalAssignedTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* In-Progress Card */}
                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '24px' }}>In-Progress</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className="fa fa-spinner f-left" style={{ fontSize: '50px', color: 'dodgerBlue' }}></i>

                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "70px", fontSize: '24px', color: 'gray' }}>{superAdminData.totalInProgressTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Closed Card */}
                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '24px' }}>Closed</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className="fa fa-check-circle f-left" style={{ fontSize: '50px', color: 'forestgreen' }}></i>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "70px", fontSize: '24px', color: 'gray' }}>{superAdminData.totalClosedTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {EmpRole === 'Employee' && (
                    <>

                        {/* Render cards for Employee */}
                        {/* Total Tickets Card */}
                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '24px' }}>Total Tickets</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className=" fa fa-hourglass-1 f-left" style={{ fontSize: '50px', color: 'slategray' }}></i>

                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "40px", fontSize: '20px', color: 'gray' }}>{employeeData.totalTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* UnAssignedTickets Card */}
                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '20px' }}>UnAssignedTickets</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className="fa fa-line-chart f-left" style={{ fontSize: '50px', color: 'plum' }}></i>

                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "50px", fontSize: '24px', color: 'gray' }}>{employeeData.totalUnAssignedTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Assigned Card */}
                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '24px' }}>Assigned</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className="fa fa-tasks f-left" style={{ fontSize: '50px', color: 'rosybrown' }}></i>

                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "70px", fontSize: '24px', color: 'gray' }}>{employeeData.totalAssignedTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* In-Progress Card */}
                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '24px' }}>In-Progress</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className="fa fa-spinner f-left" style={{ fontSize: '50px', color: 'dodgerBlue' }}></i>

                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "70px", fontSize: '24px', color: 'gray' }}>{employeeData.totalInProgressTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Closed Card */}
                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '24px' }}>Closed</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className="fa fa-check-circle f-left" style={{ fontSize: '50px', color: 'forestgreen' }}></i>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "70px", fontSize: '24px', color: 'gray' }}>{employeeData.totalClosedTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {EmpRole === 'Department Head' && (
                    <>
                        {/* Render cards for Department Head */}
                        {/* Total Tickets Card */}


                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '24px' }}>Total Tickets</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className=" fa fa-hourglass-1 f-left" style={{ fontSize: '50px', color: 'slategray' }}></i>

                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "40px", fontSize: '20px', color: 'gray' }}>{deptHeadData.totalTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Assigned Card */}
                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '24px' }}>Assigned</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className="fa fa-tasks f-left" style={{ fontSize: '50px', color: 'rosybrown' }}></i>

                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "70px", fontSize: '24px', color: 'gray' }}>{deptHeadData.totalAssignedTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* In-Progress Card */}
                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '24px' }}>In-Progress</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className="fa fa-spinner f-left" style={{ fontSize: '50px', color: 'dodgerBlue' }}></i>

                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "70px", fontSize: '24px', color: 'gray' }}>{deptHeadData.totalInProgressTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Closed Card */}
                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '24px' }}>Closed</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className="fa fa-check-circle f-left" style={{ fontSize: '50px', color: 'forestgreen' }}></i>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "70px", fontSize: '24px', color: 'gray' }}>{deptHeadData.totalClosedTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {EmpRole === 'Admin Department Employee' && (
                    <>
                        {/* Render cards for Admin Department Employee */}

                        {/* Total Tickets Card */}


                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '24px' }}>Total Tickets</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className=" fa fa-hourglass-1 f-left" style={{ fontSize: '50px', color: 'slategray' }}></i>

                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "40px", fontSize: '20px', color: 'gray' }}>{adminEmployeeData.totalTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Assigned Card */}
                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '24px' }}>Assigned</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className="fa fa-tasks f-left" style={{ fontSize: '50px', color: 'rosybrown' }}></i>

                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "70px", fontSize: '24px', color: 'gray' }}>{adminEmployeeData.totalAssignedTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* In-Progress Card */}
                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '24px' }}>In-Progress</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className="fa fa-spinner f-left" style={{ fontSize: '50px', color: 'dodgerBlue' }}></i>

                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "70px", fontSize: '24px', color: 'gray' }}>{adminEmployeeData.totalInProgressTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Closed Card */}
                        <div className="col-md-4 col-xl-3 mt-5">
                            <div className="card order-card" style={{ height: '150px', backgroundColor: '#D3D3D3' }}>
                                <div className="card-body bg-c-blue">
                                    <h6 className="m-b-20 mb-4" style={{ fontWeight: 'bold', color: 'black', fontSize: '24px' }}>Closed</h6>
                                    <div className="row">
                                        <div className="col-md-6 d-flex align-items-center">
                                            <i className="fa fa-check-circle f-left" style={{ fontSize: '50px', color: 'forestgreen' }}></i>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <span className="f-right" style={{ fontWeight: 'bold', color: 'black', marginBottom: '100px', marginRight: "70px", fontSize: '24px', color: 'gray' }}>{adminEmployeeData.totalClosedTickets}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;


