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
			primary: '#ffffff', // White text color
			secondary: '#000000', // Black text color
		},
		background: {
			default: '#111111', // Dark background color
			paper: '#ffffff', // White paper background
		},
	},
	typography: {
		// h1: {
		// 	fontSize: '3rem',
		// 	fontWeight: 700,
		// 	color: '#ffffff', // White color for h1
		// },
		// h2: {
		// 	fontSize: '2rem',
		// 	fontWeight: 700,
		// 	color: '#000000', // Black color for h2
		// },
		// body1: {
		// 	fontSize: '1rem',
		// 	color: '#000000', // Black color for body text
		// },
		// button: {
		// 	textTransform: 'none',
		// 	fontWeight: 700,
		// 	color: '#ffffff', // White color for buttons
		// },
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					backgroundColor: '#000000',
					color: '#ffffff',
					'&:hover': {
						backgroundColor: '#333333',
					},
				},
			},
		},
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
					'& .MuiInputLabel-root.Mui-focused': {
						color: '#000000',
					},
					'& .MuiInputBase-input': {
						color: '#000000',
					},
					'& .MuiInputBase-root': {
						// backgroundColor: '#ffffff',
					},
					// withour border
					// '& .MuiOutlinedInput-notchedOutline': {
					// 	border: 'none',
					// },
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: '#000000',
					color: '#ffffff',
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: '#ffffff',
					color: '#000000',
				},
			},
		},
	},
});

export default theme;
