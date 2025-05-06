import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, Typography, Button, Box, CircularProgress, Paper, Chip, Rating, Divider, IconButton } from '@mui/material';
import { ArrowBack, ShoppingCart, Star } from '@mui/icons-material';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
        <Typography variant="h5" align="center">
          Product not found
        </Typography>
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
            Back to Products
          </Typography>
        </Box>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 2, sm: 4 }, 
            borderRadius: 3, 
            width: '100%',
            boxShadow: '0 8px 40px rgba(0,0,0,0.08)'
          }}
        >
          <Grid container spacing={{ xs: 3, md: 6 }} alignItems="flex-start">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                {product.discountPercentage > 0 && (
                  <Chip 
                    label={`${Math.round(product.discountPercentage)}% OFF`} 
                    color="secondary" 
                    sx={{ 
                      position: 'absolute', 
                      top: 16, 
                      right: 16, 
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      py: 0.5
                    }}
                  />
                )}
                <Box
                  component="img"
                  src={product.thumbnail}
                  alt={product.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '500px',
                    objectFit: 'contain',
                    backgroundColor: '#f8f9fa',
                    p: 4,
                    borderRadius: 2,
                    mb: 2
                  }}
                />
                <Grid container spacing={1}>
                  {product.images && product.images.slice(0, 4).map((image, index) => (
                    <Grid item xs={3} key={index}>
                      <Box
                        component="img"
                        src={image}
                        alt={`${product.title} - image ${index + 1}`}
                        sx={{
                          width: '100%',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: 1,
                          cursor: 'pointer',
                          border: '2px solid transparent',
                          '&:hover': {
                            borderColor: 'primary.main',
                          }
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Chip 
                    label={product.category} 
                    size="small" 
                    sx={{ 
                      backgroundColor: 'rgba(25, 118, 210, 0.1)', 
                      color: 'primary.main',
                      fontWeight: 500,
                      textTransform: 'capitalize'
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating 
                      value={product.rating} 
                      precision={0.1} 
                      readOnly 
                      size="small"
                      emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <Typography variant="body2" sx={{ ml: 1, fontWeight: 'medium' }}>
                      ({product.rating})
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mt: 1 }}>
                  {product.title}
                </Typography>
                
                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                  {product.brand}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 3 }}>
                  <Typography 
                    variant="h3" 
                    color="primary" 
                    sx={{ fontWeight: 'bold' }}
                  >
                    ${product.price}
                  </Typography>
                  {product.discountPercentage > 0 && (
                    <Typography 
                      variant="h6" 
                      color="text.secondary" 
                      sx={{ 
                        textDecoration: 'line-through',
                        fontWeight: 500
                      }}
                    >
                      ${Math.round(product.price / (1 - product.discountPercentage / 100))}
                    </Typography>
                  )}
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography 
                  variant="body1" 
                  paragraph 
                  sx={{ 
                    mb: 3,
                    lineHeight: 1.8,
                    color: 'text.secondary'
                  }}
                >
                  {product.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    Stock: <strong>{product.stock}</strong>
                  </Typography>
                </Box>
                
                <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => addToCart(product)}
                    startIcon={<ShoppingCart />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontSize: '1rem',
                      flex: 1
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProductDetail;