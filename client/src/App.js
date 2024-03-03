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

export const initialUserState = {
	'isUserLoggedIn': false,
	'name': '',
	'email': '',
}

function reducer(state, action) {
	switch (action.type) {
		case 'isUserLoggedIn':
			return { ...state, 'isUserLoggedIn': action.value }
		case 'name':
			return { ...state, 'name': action.value }
		case 'email':
			return { ...state, 'email': action.value }
		case 'complete':
			return action.value
		default:
			return state
	}
}


function App() {
	const [userState, setUserState] = useReducer(reducer, initialUserState)

	useEffect(()=>{
		let localState = JSON.parse(localStorage.getItem('user'))
		if(localState)
			setUserState({type:'complete' , value : localState})
	},[])

	return (
		<>
			<userStateProvider.Provider value={{ state: userState, dispatch: setUserState }}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
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