import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme, GlobalStyles } from '@mui/material';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5D3FD3', // Vibrant purple
      light: '#8B6BFF',
      dark: '#3F1FA0',
    },
    secondary: {
      main: '#FF6B35', // Vibrant orange
      light: '#FF9166',
      dark: '#E04E1A',
    },
    background: {
      default: '#F7F8FC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2A2A3C',
      secondary: '#6E6E85',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    error: {
      main: '#F44336',
      light: '#E57373',
      dark: '#D32F2F',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-1px',
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.5px',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.25px',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      fontSize: '1rem',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 6px 24px 0 rgba(93,63,211,0.08)',
          padding: '8px 0',
          maxWidth: '340px',
          margin: 'auto',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: '0 12px 28px 0 rgba(93,63,211,0.15)',
            transform: 'translateY(-6px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 0',
          minHeight: '44px',
          letterSpacing: '0.5px',
        },
        contained: {
          boxShadow: '0 4px 14px 0 rgba(93,63,211,0.25)',
          background: 'linear-gradient(135deg, #5D3FD3 0%, #8B6BFF 100%)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(135deg, #6A4FE0 0%, #9C7FFF 100%)',
            boxShadow: '0 6px 20px rgba(93,63,211,0.35)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderColor: '#5D3FD3',
          color: '#5D3FD3',
          borderWidth: '2px',
          '&:hover': {
            background: 'rgba(93,63,211,0.04)',
            borderColor: '#8B6BFF',
            color: '#8B6BFF',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(93,63,211,0.08)',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255,255,255,0.9)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '8px',
        },
        colorSecondary: {
          background: 'linear-gradient(135deg, #FF6B35 0%, #FF9166 100%)',
          color: '#fff',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        body: {
          background: 'linear-gradient(135deg, #F7F8FC 0%, #ECEEFF 100%)',
        },
        ':root': {
          '--swiper-theme-color': '#5D3FD3',
        },
        '@import': [
          'url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap")',
        ],
      }} />
      <Router>
        <Navbar />
        <Container 
          maxWidth={false}
          disableGutters
          sx={{ 
            mt: 2,
            mb: 4,
            px: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 'calc(100vh - 100px)'
          }}
        >
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
