'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconButton, Box, Typography, Paper, CircularProgress } from '@mui/material';
import { Remove as RemoveIcon, Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { ShoppingCartItem } from '@/interfaces/ShoppingCartItem';
import { RootState, useRemoveItemMutation, useUpdateShoppingCartMutation } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem as removeItemFromState, updateItem as updateItemInState } from '@/store/slices/cartSlice';

interface Props {
    cartItem: ShoppingCartItem;
}

/**
 * CartItem component represents a single item in the shopping cart,
 * allowing the user to adjust the quantity or remove the item.
 *
 * @component
 * @param {Props} props - The properties object.
 * @param {ShoppingCartItem} props.cartItem - The cart item to be displayed.
 * @returns {JSX.Element} The CartItem component.
 */
export const CartItem = ({ cartItem }: Props) => {
    const { quantity, price, product } = cartItem;
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();
    const [removeItem, { isLoading: isRemoving }] = useRemoveItemMutation();
    const [updateShoppingCart, { isLoading: isUpdating }] = useUpdateShoppingCartMutation();
    const [quantityShopin, setQuantityShopin] = useState<number>(quantity);

    /**
     * Handles the removal of the item from the cart.
     */
    const handleRemoveItem = async () => {
        if (user && product) {
            await removeItem({ userId: user.id, productId: product.id });
            dispatch(removeItemFromState({ id: cartItem.id }));
        }
    };

    /**
     * Handles updating the quantity of the item in the cart.
     * 
     * @param {'add' | 'remove'} operation - The operation to perform (add or remove).
     */
    const handleUpdateQuantity = async (operation: 'add' | 'remove') => {
        if (user && product) {
            await updateShoppingCart({
                userId: user.id,
                updateShoppingCartDto: {
                    productIds: [product.id],
                    operation
                }
            }).unwrap();

            if (operation === 'add') {
                setQuantityShopin(quantityShopin + 1);
                dispatch(updateItemInState({ id: cartItem.id, quantity: quantityShopin + 1 }));
            } else if (operation === 'remove' && quantityShopin > 1) {
                setQuantityShopin(quantityShopin - 1);
                dispatch(updateItemInState({ id: cartItem.id, quantity: quantityShopin - 1 }));
            } else if (operation === 'remove' && quantityShopin === 1) {
                handleRemoveItem();
            }
        }
    };

    /**
     * Increases the quantity of the item in the cart.
     */
    const increaseQuantity = () => {
        handleUpdateQuantity('add');
    };

    /**
     * Decreases the quantity of the item in the cart.
     */
    const decreaseQuantity = () => {
        handleUpdateQuantity('remove');
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                mb: 2,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Link href={`/producto/${cartItem.product.id}`} passHref>
                    <Image
                        src={product.image_urls[0]}
                        alt={product.name}
                        width={100}
                        height={100}
                        style={{ borderRadius: '8px' }}
                    />
                </Link>
                <Box sx={{ flexGrow: 1, ml: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', color: 'text.primary' }}
                    >
                    {product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        {product.type}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 2,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                onClick={decreaseQuantity}
                                disabled={isUpdating}
                                sx={{
                                    backgroundColor: 'gray',
                                    color: 'white',
                                    width: 25,
                                    height: 25,
                                    '&:hover': { backgroundColor: 'darkgray' },
                                }}
                            >
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography
                                variant="body2"
                                color="text.primary"
                                sx={{ mx: 2 }}
                            >
                                {quantityShopin}
                            </Typography>
                            <IconButton
                                size="small"
                                onClick={increaseQuantity}
                                disabled={isUpdating}
                                sx={{
                                    backgroundColor: 'gray',
                                    color: 'white',
                                    width: 25,
                                    height: 25,
                                    '&:hover': { backgroundColor: 'darkgray' },
                                }}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {"$"+price.toLocaleString()}
                        </Typography>
                    </Box>
                </Box>
                <IconButton
                    onClick={handleRemoveItem}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'gray',
                    }}
                >
                    {isRemoving ? <CircularProgress size={20} /> : <CloseIcon />}
                </IconButton>
            </Box>
        </Paper>
    );
};
