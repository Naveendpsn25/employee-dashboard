import {Paper,Typography,TextField,Button,Stack,MenuItem,Container} from "@mui/material";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
    fullName: z.string().nonempty("Full name is required").min(2, "Full name must be at least 2 characters long"),
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().nonempty("Please confirm your password"),
    role: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

    const onSubmit =async (data: RegisterFormData) => {
        try {
            const newUser = {
            name: data.fullName,
            email: data.email,
            password: data.password,
            role: data.role,
            statusbar: "Active"
        }
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"            
            },
            body: JSON.stringify(newUser)
        })
        if (response.ok) {
            alert("Registration successful! Please login.");
            navigate("/login")
        }
        else {
            alert("Registration failed. Please try again.");
        }
    }catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred during registration. Please try again later.");
        }
    }

  return (
  
      <Container maxWidth="xs" sx={{ mt: 5}} >
        <Paper elevation={3} sx={{ p: 4, width: 400 }}>
            <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>Create Account</Typography>

            
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} >
                    <TextField label="Full Name" fullWidth {...register("fullName")} error={!!errors.fullName} helperText={errors.fullName?.message}/>
                    <TextField label="Email" fullWidth {...register("email")} error={!!errors.email} helperText={errors.email?.message}/>
                    <TextField label="Password" type="password" fullWidth {...register("password")} error={!!errors.password} helperText={errors.password?.message}/>
                    <TextField label="Confirm Password" type="password" fullWidth {...register("confirmPassword")} error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message}/>

                <TextField select label="Role"  fullWidth defaultValue="staff" {...register("role")}>
                    <MenuItem value="staff">Staff</MenuItem>
                    <MenuItem value="hr">HR</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                </TextField>

                    <Button type="submit" variant="contained" fullWidth size="large">Register</Button>

                    <Button type="button" onClick={() => navigate("/login")}>Already have account?</Button>
                 </Stack>
                </form>

          
       
      </Paper>
      </Container>
  
  );
}