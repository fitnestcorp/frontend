'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

/**
 * Higher-Order Component (HOC) that checks if the user is authenticated.
 * If the user is not authenticated, it redirects them to the home page.
 *
 * @param {React.ComponentType} Component - The component to be wrapped by the HOC.
 * @returns {React.ComponentType} The wrapped component with authentication check.
 */
export const isAuth = (Component: React.ComponentType) => {
	return function IsAuth(props: any) {
		const user = useSelector((state: RootState) => state.user.user);

		useEffect(() => {
			if (!user) {
				return redirect('/');
			}
		}, []);

		if (!user) {
			return null;
		}

		return <Component {...props} />;
	};
};
