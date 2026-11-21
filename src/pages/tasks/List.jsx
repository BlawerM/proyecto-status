import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Box, Button, Checkbox, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

const STATUS_CHIP_PROPS = {
    "in process": {
        label: "En progreso",
        bgcolor: "#D4AF37",
        textColor: "#121212", // Texto oscuro para alto contraste sobre dorado
    },
    "complete": {
        label: "Completada",
        bgcolor: "#0B3B24",
        textColor: "#FFFFFF", // Texto blanco sobre verde oscuro
    },
    "incomplete": {
        label: "Incompleta",
        bgcolor: "#58111A",
        textColor: "#FFFFFF", // Texto blanco sobre vinotinto
    },
};

export default function TaskList({ items, loading, error, onUpdate, onDelete }) {
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);

    if (loading) return <CircularProgress />;
    if (error) {
        return <Alert severity="error">Las tareas no pudieron cargarse: {error}</Alert>;
    }

    async function handleToggleStatus(task) {
        const taskId = String(task.id || task._id);
        const nextStatus = task.status === "complete" ? "in process" : "complete";

        try {
            setUpdatingId(taskId);
            await onUpdate(taskId, { status: nextStatus });
        } catch {
            // El error se captura en `error` de useCrud
        } finally {
            setUpdatingId(null);
        }
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
                <Typography
                    variant="h4"
                    color="primary"
                    sx={{
                        border: "1px solid",
                        borderColor: "primary.main",
                        borderRadius: 1,
                        px: 2,
                        py: 0.5,
                        display: "inline-block",
                    }}
                >
                    Tareas
                </Typography>

                <Button variant="contained" component={RouterLink} to="/tasks/create">
                    Nueva Tarea
                </Button>
            </Box>

            {items.length === 0 ? (
                <Alert severity="info">Todavía no tienes ninguna tarea creada.</Alert>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox"></TableCell>
                                <TableCell>Tareas</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Incentivo</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((task) => {
                                const taskId = String(task.id || task._id);
                                const isCompleted = task.status === "complete";
                                const isUpdating = updatingId === taskId;

                                // 2. Aquí obtienes el label y los colores personalizados para el estado de esta tarea
                                const statusConfig = STATUS_CHIP_PROPS[task.status] || {
                                    label: task.status,
                                    bgcolor: "#424242",
                                    textColor: "#FFFFFF",
                                };

                                return (
                                    <TableRow key={taskId}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isCompleted}
                                                disabled={isUpdating}
                                                color="success"
                                                onChange={() => handleToggleStatus(task)}
                                                inputProps={{ "aria-label": `Mark ${task.title} as complete` }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                textDecoration: isCompleted ? "line-through" : "none",
                                                color: isCompleted ? "text.secondary" : "text.primary",
                                            }}
                                        >
                                            {task.title}
                                        </TableCell>
                                        <TableCell>{task.desc}</TableCell>
                                        <TableCell>{task.incentive}</TableCell>

                                        {/* 3. Aquí aplicas statusConfig en el Chip */}
                                        <TableCell>
                                            <Chip
                                                size="small"
                                                label={statusConfig.label}
                                                sx={{
                                                    bgcolor: statusConfig.bgcolor,
                                                    color: statusConfig.textColor,
                                                    fontWeight: 600,
                                                }}
                                            />
                                        </TableCell>

                                        <TableCell align="right">
                                            <Button
                                                size="small"
                                                component={RouterLink}
                                                to={`/tasks/edit/${taskId}`}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() => setTaskToDelete(task)}
                                            >
                                                Borrar
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
                        Cancelar
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        disabled={deleting}
                        onClick={handleConfirmDelete}
                    >
                        {deleting ? "Deleting..." : "Borrar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}