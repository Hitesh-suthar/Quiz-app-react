import React from 'react'
import { Link } from 'react-router-dom'
import errorSVG from './../assets/error404.svg'
const Error = () => {
    return (
        <div className='container'>
            <div className='inner-container'>
                <div className='image-container'>
                    <img src={errorSVG} alt="" />
                </div>
                <div className='content-container'>
                    <h1 className='error-message'>Error 404</h1>
                    <p className='pnf'>Page not found</p>
                    <Link to='/'><p>Go to home</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Error