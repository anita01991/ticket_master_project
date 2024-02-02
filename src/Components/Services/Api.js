import axios from "axios";
import * as Constants from '../Services/Constants';
const ApiEndpoint = process.env.REACT_APP_API_END_POINT

const getLogin = async (obj) => {
   const result = await axios.post(ApiEndpoint + Constants.CHECK_LOGIN, obj);
   return result.data
}

const getDashboard = async () => {
   const result = await axios.get(ApiEndpoint + Constants.GET_SUPERADMIN_DASHBOARD);
   return result.data
};
const getEmployeeDashByEmpId = async (id) => {
   const result = await axios.get(ApiEndpoint + Constants.GET_EMPLOYEE_DASHBOARD_BY_EMPID + id);
   return result.data
};
const getAdminEmployeeDashByEmpId = async (id) => {
   const result = await axios.get(ApiEndpoint + Constants.GET_ADMIN_EMPLOYEE_DASHBOARD_BY_EMPID + id);
   return result.data
};
const getDeptHeadDashboardByDeptHead = async (id) => {
   const result = await axios.get(ApiEndpoint + Constants.GET_DEPTHEAD_DASHBOARD_BY_DEPTHEAD + id);
   return result.data
}

// Tickets
const getTicket = async () => {
   const result = await axios.get(ApiEndpoint + Constants.GET_ALL_TICKET);
   return result.data
};

const saveTicket = async (obj) => {
   try {
      const result = await axios.post(ApiEndpoint + Constants.CREATE_NEW_TICKET, obj);
      return result.data;
   } catch (error) {
      alert(error.code);
   }
};

const onEditTicket = async (id) => {
   const result = await axios.get(ApiEndpoint + Constants.GET_TICKET_BY_ID + id)
   return result.data.data;
};

const deleteTicket = async (id) => {
   const result = await axios.delete(ApiEndpoint + Constants.DELETE_TICKET_BY_ID + id);
   return result.data.data
};



const getTicketDepartDropdown = async () => {
   const result = await axios.get(ApiEndpoint + Constants.GET_ALL_DEPARTMENTS);
   return result.data
};

const getTicketById = async (id) => {
   const result = await axios.get(ApiEndpoint + Constants.GET_TICKETS_CREATED_BY_EMPID + id);
   return result.data
}

const getNewTickets = async (id) => {
   const result = await axios.get(ApiEndpoint + Constants.GET_NEW_TICKETS + id);
   return result.data
}
const GetEmployeesByDeptId = async (id) => {
   const result = await axios.get(ApiEndpoint + Constants.GET_EMPLOYEE_BY_DEPTID + id);
   return result.data;
}

const getAssignedTickets = async (id) => {
   const result = await axios.get(ApiEndpoint + Constants.GET_ASSIGNED_TICKET+id);
   return result.data
}
const startTicket = async (id) => {
   const result = await axios.post(ApiEndpoint + Constants.START_TICKET + id);
   return result.data
}
const closetTicket = async (id) => {
   const result = await axios.post(ApiEndpoint + Constants.CLOSE_TICKET + id);
   return result.data
}

const ticketRequest=async(obj)=>{
   const result=await axios.post(ApiEndpoint+Constants.ASSIGNED_TICKET_REQUEST,obj);
   return result.data;
}

// employee
const getAllEmployeeData=async()=>{

   const response = await axios.get(ApiEndpoint + Constants.GET_ALL_EMPLOYEES);
   return response.data;

}

const getAllRoleData=async()=>{
   const result = await axios.get(ApiEndpoint + Constants.GET_ALL_ROLES);
   return result.data;
}




export {
   getLogin, getDashboard, getEmployeeDashByEmpId, getAdminEmployeeDashByEmpId,
   getDeptHeadDashboardByDeptHead, getTicketById, getAssignedTickets, getNewTickets,
   getTicket, saveTicket, onEditTicket, getTicketDepartDropdown, GetEmployeesByDeptId, startTicket,
   closetTicket,deleteTicket,ticketRequest,getAllEmployeeData,getAllRoleData}


