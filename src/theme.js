import { createTheme } from '@mui/material/styles'

// Los mismos colores del material del curso mantienen la plantilla consistente.
const theme = createTheme({
  palette: {
    primary: { main: '#D4AF37' },
    secondary: { main: '#0B3B24' },
    teriary: {main: '#58111A'},
    background: { default: '#121212' },
  },
  shape: { borderRadius: 8 },
  typography: {
    // MUI usa botones en mayúsculas por defecto; mantenemos su capitalización natural.
    button: { textTransform: 'none', fontWeight: 600 },
  },
})

export default theme