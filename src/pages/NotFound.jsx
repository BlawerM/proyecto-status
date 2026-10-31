import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import Paper from "@mui/material";
import Typography from "@mui/material";

export default function NotFound() {
    return (
        <Paper sx={{p: 4, textAlign: "center"}}>
            <Typography variant="h3" gutterBottom>
                404
            </Typography>
            <Typography sx={{mb: 3}} color="text.secondary">
                This page does not exist.
                
            </Typography>
            <Button variant="contained" component={RouterLink} to="/">
                Back to home
            </Button>
        </Paper>
    )
}