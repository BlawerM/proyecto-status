import useState from 'react'
import { Link as RouterLink} from 'react-router-dom'
import {Alert, Box, Button, CircularProgress, Dialog, DialogActions,
        DialogContent, DialogContetText, DialogTitle, Paper, Table,
        TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material'

export default function TaskList({ items, loading, error, onDelete}){
    const [taskToDelete, setTaskToDelete] = useState(null);

    if (loading) return <CircularProgress/>

    if (error) {
        return <Alert severity="error">Tasks could not be loaded: {error}</Alert> 
    }

    return (
        <Box>
            <Box sx= {{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2}}>
                WIP
            </Box>
        </Box>
        )
}