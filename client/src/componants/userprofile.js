import React, { useState , useContext ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {userStateProvider} from './../App'
import profile from '../assets/profile.png'

const Userprofile = () => {
    
    const {userState , setUserState} = useContext(userStateProvider)
    const [menuHidden, setMenuHidden] = useState(true);

    const toggleMenu = () => {
        setMenuHidden(!menuHidden);
    };

    const handleClickOutside = (event) => {
        const menu = document.getElementById("menu");
        const toggleButton = document.getElementById("toggleMenu");
        if (!menu.contains(event.target) && !toggleButton.contains(event.target)) {
          setMenuHidden(true);
        }
      };
    
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const logout = () => {
        setUserState({ type: 'logout'})
        try {
			let options = {
				method: "POST",
			};
			fetch("https://quiz-app-ymde.onrender.com/api/logout", options)
		} catch (err) {
			console.log(err);
		}
    }

    return (
        <>
            <div id='toggleMenu' className='user-profile' onClick={toggleMenu}>
                <p id='profile-initial' >
                    <img id='profile-img' src={profile} alt="" />
                </p>
                <p id='user-display-name'>{userState?(`${userState.name}`).toUpperCase():"My Friend"}</p>
            </div>
            <ul id='menu' className={`list-menu ${menuHidden ? 'hidden' : ''}`}>
                {userState? (
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
