import { Typography, Grid, CardMedia, CardContent, IconButton, Box, Button, Paper, Divider, Chip } from '@mui/material';
import { Add, Remove, Delete, ShoppingBag, ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '70vh',
        width: '100%',
        textAlign: 'center',
        py: 8
      }}>
        <ShoppingBag sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.5, mb: 3 }} />
        <Typography variant="h4" gutterBottom sx={{ color: 'text.secondary', fontWeight: 600 }}>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Add some products to your cart to see them here
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/"
          startIcon={<ArrowBack />}
          sx={{ 
            py: 1.5, 
            px: 3,
            borderRadius: 2
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', py: 4 }}>
      <Box sx={{ width: '100%', px: { xs: 1, sm: 2, md: 4 }, maxWidth: '1200px', mx: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton 
            component={Link} 
            to="/"
            sx={{ 
              mr: 2,
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.15)' }
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Continue Shopping
          </Typography>
        </Box>
        
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            mb: 4, 
            textAlign: 'center',
            fontWeight: 700,
            color: 'primary.main',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              backgroundColor: 'secondary.main',
              borderRadius: '2px'
            }
          }}
        >
          Your Shopping Cart
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 2, sm: 3 }, 
                borderRadius: 3,
                boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
                mb: { xs: 3, md: 0 }
              }}
            >
              {cartItems.map((item, index) => (
                <Box key={item.id}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <CardMedia
                        component="img"
                        height="120"
                        image={item.thumbnail || item.image}
                        alt={item.title}
                        sx={{ 
                          objectFit: 'cover', 
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'divider'
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <CardContent sx={{ p: 0 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                              {item.title}
                            </Typography>
                            {item.brand && (
                              <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                                {item.brand}
                              </Typography>
                            )}
                            {item.discountPercentage > 0 && (
                              <Chip 
                                label={`${Math.round(item.discountPercentage)}% OFF`} 
                                color="secondary" 
                                size="small"
                                sx={{ mb: 1, fontWeight: 'bold' }}
                              />
                            )}
                          </Box>
                          <IconButton
                            color="error"
                            onClick={() => removeFromCart(item.id)}
                            sx={{ ml: 1 }}
                            size="small"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            backgroundColor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                            p: 0.5,
                            width: 'fit-content'
                          }}>
                            <IconButton
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              size="small"
                              sx={{ color: 'primary.main' }}
                            >
                              <Remove fontSize="small" />
                            </IconButton>
                            <Typography sx={{ mx: 2, minWidth: '1.5rem', textAlign: 'center', fontWeight: 'medium' }}>
                              {item.quantity}
                            </Typography>
                            <IconButton
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              size="small"
                              sx={{ color: 'primary.main' }}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </Typography>
                            {item.discountPercentage > 0 && (
                              <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                sx={{ 
                                  textDecoration: 'line-through',
                                  fontWeight: 500
                                }}
                              >
                                ${(Math.round(item.price / (1 - item.discountPercentage / 100)) * item.quantity).toFixed(2)}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Grid>
                  </Grid>
                  {index < cartItems.length - 1 && <Divider sx={{ my: 3 }} />}
                </Box>
              ))}
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
                position: { md: 'sticky' },
                top: { md: '20px' }
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Order Summary
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1">
                    Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    ${calculateTotal().toFixed(2)}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'success.main' }}>
                    Free
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Total
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                    ${calculateTotal().toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                  }
                }}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Cart;