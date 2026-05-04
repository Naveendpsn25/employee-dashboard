import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../../store/useAuthStore"

export default function Navbar() {
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.user)
  const logoutUser = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logoutUser()
    navigate("/login")
  }

  return (
    <AppBar>
      <Toolbar>
        <Button color="inherit" onClick={() => navigate("/dashboard")} sx={{ fontSize: "20px", fontWeight: "bold" }}>
          Employee Dashboard
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Typography sx={{ mr: 2 }}>{user?.name}</Typography>
        <Button color="inherit" onClick={handleLogout}>Logout</Button></Toolbar>
    </AppBar>
  );
}