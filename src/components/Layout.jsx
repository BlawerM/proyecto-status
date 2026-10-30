import { NavLink, Outlet } from "react-router-dom";
import { AppBar } from "@mui/material";
import Box from "@mui/material";
import Button from "@mui/material";
import Container from "@mui/material";
import Toolbar from "@mui/material";
import Typography from "@mui/material";

const linkSx = {
    color: 'inherit',
    '&.active': { borderBottom: '2px solid currentColor'},
}

export default function Layout() {
    return (
        <Box sx={{minHeight: '100vh'}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{mr: 4}}>
                        Tasks
                    </Typography>

                    <Button component={NavLink} to="/" end sx={linkSx}>Home</Button>
                    <Button component={NavLink} to="/about" end sx={linkSx}>About</Button>
                    <Button component={NavLink} to="/tasks" end sx={linkSx}>Tasks</Button>

                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{py: 4}}>
                {/* Aquí irá la página a la que corresponda cada URL */}
                <Outlet/>
            </Container>
        </Box>
    )
}