import { Box, TextField, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function EditEmployee() {
  const { id } = useParams(); // get an id by using url
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  //Fetching the employeee
  const { data, isLoading } = useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/employees/${id}`);
      return res.json();
    },
  });

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setRole(data.role);
    }
  }, [data])

  // Update mutation
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:3000/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data, // keep other fields
          name,
          email,
          role,
        }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] })
      navigate("/employees")
    }
  });

  //Submit
  const handleSubmit = () => {
    mutation.mutate();
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 2, mt: 4, maxWidth: 400 }}>
      <Typography variant="h5" gutterBottom>Edit Employee</Typography>
      <TextField label="Name" fullWidth sx={{ mb: 2 }} value={name} onChange={(e) => setName(e.target.value)}/>
      <TextField label="Email" fullWidth sx={{ mb: 2 }} value={email} onChange={(e) => setEmail(e.target.value)}/>
      <TextField label="Role" fullWidth sx={{ mb: 2 }} value={role} onChange={(e) => setRole(e.target.value)}/>
      <Button variant="contained" fullWidth onClick={handleSubmit}>Update Employee</Button>
      <Button variant="outlined" fullWidth sx={{mt:2}} onClick={() => navigate("/employees")}>Cancel</Button>
    </Box>
  );
}