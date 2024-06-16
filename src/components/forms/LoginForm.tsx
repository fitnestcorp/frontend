// // imports for the Form
// // import { zodResolver } from '@hookform/resolvers/zod'
// // import { useForm } from 'react-hook-form'
// // import { z } from 'zod'
// // import { loginFormSchema } from '@/schemas/loginformschema'

// // imports for the Redux and token
// // import { useLoginUserMutation, useFindByEmailQuery } from '@/store/services/userApi'
// // import Cookies from 'js-cookie'
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// // import { useDispatch } from 'react-redux'
// // import { setUser, setToken } from '@/store/slices/userSlice'

// export default function LoginForm() {
// 	// Form Hook
// 	// const form = useForm<z.infer<typeof loginFormSchema>>({
// 	//     resolver: zodResolver(loginFormSchema),
// 	//     defaultValues: {
// 	//         email:"",
// 	//         password:"",
// 	//     },
// 	// })

// 	// Redux LoginUser Mutation
// 	// const [loginUser, { data, error }] = useLoginUserMutation()
// 	// const dispatch = useDispatch()

// 	// Redux FetchUserByEmail Query
// 	const [userEmail, setUserEmail] = useState('');
// 	// const { data: userData, error: userError } = useFindByEmailQuery(userEmail, { skip: userEmail === '' })

// 	// Variables
// 	const [errorState, setErrorState] = useState('');
// 	const router = useRouter();

// 	// useEffect - Redirect
// 	// useEffect(()=>{
// 	//     if(userData){
// 	//         dispatch(setUser({ user: {
// 	//             id: userData.id, email: userData.email, image: userData.image
// 	//         }, role: userData.role }))
// 	//         dispatch(setToken(Cookies.get('token') || null))
// 	//         router.push('/')
// 	//     } else if(userError){
// 	//         console.log(userError)
// 	//     }
// 	// }, [userData, userError, dispatch, router])

// 	// OnSubmit Function - Login User
// 	// async function onSubmit(formdata: z.infer<typeof loginFormSchema>) {
// 	//     try {
// 	//         const loginResponse = await loginUser(formdata).unwrap();
// 	//         setErrorState('');
// 	//         Cookies.set('token', loginResponse.access_token);
// 	//         setUserEmail(formdata.email);
// 	//     } catch (error: any) {
// 	//         if (typeof error.status === 'number') {
// 	//             if (error.status === 401) {
// 	//                 setErrorState('Invalid Credentials');
// 	//             } else {
// 	//                 setErrorState('The user does not exist');
// 	//             }
// 	//         } else {
// 	//             setErrorState('An unknown error occurred');
// 	//         }
// 	//     }
// 	// }

// 	return (
// 		<div>
// 			<form
// 				onSubmit={(e) => {}}
// 				className="w-full space-y-4 py-4 px-2 flex flex-col items-center"
// 			>
// 				<div className="flex flex-col w-1/2">
// 					<input name="email" type="text" />
// 				</div>
// 				<div className="flex justify-center w-1/6">
// 					<button
// 						type="submit"
// 						className={
// 							'w-full bg-one text-four font-semibold hover:bg-five hover:text-one hover:border-one hover:border-2'
// 						}
// 					>
// 						Iniciar Sesión
// 					</button>
// 				</div>
// 			</form>
// 			{errorState != '' && (
// 				<div className="text-red-500 text-center font-bold mb-2">
// 					{errorState}
// 				</div>
// 			)}
// 		</div>
// 	);
// }
