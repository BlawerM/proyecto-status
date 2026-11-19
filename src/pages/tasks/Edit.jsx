import { useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { Alert, Button, CircularProgress, Paper, Stack, TextField, Typography } from "@mui/material";

export default function EditTask ({items, loading, onUpdate}) {
    const { id } = useParams()
    const navigate = useNavigate()

    const task = items.find((item) => item.id === String(id))

    const [title, setTitle] = useState (task ? task.title : '')
    const [description, setDescription] = useState (task ? task.description: '')
    const [titleError, setTitleError] = useState(false)

    if (loading) return <CircularProgress/>

    if (!task) {
        return (
            <Alert
                severity="warning"
                action={
                    <Button color="inherit" size="small" component={RouterLink} to='/tasks'>
                        Back
                    </Button>
                }
                >
                    Task with this id {id} was not found
                </Alert>
        )
    }

    function save() {
        if (!title.trim()) {
            setTitleError(true)
            return
        }

        onUpdate(String(id), {
            title: title.trim(),
            description: description.trim(),
        })
        navigate('/tasks')
    }

    return (
        <Paper sx={{p: 3,maxWidth: 560 }}>
            <Typography variant="h5" sx={{mb: 3}}>
                Edit Task
            </Typography>

            <Stack>
                <TextField spacing={2}
                    label="title"
                    value={title}
                    error={titleError}
                    helperText={titleError ? 'El título es requerido' : ''}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        setTitleError(false)
                    }}
                />

                <TextField
                    label="Descripción"
                    value={description}
                    multiline
                    minRows={3}
                    onChange={(e) => setDescription(e.target.value)}
                />
                
                <Stack direction="row" spacing={1}>
                    <Button variant="contained" onClick={save}>
                        Save Changes
                    </Button>
                    <Button onClick={() => navigate('/tasks')}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    )
}