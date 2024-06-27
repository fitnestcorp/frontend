'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

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
