import { React, memo } from 'react'
import { Link } from 'react-router-dom'
import Userprofile from './userprofile'
import logo from './../assets/logo.png'
import './../styles/header.css'

const Header = () => {
    return (
        <div className='header-container'>
            <div className='header'>
                <div className='logo'>
                    <img className='logo-img' src={logo} alt="" />
                </div>
                <div className='list-container'>
                    <ul className='header-list'>
                        <Link to="/" className='link'><li className='list-item'>HOME</li></Link>
                        <Link to="/contact" className='link'><li className='list-item'>CONTACTS</li></Link>
                        <Link to="/preference" className='link'><li className='list-item'>START</li></Link>
                    </ul>
                </div>
                <div className='user-profile'>
                    <Userprofile />
                </div>
            </div>
        </div>
    )
}

export default memo(Header)