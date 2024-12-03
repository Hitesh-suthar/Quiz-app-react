import React , {useContext} from 'react'
import { Link } from 'react-router-dom'
import './../styles/home.css'
import { userStateProvider } from '../App'

const Home = () => {
	const {userState} = useContext(userStateProvider)
	return (
		<div className='container'>
			<div className='welcome'>
				<p>Welcome to QUIZ</p>
				<p id='name'>{userState?(`${userState.name}`).toUpperCase():"My Friend"} </p>
			</div>
			<div className='intro'>Challenge your intellect and expand your horizons with a wide array of quizzes on various topics.</div>
			<div className='start-btn'>
				<Link to="/preference"><button>Start Quiz</button></Link>
			</div>
		</div>
	)
}

export default Home