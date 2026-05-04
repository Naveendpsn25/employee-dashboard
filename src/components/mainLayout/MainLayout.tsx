import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

export default function MainLayout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar />
            <Box sx={{display:"flex"}}>
                <Sidebar />

                <Box sx={{ p: 3 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>    
    )
}