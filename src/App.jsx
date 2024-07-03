import './App.css';
import Router from './routes/Router';
import React from 'react';

function App() {
	const userInfo = true;

	return (
		<>
			<Router userInfo={userInfo} />
		</>
	);
}

export default App;
