import React, { useState , useContext } from 'react';
import { Link } from 'react-router-dom';
import {userStateProvider,initialUserState} from './../App'

const Userprofile = () => {
    
    const userState = useContext(userStateProvider)
    const [menuHidden, setMenuHidden] = useState(true);

    const toggleMenu = () => {
        setMenuHidden(!menuHidden);
    };

    const logout = () => {
        userState.dispatch({ type: 'complete', value: initialUserState })
	    localStorage.setItem('user' , JSON.stringify(initialUserState))
    }

    return (
        <>
            <div className='user-profile'>
                <p id='profile-initial' onClick={toggleMenu}>{
                    userState.state.isUserLoggedIn === true ? userState.state.name[0] : '?'
                }</p>
                <p id='user-display-name'>{`${userState.state.name}`}</p>
            </div>
            <ul className={`list-menu ${menuHidden ? 'hidden' : ''}`}>
                {userState.state.isUserLoggedIn === true ? (
                    <>
                        <Link to="/" className='link'><li className='list-menu-item' onClick={() => {
                            toggleMenu();
                            logout();
                        }}>Logout</li></Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className='link'><li className='list-menu-item' onClick={toggleMenu}>Login</li></Link>
                        <Link to="/signup" className='link'><li className='list-menu-item' onClick={toggleMenu}>Signup</li></Link>
                    </>
                )}
            </ul>
        </>
    );
};

export default Userprofile;
