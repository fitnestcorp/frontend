'use client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@/store';


/**
 * ReduxProvider component wraps the application with Redux store and PersistGate.
 * It ensures the Redux state is persisted across sessions.
 * 
 * @component
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The Redux provider component.
 */
export default function ReduxProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}
