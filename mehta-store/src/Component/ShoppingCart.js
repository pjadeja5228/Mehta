import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function ShoppingCart({ cart, removeFromCart, updateQuantity }) {
  const [open, setOpen] = React.useState(false);
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuantityChange = (productId, delta) => {
    const newQuantity = cart.find(item => item.id === productId).quantity + delta;
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography color="textSecondary">The cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cart.map((product) => (
              <ListItem key={product.id}>
                <ListItemText
                  primary={product.name}
                  secondary={`Price: $${product.price} | Quantity: ${product.quantity}`}
                />
                <IconButton onClick={() => handleQuantityChange(product.id, -1)} disabled={product.quantity === 1}>
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={() => handleQuantityChange(product.id, 1)}>
                  <AddIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => removeFromCart(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography variant="h6" align="right" mt={2}>
            Total: ${totalPrice}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpen}
            style={{ marginTop: "20px" }}
          >
            Done
          </Button>
        </>
      )}

      {/* Update Quantity Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Quantities</DialogTitle>
        <DialogContent>
          {cart.map((product) => (
            <div key={product.id} style={{ marginBottom: "10px" }}>
              <Typography variant="body1">{product.name}</Typography>
              <TextField
                type="number"
                label="Quantity"
                variant="outlined"
                size="small"
                value={product.quantity}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ShoppingCart;
