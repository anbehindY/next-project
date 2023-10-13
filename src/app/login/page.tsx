'use client';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default () => {
	const [user, setUser] = React.useState({
		email: '',
		password: '',
	});

	const onLogin = async () => {};

	return (
		<div className='flex flex-col items-center justify-start bg-yellow-500 h-screen pt-24 text-black'>
			<h1 className='text-2xl font-bold mb-6'>Welcome from Next project</h1>
			<form onSubmit={onLogin} className='flex flex-col items-center'>
			<label htmlFor="email" className='mr-auto pb-1'>Email</label>
				<input id='email' placeholder='Enter email' type='email' value={user.email} className='mb-2 rounded-sm px-2 py-1' onChange={e => setUser({...user, email: e.target.value})}/>
				<label htmlFor="password" className='mr-auto pb-1'>Password</label>
				<input id='password' placeholder='Enter password' type='password' value={user.password} className='mb-2 rounded-sm px-2 py-1' onChange={e => setUser({...user, password: e.target.value})}/>
				<button type='submit' className='p-2 bg-sky-950 text-slate-300 rounded-md mt-4'>Login</button>
			</form>
      <Link href='/signup' className='text-indigo-950 mt-4'>
        Doesn't have an account? Sign up here
      </Link>
		</div>
	);
};
