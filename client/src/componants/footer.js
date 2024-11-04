import { React, memo } from 'react'
import { Link } from 'react-router-dom'
import facebook from './../assets/facebook.png'
import instagram from './../assets/instagram.png'
import twitter from './../assets/twitter.png'
import github from './../assets/github.png'
import linkedin from './../assets/linkedin.png'
import './../styles/footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="text">
        <h2>CONTACTS</h2>
      </div>
      <div className="email">
        <a href="mailto:hkssolanki945@gmail.com">hkssolanki945@gmail.com</a>
      </div>
      <div className="contacts">
        <div className="contact">
          <a target="_balnk" href="https://www.facebook.com/profile.php?id=100041624223757">
            <img src={facebook} alt="facebook icon" />
          </a>
        </div>
        <div className="contact">
          <a target="_balnk" href="https://www.instagram.com/hitesh_su_tha_r_/?hl=en">
            <img src={instagram} alt="instagram icon" />
          </a>
        </div>
        <div className="contact">
          <a target="_balnk" href="https://twitter.com/Hitesh__suthar_">
            <img src={twitter} alt="twitter icon" />
          </a>
        </div>
        <div className="contact">
          <a target="_balnk" href="https://www.linkedin.com/in/hitesh-kumar-807995200/">
            <img src={linkedin} alt="linkedin icon" />
          </a>
        </div>
        <div className="contact">
          <a target="_balnk" href="https://github.com/Hitesh-suthar">
            <img src={github} alt="github icon" />
          </a>
        </div>
      </div>
      <ul className="links footer-links">
        <li className="pages"><Link to="/">HOME</Link></li>
        <li className="pages"><Link to="/contact">CONTACTS</Link></li>
        <li className="pages"><Link to="quiz">START</Link></li>
      </ul>
      <div className="copyright">
        Copyright &copy; 2023 | All Rights Reserved | @Quiz
      </div>
    </footer>
  )
}

export default memo(Footer)