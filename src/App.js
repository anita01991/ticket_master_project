import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarExample from './Components/UI/Navbar';
import Dashboard from './Components/Pages/Dashboard';
import Departments from './Components/Pages/Departments';
import Employee from './Components/Pages/Employee';
import Leave from './Components/Pages/Leave';
import Tickets from './Components/Pages/Tickets';
import Login from './Components/Pages/Login';



function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
        <NavbarExample />
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/department' element={<Departments></Departments>}></Route>
          <Route path='/employee' element={<Employee></Employee>}></Route>
          <Route path='/leave' element={<Leave></Leave>}></Route>
          <Route path='/tickets' element={<Tickets></Tickets>}></Route>
          
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
