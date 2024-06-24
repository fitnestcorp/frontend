'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

export const isAdmin = (Component: any) => {
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
