import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Box, Container } from '@mui/material';
import { ShoppingCart, StorefrontOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useCart();

  return (
    <AppBar position="sticky" color="default">
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <StorefrontOutlined sx={{ color: 'primary.main', mr: 1, fontSize: '2rem' }} />
            <Typography 
              variant="h5" 
              component={Link} 
              to="/" 
              sx={{ 
                textDecoration: 'none', 
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: '0.5px'
              }}
            >
              ShopWave
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              component={Link} 
              to="/"
              sx={{ 
                color: 'text.primary', 
                fontWeight: 600,
                mx: 1,
                '&:hover': {
                  color: 'primary.main',
                  background: 'rgba(93, 63, 211, 0.04)'
                }
              }}
            >
              Products
            </Button>
            
            <IconButton 
              component={Link} 
              to="/cart"
              sx={{ 
                ml: 1,
                color: 'text.primary',
                '&:hover': {
                  color: 'primary.main',
                  background: 'rgba(93, 63, 211, 0.04)'
                }
              }}
            >
              <Badge 
                badgeContent={cartItems.length} 
                color="secondary"
                sx={{ 
                  '& .MuiBadge-badge': {
                    fontWeight: 'bold',
                    fontSize: '0.7rem'
                  }
                }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;