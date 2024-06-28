'use client';
import {
  Box,
  Button,
  Grid,
  Rating,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Skeleton,
  Modal,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AddShoppingCart } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { setCart, addItem } from '@/store/slices/cartSlice';
import { useGetShoppingCartByUserIdQuery, useUpdateShoppingCartMutation } from '@/store/services/shoppingCartApi';
import { Product } from '@/interfaces';
import { useState, useEffect } from 'react';

interface Props {
  /**
   * The product details to be displayed.
   */
  product: Product;
  /**
   * Boolean indicating whether the product details are still loading.
   */
  isLoading?: boolean;
}

/**
 * ProductDetails component.
 * Displays the details of a product and allows adding it to the shopping cart.
 *
 * @param {Props} props - The properties for the component.
 * @returns {JSX.Element} The ProductDetails component.
 */
export const ProductDetails = ({ product, isLoading }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const userId = user?.id ?? ''; 
  const { data: shoppingCart, refetch } = useGetShoppingCartByUserIdQuery(userId, { skip: !user });
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (shoppingCart) {
      dispatch(setCart({ items: shoppingCart.items }));
    }
  }, [shoppingCart, dispatch]);

  if (isLoading) {
    return (
      <Grid container>
        <Grid item xs={12} md={6}>
          <Skeleton variant="text" width="80%" height={50} />
          <Skeleton variant="text" width="100%" height={150} />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Skeleton variant="rectangular" width={200} height={30} />
          </Box>
          <Skeleton variant="rectangular" width="100%" height={50} />
          <Skeleton variant="text" width="40%" height={30} />
          <Skeleton variant="rectangular" width="100%" height={50} />
        </Grid>
      </Grid>
    );
  }

  const { name, description, price, status, reviews, type } = product;

  /**
   * Formats a given value as a currency string in Colombian pesos.
   *
   * @param {number} value - The value to format.
   * @returns {string} The formatted currency string.
   */
  const formatCurrency = (value: number) => {
    const formattedValue = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

    return formattedValue.replace('COP', '').trim();
  };

  /**
   * Handles adding the product to the shopping cart.
   */
  const handleAddToCart = async () => {
    if (!user) {
      setIsLoginModalOpen(true); // Show login required modal
      return;
    }

    setIsAdding(true);

    try {
      if (shoppingCart) {
        const updatedCart = await updateShoppingCart({
          userId: user.id,
          updateShoppingCartDto: {
            productIds: [product.id],
            operation: 'add',
          },
        }).unwrap();

        dispatch(setCart({ items: updatedCart.items }));
        setIsModalOpen(true); // Open the modal
        refetch(); // Refetch the shopping cart to get the latest items
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        pt:11
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        {name}
      </Typography>
      <Typography variant="body1" color="text.primary" paragraph>
        {description}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Rating
          name="read-only"
          value={
            reviews.reduce((acc, review) => acc + review.score, 0) /
            (reviews.length || 1)
          }
          readOnly
          precision={0.5}
        />
        <Typography variant="body2" color="text.primary" sx={{ ml: 1 }}>
          {reviews.length} reseña(s)
        </Typography>
      </Box>
      <ToggleButtonGroup
  exclusive
  sx={{
    mb: 2,
    '& .MuiToggleButton-root': {
      borderRadius: '10px',
      textTransform: 'none',
      fontSize: '0.875rem',
      mx: 0.5,
      px: 1,
      backgroundColor: 'white',
      borderColor: 'gray',
      '&.Mui-selected': {
        backgroundColor: 'white',
        borderColor: 'gray', 
      },
      '&:hover': {
        backgroundColor: 'white', 
        borderColor: 'gray', 
      },
    },
  }}
>
  <ToggleButton value={type} size="small" selected>
    {type}
  </ToggleButton>
</ToggleButtonGroup>


      <Typography
        variant="h5"
        component="div"
        sx={{ fontWeight: 'bold', mb: 1 }}
      >
        {formatCurrency(price)}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        disabled={status === 'Agotado' || isAdding}
        startIcon={isAdding ? <CircularProgress size={24} /> : <AddShoppingCart />}
        fullWidth
        sx={{ borderRadius: '8px', py: 1 }}
        onClick={handleAddToCart}
      >
        {status === 'Agotado' ? 'Agotado' : 'Agregar al carrito'}
      </Button>

      {/* Modal for adding to cart */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="cart-modal-title"
        aria-describedby="cart-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            borderRadius: '16px',
            p: 4,
            pt: 6, 
          }}
        >
          <IconButton
            onClick={() => setIsModalOpen(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="cart-modal-title" variant="h6" component="h2">
            Producto añadido al carrito
          </Typography>
          <Typography id="cart-modal-description" sx={{ mt: 2 }}>
            El producto {name} ha sido añadido a tu carrito.
          </Typography>
        </Box>
      </Modal>

      {/* Modal for login required */}
      <Modal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            borderRadius: '16px',
            p: 4,
            pt: 6, // Add padding top to make space for the close icon
          }}
        >
          <IconButton
            onClick={() => setIsLoginModalOpen(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="login-modal-title" variant="h6" component="h2">
            Inicio de sesión requerido
          </Typography>
          <Typography id="login-modal-description" sx={{ mt: 2 }}>
            Debes iniciar sesión para agregar productos al carrito.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};
