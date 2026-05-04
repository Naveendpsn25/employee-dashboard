import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"


export default function AddEmployee() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const mutation = useMutation({
    mutationFn: async (newEmployee: any) => {
        const response = await fetch("https://employee-dashboard-29et.onrender.com/employees", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
        });
    return response.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["employees"] });
    navigate("/employees");
  },
})
    const handleSubmit = () => {mutation.mutate({name, email,role,
                                    phone: "",
                                    department: "General",
                                    salary: 0,
                                    status: "Active",
                                    // joiningDate: new Date().toISOString().split("T")[0],
                                    location: "Not Assigned"})}

    return (
        
        <Box sx={{ p: 2, mt: 4, maxWidth: 400 }}>
            <Typography variant="h5" gutterBottom>Add Employee</Typography>
            <TextField label="Name" fullWidth sx={{ mb: 2 }} value={name} onChange={(e) => setName(e.target.value)}/>
            <TextField label="Email" fullWidth sx={{ mb: 2 }} value={email} onChange={(e) => setEmail(e.target.value)}/>
            <TextField label="Role" fullWidth sx={{ mb: 2 }} value={role} onChange={(e) => setRole(e.target.value)}/>
            <Button variant="contained" onClick={handleSubmit}>Add Employee</Button>
            <Button variant="outlined" sx={{ml:2}}>Cancel</Button>
        </Box>
  );
}