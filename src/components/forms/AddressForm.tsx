'use client'
import { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Link,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { City } from '@/interfaces/City';
import { Department } from '@/interfaces/Department';

interface AddressFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (addressForm: {
    phone_number: string;
    address: string;
    zip_code: string;
    city_name: string;
  }) => void;
  registeredAddresses?: { id: string; address: string }[];
  cities?: City[];
  departments?: Department[];
}

export const AddressForm = ({
  isOpen,
  onClose,
  onSubmit,
  registeredAddresses = [],
  cities = [],
  departments = [],
}: AddressFormProps) => {
  const [addressForm, setAddressForm] = useState({
    phone_number: '',
    address: '',
    zip_code: '',
    city_name: '',
  });
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(addressForm);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="address-modal-title"
      aria-describedby="address-modal-description"
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
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        {!showAddressForm ? (
          <>
            <Typography id="address-modal-title" variant="h6" component="h2">
              Selecciona una de tus direcciones registradas
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Dirección</InputLabel>
              <Select
                color="secondary"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value as string)}
                label="Dirección"
                fullWidth
              >
                {registeredAddresses.map((address) => (
                  <MenuItem key={address.id} value={address.id}>
                    {address.address}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Link
                component="button"
                variant="body2"
                onClick={() => setShowAddressForm(true)}
              >
                Crea una nueva dirección
              </Link>
            </Box>
          </>
        ) : (
          <>
            <IconButton
              onClick={() => setShowAddressForm(false)}
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography id="address-modal-title" variant="h6" component="h2">
              Crear Dirección
            </Typography>
            <Box component="form" onSubmit={handleAddressSubmit} sx={{ mt: 2 }}>
              <TextField
                name="phone_number"
                label="Número de Teléfono"
                value={addressForm.phone_number}
                onChange={handleAddressChange}
                InputProps={{
                  style: { color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="address"
                label="Dirección"
                value={addressForm.address}
                onChange={handleAddressChange}
                InputProps={{
                  style: { color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="zip_code"
                label="Código Postal"
                value={addressForm.zip_code}
                onChange={handleAddressChange}
                InputProps={{
                  style: { color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="city_name"
                label="Ciudad"
                value={addressForm.city_name}
                onChange={handleAddressChange}
                InputProps={{
                  style: { color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
                fullWidth
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: 'black',
                  color: 'text.secondary',
                  borderRadius: '0.5rem',
                  paddingY: '0.5rem',
                  '&:hover': { backgroundColor: '#333' },
                  mt: 2,
                }}
              >
                Crear Dirección
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};
