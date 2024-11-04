import React , {useContext} from 'react'
import { Link } from 'react-router-dom'
import './../styles/home.css'
import { userStateProvider } from '../App'

const Home = () => {
	const {state} = useContext(userStateProvider)
	return (
		<div className='container'>
			<div className='welcome'>
				<p>Welcome to QUIZ</p>
				<p id='name'>{`${state.name}`} </p>
			</div>
			<div className='intro'>Welcome to our online quiz app, where knowledge meets fun!<br/>Challenge your intellect and expand your horizons with a wide array of quizzes on various topics.<br /> From general knowledge to specific interests, we have something for everyone.<br /> Join us now!</div>
			<div className='start-btn'>
				<Link to="/preference"><button>Start Quiz</button></Link>
			</div>
		</div>
	)
}

export default Home