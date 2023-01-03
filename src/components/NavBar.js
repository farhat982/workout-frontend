import React from 'react';
import { useLogout } from '../hooks/useLogout';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const NavBar = () => {
	const { logout } = useLogout();
	const { user } = useAuthContext();
	const handleClick = () => {
		logout();
	};
	return (
		<header>
			<div className='container'>
				<Link to='/'>Workout Buddy</Link>
				<nav>
					{user && (
						<div>
							<span>{user.email}</span>
							<button onClick={handleClick}>Logout</button>
						</div>
					)}
					{!user && (
						<div>
							<Link to='/login'>Login</Link>
							<Link to='/signup'>Signup</Link>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
};

export default NavBar;
