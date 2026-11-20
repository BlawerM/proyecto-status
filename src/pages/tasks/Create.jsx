import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Alert, Button, MenuItem, Paper, Stack, TextField, Typography} from '@mui/material'

const STATUS_OPTIONS = [
    {value: 'in process', label: 'En proceso'},
    {value: 'complete', label: 'Completada'},
    {value: 'incomeplete', label: 'Incompleta/eliminada'}
]

export default function CreateTask({onCreate}){
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [incentive, setIncentive] = useState(1);
    const [status, setStatus] = useState('in process');

    const [errors, setErrors] = useState({
        title: false,
        desc: false,
        incentive: false
    });
    const [apiError, setApiError] = useState(null);
    const [saving, setSaving] = useState(false);

    async function save() {
        const numericIncentive = Number(incentive);
        const newErrors = {
            title: !title.trim(),
            desc: !desc.trim(),
            incentive: Number.isNaN(numericIncentive) || numericIncentive <1,
        };

        setErrors(newErrors);
        if (newErrors.title || newErrors.desc || newErrors.incentive) return;

        try {
            setSaving(true);
            setApiError(null);

            await onCreate({
                title: title.trim(),
                desc: desc.trim(),
                incentive: numericIncentive,
                status
            });

            navigate('/tasks');
        } catch(e){
            setApiError(e.message || 'No se pudo guardar la tarea');
        } finally {
            setSaving(false);
        }
    }

    return (
        <Paper sx={{p: 3, maxWidth: 560}}>
            <Typography variant='h5' sx={{ mb: 3}}>New Task</Typography>

            <Stack spacing={2}>
                {apiError && <Alert severity='error'>{apiError}</Alert>}

                <TextField
                    label="title"
                    value={title}
                    minRows={errors.title}
                    helperText={errors.title ? 'Se requiere el título': ' '}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setErrors((prev) => ({...prev, title: false}))
                }}/>

                <TextField
                    label="description"
                    value={desc}
                    multiline
                    minRows={3}
                    error={errors.desc}
                    helperText={errors.desc ? 'Se requiere la descripción' : ' '}
                    onChange={(e) => {
                        setDesc(e.target.value);
                        setErrors((prev) => ({...prev, desc: false}));
                    }}/>
                
                <TextField
                    label="Incentive"
                    type="number"
                    value={incentive}
                    inputProps={{min: 1}}
                    error={errors.incentive}
                    helperText={errors.incentive ? 'El incentivo debe ser mayor a 0' : ''}
                    onChange={(e) => {
                        setIncentive(e.target.value);
                        setErrors((prev) => ({ ...prev, incentive: false}));
                }}/>

                <TextField
                    select
                    label="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}>
                        {STATUS_OPTIONS.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                </TextField>

                <Stack direction="row" spacing={1}>
                    <Button variant="contained" onClick={save} disabled={saving}>
                        {saving ? 'Saving...' : 'Save'}
                    </Button>
                    <Button onClick={() => navigate('/tasks')} disabled={saving}>
                        Cancel
                    </Button>
                </Stack>
            </Stack>
       </Paper>
    )
}