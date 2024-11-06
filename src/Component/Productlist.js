import React from "react";
import { Card, CardContent, CardActions, Typography, Button, Grid } from "@mui/material";

function ProductList({ products, cart, addToCart }) {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{product.name}</Typography>
                                <Typography color="textSecondary">Price: ${product.price}</Typography>
                                <Typography color="textSecondary">Quantity: {cart.find((item) => item.id === product.id)?.quantity ?? 0}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => addToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default ProductList;
