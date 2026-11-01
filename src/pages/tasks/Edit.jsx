import { useState } from "react";
import { Link as RouterLink, useNavigate, useParams} from 'react-router-dom';
import Alert from '@mui/material'
import Button from '@mui/material'
import CircularProgress from '@mui/material'
import {Paper, Stack, TextField, Typography} from '@mui/material'

export default function EditTask({ items, loading, onUpdate}) {
    const { id } = useParams();
    const navigate = useNavigate();

    const task = items.find((item) => item.id === number(id))

    const [title, setTitle] = useState( task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [titleError, setTitleError] = useState(false);

    if (loading) return <CircularProgress />

    if (!task) {
        return (
            <Alert
                severity="warning"
                action={
                    <Button color="inherit" size="small" component={RouterLink} to="/tasks">
                        Back
                    </Button>
                }>
                    Task with id {id} was not found
            </Alert>
        )
    }

    function save() {
        if (!title.trim()) {
            setTitleError(true)
            return
        }

        onUpdate(Number(id), {
            title: title.trim(),
            description: description.trim(),
        })
        navigate('/tasks')
    }

    return (
        <Paper sx={{p: 3, maxWidth: 560}}>
            <Typography variant="h5" sx={{ mb: 3}}>
                Edit task
            </Typography>

            <Stack spacing={2}>
                <TextField
                    label="title"
                    value={title}
                    error={titleError}
                    helperText={titleError ? 'Title is required' : ' '}
                    onChange{(e) => {
                        setTitle(e.target.value)
                        setTitleError(false)
                    }}
                />

                <TextField
                    label="Description"
                    value={description}
                    multiline
                    minRows={3}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Stack direction="row" spacing={1}>
                    <Button variant="contained" onClick={save}>
                        Save changes
                    </Button>
                    <Button onClick={() => navigate('/tasks')}>Camcel</Button>
                </Stack>
            </Stack>
        </Paper>
    )
}