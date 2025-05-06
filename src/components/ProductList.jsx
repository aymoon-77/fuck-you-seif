import { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, CircularProgress, Box, TextField, InputAdornment, Chip } from '@mui/material';
import { Search, Star } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products from DummyJSON API
        const response = await axios.get('https://dummyjson.com/products?limit=100');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
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
        Trending Products
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            maxWidth: '600px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: 'background.paper',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {filteredProducts.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary">
          No products found matching your search
        </Typography>
      ) : (
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }} 
          justifyContent="center"
          sx={{ width: '100%', margin: 0 }}
        >
          {filteredProducts.map((product) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              lg={3} 
              xl={2} 
              key={product.id}
              sx={{ display: 'flex' }}
            >
              <Card sx={{ 
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                flex: 1,
                overflow: 'hidden',
                position: 'relative'
              }}>
                {product.discountPercentage > 0 && (
                  <Chip 
                    label={`${Math.round(product.discountPercentage)}% OFF`} 
                    color="secondary" 
                    size="small"
                    sx={{ 
                      position: 'absolute', 
                      top: 10, 
                      right: 10, 
                      zIndex: 1,
                      fontWeight: 'bold'
                    }}
                  />
                )}
                <CardMedia
                  component="img"
                  height="220"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{ 
                    objectFit: 'cover', 
                    backgroundColor: '#f0f2f5',
                    transition: 'transform 0.4s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.08)',
                    }
                  }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', pt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
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
                      <Star sx={{ color: '#FFB400', fontSize: '1rem', mr: 0.5 }} />
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {product.rating}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                      mt: 1,
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: 1.3,
                      height: '2.6em',
                      fontWeight: 600
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
                    {product.brand}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography 
                      variant="h5" 
                      color="primary" 
                      sx={{ 
                        fontWeight: 'bold'
                      }}
                    >
                      ${product.price}
                    </Typography>
                    {product.discountPercentage > 0 && (
                      <Typography 
                        variant="body2" 
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
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    size="large" 
                    component={Link} 
                    to={`/product/${product.id}`}
                    variant="outlined"
                    fullWidth
                    sx={{ mr: 1 }}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="large" 
                    onClick={() => addToCart(product)}
                    variant="contained"
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductList; 