import { createTheme } from '@mui/material/styles';
import { text } from 'stream/consumers';

export const theme = createTheme({
	palette: {
	  primary: {
		main: '#000000',
	  },
	  secondary: {
		main: '#ffffff', 
	  },
	  text: {
		primary: '#000000', 
		secondary: '#ffffff', 
	  },
	},
	typography: {
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
		  },
		},
	  },
	  MuiSelect: {
		styleOverrides: {
		  root: {
			color: '#000000', 
			'& .MuiSvgIcon-root': {
			  color: '#000000', 
			},
		  },
		},
	  },
	  MuiInputLabel: {
		styleOverrides: {
		  root: {
			color: '#000000', 
			'&.Mui-focused': {
			  color: '#000000', 
			},
		  },
		},
	  },
	  MuiMenuItem: {
		styleOverrides: {
		  root: {
			color: '#000000',
		  },
		},
	  },
	},
  });