import { Box, Typography } from "@mui/material";

export default function Profile() {
    return (
        <Box sx={{p:2,mt:4}}>
            <Typography variant="h4" gutterBottom>Profile Page</Typography>
            <Typography variant="body1" gutterBottom>This is the profile page.</Typography>
        </Box>
    );
}
