import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
// import Navbar from "../navbar/Navbar";
import { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
import {setEmployees} from "../../store/employeeSlice";

export default function Dashboard() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logoutUser = useAuthStore((state) => state.logout)
    const handleLogout = () => {
        logoutUser();
        navigate("/login")
    }

    const dispatch = useDispatch()
    const employees = useSelector((state:any) => state.employees.employees)

    useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const response = await fetch("https://employee-dashboard-29et.onrender.com/employees");
      const data = await response.json();
      dispatch(setEmployees(data));
    } catch (error) {
      console.error(error);
    }
  }

    fetchEmployees();
    }, [dispatch])

    return (
        <>
        <Box sx={{p:2,mt:4}}>
            <Typography variant="h4" gutterBottom>Welcome to the Employee Dashboard  {user?.name}</Typography>
            <Typography variant="body1" gutterBottom>Your email: {user?.email}</Typography>
            <Typography variant="body1" gutterBottom>Your role: {user?.role}</Typography>
            <Stack direction="row" spacing={2} sx={{mt:4}}>
                <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
            </Stack>
        </Box>

        <Typography variant="h5" sx={{mt:4}} >Employee List</Typography>

        {employees.map((employee:any) => (
            <Box key={employee.id} sx={{p:2, border: "1px solid #ccc", borderRadius: 2, mt:2}}>
                <Typography variant="h6">{employee.name}</Typography>
                <Typography variant="body1">Email: {employee.email}</Typography>
                <Typography variant="body1">Role: {employee.role}</Typography>
            </Box>
        ))}
        </>
    );
}