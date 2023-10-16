'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default () => {
	const router = useRouter();

	const [user, setUser] = React.useState({
		email: '',
		password: '',
		username: '',
	});
	const [buttonDisabled, setButtonDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);

	useEffect(() => {
		if (user.email && user.password && user.username) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	const onSignup = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			setLoading(true);
			const response = await axios.post('/api/users/signup', user);
			console.log(response.data, 'Signup response');
			router.push("/login");
		} catch (error: any) {
			console.log(error, 'Signup error');
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col items-center justify-start bg-yellow-500 h-screen pt-24 text-black'>
			<h1 className='text-2xl font-bold mb-6'>{ loading ? 'Creating your account...' : 'Welcome from Next project' }</h1>
			<form onSubmit={onSignup} className='flex flex-col items-center'>
				<label htmlFor="username" className='mr-auto pb-1'>Username</label>
				<input id='username'placeholder='Enter username' type='text' value={user.username} className='mb-2 rounded-sm px-2 py-1' onChange={e => setUser({...user, username: e.target.value})}/>
				<label htmlFor="email" className='mr-auto pb-1'>Email</label>
				<input id='email' placeholder='Enter email' type='email' value={user.email} className='mb-2 rounded-sm px-2 py-1' onChange={e => setUser({...user, email: e.target.value})}/>
				<label htmlFor="password" className='mr-auto pb-1'>Password</label>
				<input id='password' placeholder='Enter password' type='password' value={user.password} className='mb-2 rounded-sm px-2 py-1' onChange={e => setUser({...user, password: e.target.value})}/>
				<button type='submit' className='p-2 bg-sky-950 text-slate-300 rounded-md mt-4'>{buttonDisabled ? 'Not yet' : 'Signup'}</button>
			</form>
			<Link href='/login' className='text-indigo-950 mt-4'>
				Already have an account? Log in here
			</Link>
		</div>
	);
};
