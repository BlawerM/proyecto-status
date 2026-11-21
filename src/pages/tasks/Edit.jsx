import { useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
    Alert,
    Button,
    CircularProgress,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

const STATUS_OPTIONS = [
    { value: "in process", label: "In Process" },
    { value: "complete", label: "Complete" },
    { value: "incomplete", label: "Incomplete" },
];

export default function EditTask({ items, loading, onUpdate }) {
    const { id } = useParams();
    const task = items.find((item) => String(item.id || item._id) === String(id));

    if (loading) return <CircularProgress />;

    if (!task) {
        return (
            <Alert
                severity="warning"
                action={
                    <Button color="inherit" size="small" component={RouterLink} to="/tasks">
                        Back
                    </Button>
                }
            >
                Task with this id {id} was not found
            </Alert>
        );
    }

    return <EditTaskForm key={task.id || task._id} task={task} onUpdate={onUpdate} />;
}

function EditTaskForm({ task, onUpdate }) {
    const navigate = useNavigate();

    const [title, setTitle] = useState(task.title ?? "");
    const [desc, setDesc] = useState(task.desc ?? "");
    const [incentive, setIncentive] = useState(task.incentive ?? 1);
    const [status, setStatus] = useState(task.status ?? "in process");

    const [errors, setErrors] = useState({
        title: false,
        desc: false,
        incentive: false,
    });
    const [apiError, setApiError] = useState(null);
    const [saving, setSaving] = useState(false);

    async function save() {
        const numericIncentive = Number(incentive);
        const newErrors = {
            title: !title.trim(),
            desc: !desc.trim(),
            incentive: Number.isNaN(numericIncentive) || numericIncentive < 1,
        };

        setErrors(newErrors);
        if (newErrors.title || newErrors.desc || newErrors.incentive) return;

        try {
            setSaving(true);
            setApiError(null);

            await onUpdate(String(task.id || task._id), {
                title: title.trim(),
                desc: desc.trim(),
                incentive: numericIncentive,
                status,
            });

            navigate("/tasks");
        } catch (err) {
            setApiError(err.message || "Error al actualizar la tarea");
        } finally {
            setSaving(false);
        }
    }

    return (
        <Paper sx={{ p: 3, maxWidth: 560 }}>
            <Typography variant="h5" sx={{ mb: 3 }}> Editar Tarea </Typography>

            <Stack spacing={2}>
                {apiError && <Alert severity="error">{apiError}</Alert>}

                <TextField
                    label="Título"
                    value={title}
                    error={errors.title}
                    helperText={errors.title ? "El título es requerido" : " "}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setErrors((prev) => ({ ...prev, title: false }));
                    }}
                />

                <TextField
                    label="Descripción"
                    value={desc}
                    multiline
                    minRows={3}
                    error={errors.desc}
                    helperText={errors.desc ? "La descripción es requerida" : " "}
                    onChange={(e) => {
                        setDesc(e.target.value);
                        setErrors((prev) => ({ ...prev, desc: false }));
                    }}
                />

                <TextField
                    label="Incentivo"
                    type="number"
                    value={incentive}
                    inputProps={{ min: 1 }}
                    error={errors.incentive}
                    helperText={errors.incentive ? "El incentivo debe ser numérico y mayor o igual a 1" : " "}
                    onChange={(e) => {
                        setIncentive(e.target.value);
                        setErrors((prev) => ({ ...prev, incentive: false }));
                    }}
                />

                <TextField
                    select
                    label="Estado"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {STATUS_OPTIONS.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Stack direction="row" spacing={1}>
                    <Button variant="contained" onClick={save} disabled={saving}>
                        {saving ? "Saving..." : "Guardar cambios"}
                    </Button>
                    <Button onClick={() => navigate("/tasks")} disabled={saving}>
                        Cancelar
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
}