import React ,{useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import signupSVG from './../assets/Sign up.svg'
import {login} from './login'
import { userStateProvider } from '../App'


const Signup = () => {

    const navigate = useNavigate();
    const userState = useContext(userStateProvider)

    useEffect(()=>{
		if(userState.state.isUserLoggedIn) navigate('/error')
	})

    function handleSubmit(e) {
        e.preventDefault();
        try {
            let options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: document.getElementById('uname').value,
                    email: document.getElementById('uemail').value,
                    password: document.getElementById('password1').value,
                    password2: document.getElementById('password2').value
                })
            };
            fetch("/api/signup", options)
                .then(res => res.json())
                .then(res => {
                    if (res.status) {
                        login(userState , res.data)
                        navigate('/')
                    }
                    else {
                        document.getElementById("wm3").innerHTML = res.message
                        document.getElementById("wm3").style.visibility = 'visible'
                        document.getElementById('form').reset()
                    }
                })
        } catch (err) {
            console.log(err);
        }
    }

    function onpass1Change(e) {
        if (e.target.value.length < 8 || document.getElementById('password2').value.length < 8)
            document.getElementById("submit-btn").disabled = true
        else document.getElementById("submit-btn").disabled = false

        if (e.target.value.length < 8) document.getElementById("wm1").style.visibility = 'visible'
        else document.getElementById("wm1").style.visibility = 'hidden'
    }

    function onpass2Change(e) {
        if (e.target.value.length < 8 || document.getElementById('password1').value.length < 8)
            document.getElementById("submit-btn").disabled = true
        else document.getElementById("submit-btn").disabled = false

        if (e.target.value.length < 8) document.getElementById("wm2").style.visibility = 'visible'
        else document.getElementById("wm2").style.visibility = 'hidden'
    }

    return (
        <div className='container'>
            <div className='inner-container'>
                <div className='image-container'>
                    <img src={signupSVG} alt="" />
                </div>
                <div className='form-container'>
                    <div className='heading'>Sign Up</div>
                    <form id='form' method='post' onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor="uname">Name</label>
                        <input type="text" id='uname' required />
                        <label htmlFor="uemail">Email</label>
                        <input type="text" id='uemail' required />
                        <label htmlFor='password1'>Create Password</label>
                        <input type="password" id='password1' onChange={(e) => onpass1Change(e)} />
                        <p className='warning-message1' id='wm1'>*Password must be at least 8 character long!</p>
                        <label htmlFor='password2'>Re-enter Password</label>
                        <input type="password" id='password2' onChange={(e) => onpass2Change(e)} />
                        <p className='warning-message2' id='wm2'>*Password must be at least 8 character long!</p>
                        <input id='submit-btn' type="submit" value='Sign Up' disabled />
                        <p className='warning-message3' id='wm3'></p>
                    </form>
                    <div className='login-link'>
                        <p>Already have an account?</p>
                        <Link to='/login'><p>Click here to login</p></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup