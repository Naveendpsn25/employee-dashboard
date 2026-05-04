import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateRoute from './privateRoute/PrivateRoute';
import Register from "./components/register/Register";
// import Sidebar from "./components/sidebar/Sidebar";
// import Navbar from "./components/navbar/Navbar";
import MainLayout from "./components/mainLayout/MainLayout";
import Profile from './components/profile/Profile';
import Employees from './components/employees/Employees';
import AddEmployee from './components/employees/AddEmployee';
import EditEmployee from './components/employees/EditEmployee';
function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path='/' element={<Register />}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route element={<PrivateRoute><MainLayout/></PrivateRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/employees" element={<h2>Employees Page</h2>} /> */}
            <Route path="/profile" element={<Profile/>} />
            <Route path="/settings" element={<h2>Settings Page</h2>} />
            <Route path="/employees" element={<Employees />} />
            <Route path='/add-employee' element={<AddEmployee/>}></Route>
            <Route path="/edit-employee/:id" element={<EditEmployee />} />
        </Route>
        
       {/* <Route path='dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;