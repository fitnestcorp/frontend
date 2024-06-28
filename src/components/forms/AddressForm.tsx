'use client'
import { useEffect, useState } from 'react';
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
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { City } from '@/interfaces/City';
import { Department } from '@/interfaces/Department';
import { useCreateAddressMutation } from '@/store';
import { Address } from '@/interfaces/Address';
import CartSummary from '../cart/CartSummany';

/**
 * Props for the AddressForm component.
 * 
 * @typedef {Object} AddressFormProps
 * @property {boolean} isOpen - Indicates if the modal is open.
 * @property {() => void} onClose - Function to close the modal.
 * @property {Address[]} [registeredAddresses] - List of registered addresses.
 * @property {Department[]} [departments] - List of departments.
 * @property {string} userId - ID of the user.
 */
interface AddressFormProps {
  isOpen: boolean;
  onClose: () => void;
  registeredAddresses?: Address[];
  departments?: Department[];
  userId: string;
}


/**
 * AddressForm component for creating and selecting addresses.
 * 
 * @param {AddressFormProps} props - Component props.
 * @returns {JSX.Element} The rendered AddressForm component.
 */
export const AddressForm = ({
  isOpen,
  onClose,
  registeredAddresses = [],
  departments = [],
  userId
}: AddressFormProps) => {
  const [addressForm, setAddressForm] = useState({
    phone_number: '',
    address: '',
    zip_code: '',
    city_name: '',
  });
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const [address, setAddress] = useState<Address | null>(null);
  const [createAddress, { isLoading, error }] = useCreateAddressMutation();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isCartSummaryOpen, setIsCartSummaryOpen] = useState(false);

  useEffect(() => {
    if (selectedDepartment) {
      const department = departments.find((dep) => dep.name === selectedDepartment);
      setFilteredCities(department ? department.city : []);
    } else {
      setFilteredCities([]);
    }
  }, [selectedDepartment, departments]);

  useEffect(() => {
    const { phone_number, address, zip_code, city_name } = addressForm;
    setIsFormValid(
      phone_number.trim() !== '' &&
        address.trim() !== '' &&
        zip_code.trim() !== '' &&
        city_name.trim() !== ''
    );
  }, [addressForm]);

  /**
   * Handles changes in the address form inputs.
   * 
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>} e - The change event.
   */
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>
  ) => {
    setAddressForm({ ...addressForm, [e.target.name as string]: e.target.value as string });
   
  };

  /**
   * Handles closing the cart summary modal.
   */
  const handleClose = () => {
    setIsCartSummaryOpen(false);
  };

  /**
   * Handles submitting the address creation form.
   * 
   * @param {React.FormEvent} e - The form submit event.
   */
  const handleAddressCreationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
      const result = await createAddress({ address: addressForm, userId }).unwrap();
      setShowAddressForm(false);
      onClose();
      setAddress(result);
      setIsCartSummaryOpen(true);
    } catch (error) {
      console.error('Failed to create address:', error);
    }
  };

  /**
   * Handles submitting the selected address form.
   * 
   * @param {React.FormEvent} e - The form submit event.
   */
  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAddr = registeredAddresses.find((add) => add.id === selectedAddress);
    if (selectedAddr) {
      setShowAddressForm(false);
      setAddress(selectedAddr);
      setIsCartSummaryOpen(true);
      onClose();
    } else {
      console.error('Selected address not found');
    }
  };

  return (
    <>
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
                <Link component="button" variant="body2" onClick={() => setShowAddressForm(true)}>
                  Crea una nueva dirección
                </Link>
              </Box>
              <Button
                type="button"
                variant="contained"
                fullWidth
                disabled={!selectedAddress}
                onClick={handleAddressSubmit}
                sx={{
                  backgroundColor: 'black',
                  color: 'text.secondary',
                  borderRadius: '0.5rem',
                  paddingY: '0.5rem',
                  '&:hover': { backgroundColor: '#333' },
                  mt: 2,
                }}
              >
                Seleccionar Dirección
              </Button>
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
              <Box component="form" onSubmit={handleAddressCreationSubmit} sx={{ mt: 2 }}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Departamento</InputLabel>
                  <Select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value as string)}
                    label="Departamento"
                  >
                    {departments.map((department) => (
                      <MenuItem key={department.name} value={department.name}>
                        {department.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                <InputLabel>Ciudad</InputLabel>
                <Select
                  value={addressForm.city_name}
                  onChange={(e) => {
                    const selectedCity = e.target.value;
                    setAddressForm({ ...addressForm, city_name: selectedCity });
                  }}
                  label="Ciudad"
                  disabled={!selectedDepartment}
                >
                  {filteredCities.map((city) => (
                    <MenuItem key={city.name} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#C4C4C4',
                      },
                      '&:hover fieldset': {
                        borderColor: '#C4C4C4',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#C4C4C4',
                      },
                    },
                  }}
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#C4C4C4',
                      },
                      '&:hover fieldset': {
                        borderColor: '#C4C4C4',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#C4C4C4',
                      },
                    },
                  }}
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#C4C4C4',
                      },
                      '&:hover fieldset': {
                        borderColor: '#C4C4C4',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#C4C4C4',
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!isFormValid || isLoading}
                  sx={{
                    backgroundColor: 'black',
                    color: 'text.secondary',
                    borderRadius: '0.5rem',
                    paddingY: '0.5rem',
                    '&:hover': { backgroundColor: '#333' },
                    mt: 2,
                  }}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Crear Dirección'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
      {address && (
        <Modal open={isCartSummaryOpen} onClose={() => setIsCartSummaryOpen(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              
              width: '60%',
              bgcolor: 'background.paper',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              p: 4,
              pt: 6,
            }}
          >
            <CartSummary userId={userId} address={address} onClose={handleClose} />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default AddressForm;
