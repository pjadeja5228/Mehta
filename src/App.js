import React, { useState } from "react";
import { Container, Typography, Box, Grid, Button, Stack } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Badge from '@mui/material/Badge';
import ProductList from "./Component/Productlist";
import ShoppingCart from "./Component/ShoppingCart";

const productsData = [
  { id: 1, name: "Product A", price: 50 },
  { id: 2, name: "Product B", price: 30 },
  { id: 3, name: "Product C", price: 20 },
];

function App() {
  const [Showcart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId ? { ...product, quantity: quantity } : product
      )
    );
  };

  return (
    <Container maxWidth="md">
      <Box textAlign="center" my={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            {Showcart && <ArrowBackIcon onClick={() => setShowCart(prev => !prev)} />}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h3">Simple E-commerce</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {!Showcart &&
              <Badge color="secondary" badgeContent={cart.length}>
                <ShoppingCartIcon onClick={() => setShowCart(prev => !prev)} />
              </Badge>
            }
          </Grid>
        </Grid>
      </Box>
      {Showcart ?
        <ShoppingCart  cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
        :
        <ProductList products={productsData} cart={cart} addToCart={addToCart} />
      }
      {cart.length > 0 && !Showcart &&
        <Box textAlign="center" my={4}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={() => setShowCart(prev => !prev)}>Go To Cart</Button>
            <Button variant="outlined" onClick={() => setCart([])}>Clear Cart</Button>
          </Stack>
        </Box>
      }
    </Container>
  );
}

export default App;
