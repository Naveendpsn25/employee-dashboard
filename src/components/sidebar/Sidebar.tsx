import { Box, List, ListItemButton, ListItemText } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function Sidebar() {
    const navigate = useNavigate()

    return (
        <Box sx={{ width: 200 }}>
            {/* <Typography variant="h6" sx={{ p: 2 }}></Typography> */}
            <List sx={{mt:6}}>
                <ListItemButton onClick={() => navigate("/dashboard")}>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/profile")}>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/settings")}>
                    <ListItemText primary="Settings" />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/employees")}>
                    <ListItemText primary="Employees" />
                </ListItemButton>
            </List>
        </Box>
    );
}