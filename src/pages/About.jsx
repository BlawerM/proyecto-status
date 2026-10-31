import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import HandymanIcon from '@mui/icons-material/Handyman';

const pieces = [
    [
        "React Router 6",
        "Nested routes with <Outlet> and relative routes (create, edit/:id).",
    ],
    [
        "Material UI 6",
        "AppBar, Table, TextField, Dialog, and buttons without writing CSS.",
    ],
    [
        "useCrud",
        "A custom hook that loads data and exposes create, update, and delete operations.",
    ],
    [
        "public/data/tasks.json",
        "The seed data: when an API exists, only the URL needs to change.",
    ],
];

export default function About() {
    return (
        <Paper sx={{p:4}}>
            <Typography sx={{ mb: 3}} color="text.secondary">
                Somos los que somos y estamos los que estamos, en progreso
                WIP <HandymanIcon></HandymanIcon>
            </Typography>

            <Stack spacing={2}>
                {pieces.map(([title, text]) => (
                    <div key={title}>
                        <Typography variant="subtitled" fontWeight={600}> {title}</Typography>
                        <Typography variant="body2" color="text.secondary">{text}</Typography>
                    </div>
                ))}
            </Stack>
        </Paper>
    )
}