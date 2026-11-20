import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

const STATUS_CHIP_PROPS = {
    "in process": { label: "In Process", color: "warning" },
    "complete": { label: "Complete", color: "success" },
    "incomplete": { label: "Incomplete", color: "error" },
};

export default function TaskList({ items, loading, error, onDelete }) {
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    if (loading) return <CircularProgress />;
    if (error) {
        return <Alert severity="error">Tasks could not be loaded: {error}</Alert>;
    }

    async function handleConfirmDelete() {
        if (!taskToDelete) return;
        try {
            setDeleting(true);
            await onDelete(String(taskToDelete.id || taskToDelete._id));
            setTaskToDelete(null);
        } catch {
            setTaskToDelete(null);
        } finally {
            setDeleting(false);
        }
    }

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
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
                                <TableCell>Tareas</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Incentivo</TableCell>
                                <TableCell>Stado</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((task) => {
                                const taskId = task.id || task._id;
                                const statusConfig = STATUS_CHIP_PROPS[task.status] || {
                                    label: task.status,
                                    color: "default",
                                };

                                return (
                                    <TableRow key={taskId}>
                                        <TableCell>{task.title}</TableCell>
                                        <TableCell>{task.desc}</TableCell>
                                        <TableCell>{task.incentive}</TableCell>
                                        <TableCell>
                                            <Chip
                                                size="small"
                                                label={statusConfig.label}
                                                color={statusConfig.color}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                size="small"
                                                component={RouterLink}
                                                to={`/tasks/edit/${taskId}`}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() => setTaskToDelete(task)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Dialog
                open={Boolean(taskToDelete)}
                onClose={() => !deleting && setTaskToDelete(null)}
            >
                <DialogTitle>¿Eliminar tarea?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Vas a eliminar "{taskToDelete?.title}". Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTaskToDelete(null)} disabled={deleting}>
                        Cancel
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        disabled={deleting}
                        onClick={handleConfirmDelete}
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}