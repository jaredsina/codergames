
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './components/Home';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green
      light: '#81C784',
      dark: '#388E3C',
    },
    secondary: {
      main: '#FFC107', // Yellow
      light: '#FFD54F',
      dark: '#FFA000',
    },
    background: {
      default: '#4CAF50', // Green background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000', // Black
      secondary: '#757575', // Grey
    },
    divider: '#E0E0E0', // Light Grey
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
