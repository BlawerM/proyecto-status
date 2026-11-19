import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table,TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

export default function TaskList({items, loading, error, onDelete}) {
    const [taskToDelete, setTaskToDelete] = useState(null)

    if (loading) return <CircularProgress/>
    if (error) {
        return <Alert severity="error">Tasks could not be loaded: {error}</Alert>
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2}}>
                <Typography variant="h4">Tasks</Typography>
                <Button variant="contained" component={RouterLink} to="/tasks/create">
                New Task
                </Button>
            </Box>

            {items.length === 0 ? (
                <Alert severity="info">Todavía no tienes ninguna tarea creada.</Alert>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Task</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>{task.description}</TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            component={RouterLink}
                                            to={`/tasks/edit/${task.id}`}>
                                            Edit
                                        </Button>
                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() => setTaskToDelete(task)}>
                                                Delete
                                            </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

        <Dialog open={Boolean(taskToDelete)} onClose={() => setTaskToDelete(null)}>
            <DialogTitle>Deletear tarea?</DialogTitle>
            <DialogContent>
                <DialogContentText>Vas a deletear "{taskToDelete?.title}". Esta acción no puede ser undone</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setTaskToDelete(null)}>Cancel</Button>
                <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                        onDelete(taskToDelete.id)
                        setTaskToDelete(null)
                    }}>
                    Deletear
                </Button>
            </DialogActions>
        </Dialog>
        </Box>
    )
}