import {Typography,Box,TextField,Paper,Button,Stack} from "@mui/material";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const loginSchema = z.object({
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters long")
});

type LoginFormData = z.infer<typeof loginSchema>;

// type LoginFormData = {
//     email: string;
//     password: string;
// }


export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>({resolver: zodResolver(loginSchema)});
    const navigate = useNavigate();
    const loginUser = useAuthStore((state) => state.login)
    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await fetch(`https://employee-dashboard-29et.onrender.com/users?email=${data.email}&password=${data.password}`);
            const result = await response.json();
            if (result.length > 0) {
                alert("Login successful!");
                loginUser(result[0])
                console.log(result[0])
                navigate("/dashboard")
            }
            else {
                alert("Invalid email or password");
            }
        }
        catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again later.");
        }
       
    }
    return (
        <Box  sx={{justifyContent:"center",display:"flex",alignItems:"center" ,justifyItems:"center",mt:20}}>
            <Paper elevation={3} sx={{p:4, width:300}}>
                <Typography variant="h5" align="center"  sx={{mb:2}}>Employee Dashboard Login</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                    <TextField label="Email" variant="outlined" fullWidth {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
                    <TextField label="Password" variant="outlined" type="password" fullWidth {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
                    <Button variant="contained" color="primary" fullWidth type="submit">
                        Login
                    </Button>
                </Stack>
                </form>
            </Paper>
        </Box>
    );
}