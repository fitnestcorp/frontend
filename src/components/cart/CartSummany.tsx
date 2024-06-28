import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, CircularProgress, Alert, IconButton, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCart } from '@/store';
import PreOrder from './PreOrder';
import { Address } from '@/interfaces/Address';
import { ShoppingCartItem } from '@/interfaces/ShoppingCartItem';
import { Close as CloseIcon } from '@mui/icons-material';
import { useGetShoppingCartByUserIdQuery, useRefreshItemsMutation, useBuyShoppingCartMutation } from '@/store';

interface CartSummaryProps {
  userId: string;
  address: Address;
  onClose: () => void;
}

/**
 * CartSummary component displays a summary of the user's shopping cart,
 * including the items, shipping address, and total cost.
 * Allows the user to refresh the cart and complete the purchase.
 *
 * @component
 * @param {CartSummaryProps} props - The properties object.
 * @param {string} props.userId - The ID of the user.
 * @param {Address} props.address - The address for shipping.
 * @param {() => void} props.onClose - Function to handle closing the summary.
 * @returns {JSX.Element} The CartSummary component.
 */
const CartSummary: React.FC<CartSummaryProps> = ({ userId, address, onClose }) => {
  const dispatch = useDispatch();
  const [refreshItems, { error: refreshError }] = useRefreshItemsMutation();
  const [buyShoppingCart, { isLoading: isBuying, error: buyError }] = useBuyShoppingCartMutation();
  const { data: shoppingCart, refetch, isLoading: isFetching } = useGetShoppingCartByUserIdQuery(userId);
  const [items, setItems] = useState<ShoppingCartItem[]>([]);
  const [subTotal, setSubTotalState] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const refreshCart = async () => {
      try {
        setError(null);
        await refreshItems(userId).unwrap();
        refetch();
      } catch (err) {
        console.error('Failed to refresh cart:', err);
        setError('Failed to refresh cart. Please try again later.');
      }
    };
    refreshCart();
  }, [userId, refreshItems, refetch]);

  useEffect(() => {
    if (shoppingCart) {
      setItems(shoppingCart.items);
      setSubTotalState(shoppingCart.sub_total);
      setItems(shoppingCart.items);
      dispatch(setCart({ items: shoppingCart.items }));
    }
  }, [shoppingCart, dispatch]);

  /**
   * Handles the purchase process by calling the buyShoppingCart mutation and
   * opening a new window with the payment redirection HTML.
   */
  const handlePurchase = async () => {
    try {
      const htmlResponse = await buyShoppingCart({ userId, addressId: address.id }).unwrap();
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(htmlResponse);
        newWindow.document.close();
      } else {
        console.error("Failed to open new window for payment redirection.");
      }
      onClose();
    } catch (error) {
      console.error('Failed to complete purchase:', error);
      setError('Failed to complete purchase. Please try again later.');
    }
  };

  /**
   * Extracts an error message from the provided error object.
   * @param {any} error - The error object.
   * @returns {string} The error message.
   */
  const getErrorMessage = (error: any): string => {
    if (error?.status) {
      return `Error ${error.status}: ${error.data || 'Unknown error'}`;
    }
    if (error?.message) {
      return error.message;
    }
    return 'An unexpected error occurred.';
  };

  if (isFetching) {
    return <CircularProgress />;
  }

  if (error || buyError || refreshError) {
    return <Alert severity="error">{getErrorMessage(error || refreshError || buyError)}</Alert>;
  }

  if (!items || items.length === 0) {
    return <Typography variant="h6">Your cart is empty.</Typography>;
  }

  /**
   * Formats a city name to have the first letter capitalized and the rest in lowercase.
   * @param {string} name - The name of the city.
   * @returns {string} The formatted city name.
   */
  const formatCityName = (name: string) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box sx={{ maxHeight: '80vh', overflowY: 'auto', width: '100%', position: 'relative' }}>
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
        <CloseIcon />
      </IconButton>
      <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 2, width: '100%', p: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#282828', mb: 2 }}>Resumen de compra</Typography>
        <PreOrder items={items} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: '#4C4C4C' }}>
            <strong>Dirección de envío:</strong> {address.address}
          </Typography>
          <Typography variant="h6" sx={{ color: '#4C4C4C' }}>
            <strong>Número de contacto:</strong> {address.phone_number}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#282828' }}>Total:</Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4C4C4C' }}>${total.toLocaleString()}</Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }}
          onClick={handlePurchase}
          disabled={isBuying}
        >
          {isBuying ? <CircularProgress size={24} /> : 'Realizar compra'}
        </Button>
      </Box>
    </Box>
  );
};

export default CartSummary;
