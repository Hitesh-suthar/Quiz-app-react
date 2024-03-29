import React , {useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './../styles/form.css'
import loginSVG from './../assets/Login.svg'
import { userStateProvider } from '../App'

export const login = (userState , newState) => {
	userState.dispatch({ type: 'complete', value: newState })
	localStorage.setItem('user' , JSON.stringify(newState))
}

const Login = () => {
	const navigate = useNavigate()
	const userState = useContext(userStateProvider)

	useEffect(()=>{
		if(userState.state.isUserLoggedIn) navigate('/error')
	})

	let handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let options = {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: document.getElementById('username').value,
					password: document.getElementById('password').value,
				})
			};
			fetch("/login", options)
				.then(res => res.json())
				.then(res => {
					if (res.status) {
			            login(userState , res.data);   
						navigate('/')
					}
					else {
						document.getElementById("wm4").innerHTML = res.message
						document.getElementById("wm4").style.visibility = 'visible'
						document.getElementById('form').reset()
					}
				})
		} catch (err) {
			console.log(err);
		}
	};


	function onpassChange(e) {
		if (e.target.value.length < 8) {
			document.getElementById("submit-btn").disabled = true
			document.getElementById("wm").style.visibility = 'visible'
		}
		else {
			document.getElementById("submit-btn").disabled = false
			document.getElementById("wm").style.visibility = 'hidden'
		}
	}

	return (
		<div className='container'>
			<div className='inner-container'>
				<div className='image-container'>
					<img src={loginSVG} alt="" />
				</div>
				<div className='form-container'>
					<div className='heading'>LogIn</div>
					<form id='form' method='post' onSubmit={(e) => handleSubmit(e)}>
						<label htmlFor="username">Username/Email</label>
						<input type="text" id='username' required/>
						<label htmlFor='password'>Password</label>
						<input type="password" id='password' onChange={(e) => onpassChange(e)} />
						<p className='warning-message' id='wm'>*Password must be at least 8 character long!</p>
						<input id="submit-btn" type="submit" value='Login' disabled />
						<p className='warning-message' id='wm4'></p>
					</form>
					<div className='signup-link'>
						<p>Don't have an account yet?</p>
						<Link to='/signup'><p>Click here to register</p></Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login