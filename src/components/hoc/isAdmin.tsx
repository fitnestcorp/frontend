'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

/**
 * Higher-Order Component (HOC) that checks if the user is an admin.
 * If the user is not an admin, it redirects them to the home page.
 *
 * @param {React.ComponentType} Component - The component to be wrapped by the HOC.
 * @returns {React.ComponentType} The wrapped component with admin check.
 */
export const isAdmin = (Component: React.ComponentType) => {
	return function IsAdmin(props: any) {
		const role = useSelector((state: RootState) => state.user.user?.role);
		const admin = role === 'ADMIN';

		useEffect(() => {
			if (!admin) {
				return redirect('/');
			}
		}, []);

		if (!admin) {
			return null;
		}

		return <Component {...props} />;
	};
};
