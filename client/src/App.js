import React, { useEffect, useReducer } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './interfaces/layout'
import Home from './interfaces/home'
import Contact from './interfaces/contact'
import Error from './interfaces/error'
import Login from './interfaces/login'
import Signup from './interfaces/signup'
import Preference from './interfaces/preference'
import Quiz from './interfaces/quiz'

export const userStateProvider = React.createContext()

function reducer(state, action) {
	switch (action.type) {
		case 'name':
			return { ...state, 'name': action.value }
		case 'email':
			return { ...state, 'email': action.value }
		case 'login':
			return action.value
		case 'logout':
			return null
		default:
			return state
	}
}

function App() {
	const [userState, setUserState] = useReducer(reducer, null)

	useEffect(() => {
		window.addEventListener('load', async () => {
			const res = await fetch('https://quiz-app-ymde.onrender.com/api/verify', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const userObject = await res.json()
			const user = userObject.user;

			setUserState({ type: 'login', value: user })
		});
	}, [])

	return (
		<>
			<userStateProvider.Provider value={{ userState, setUserState }}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="/home" element={<Home />} />
							<Route path="login" element={<Login />} />
							<Route path="signup" element={<Signup />} />
							<Route path="preference" element={<Preference />} />
							<Route path="quiz" element={<Quiz />} />
							<Route path="contact" element={<Contact />} />
							<Route path="*" element={<Error />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</userStateProvider.Provider>
		</>
	)
}

export default App