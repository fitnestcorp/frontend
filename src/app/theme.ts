import { createTheme } from '@mui/material/styles';
import { text } from 'stream/consumers';

const theme = createTheme({
	palette: {
		primary: {
			main: '#000000', // Black for primary color
		},
		secondary: {
			main: '#ffffff', // White for secondary color
		},
		text: {
			primary: '#000000', // Black text color
			secondary: '#ffffff', // White text color
		},
		background: {
			default: '#111111', // Dark background color
			paper: '#ffffff', // White paper background
		},
	},
	typography: {
		// Kanit Font for everything
		fontFamily: ['Kanit', 'sans-serif'].join(','),
	},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: '#000000',
						},
						'&:hover fieldset': {
							borderColor: '#333333',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#000000',
						},
					},
					// '& .MuiInputLabel-root.Mui-focused': {
					// 	color: '#000000',
					// },
					// '& .MuiInputBase-input': {
					// 	color: '#000000',
					// },
				},
			},
		},
	},
});

export default theme;
