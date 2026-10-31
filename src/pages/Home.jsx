import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HandymanIcon from '@mui/icons-material/Handyman';

export default function Home() {
    return (
        <Paper sx={{p: 4}}>
            <Typography sx={{mb: 2}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec. 
            </Typography>
            <Typography sx={{mb: 3}} color="text.secondary">
                 Texto de referencia a task porque tasks: WIP <HandymanIcon></HandymanIcon>
            </Typography>

            <Button variant="contained" component={RouterLink} to="/tasks">View Tasks</Button>
        </Paper>
    )
}