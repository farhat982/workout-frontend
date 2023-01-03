import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
	const { dispatch } = useWorkoutsContext();
	const { user } = useAuthContext();
	const [title, setTitle] = useState('');
	const [load, setLoad] = useState('');
	const [reps, setReps] = useState('');
	// eslint-disable-next-line
	const [error, setError] = useState(null);
	const [emptyFields, setEmptyFields] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!user) {
			setError('You must be logged in ');
			return;
		}
		const workout = { title, load, reps };

		const response = await fetch(
			'https://workout-api-server.onrender.com/api/workouts',
			{
				method: 'POST',
				body: JSON.stringify(workout),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			}
		);
		const json = await response.json();
		if (!response.ok) {
			setError(json.error);
			setEmptyFields(json.emptyFields);
		}
		if (response.ok) {
			setTitle('');
			setLoad('');
			setReps('');
			setError(null);
			setEmptyFields([]);
			console.log('new workout added', json);
			dispatch({ type: 'CREATE_WORKOUT', payload: json });
		}
	};
	return (
		<div>
			<form
				action=''
				className='create'
				onSubmit={handleSubmit}
			>
				<h3>Add a New Workout</h3>
				<input
					type='text'
					placeholder='Excersize Title'
					name='title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className={emptyFields.includes('title') ? 'error' : ''}
				/>
				<input
					type='number'
					placeholder='Load (kg)'
					name='load'
					value={load}
					onChange={(e) => setLoad(e.target.value)}
					className={emptyFields.includes('load') ? 'error' : ''}
				/>
				<input
					type='number'
					placeholder='Excersize Reps'
					name='reps'
					value={reps}
					onChange={(e) => setReps(e.target.value)}
					className={emptyFields.includes('reps') ? 'error' : ''}
				/>
				<button>Add Workout</button>
			</form>
		</div>
	);
};

export default WorkoutForm;
