import '../css/Footer.css'
import { Link } from 'react-router-dom'
import xIcon from "../assets/twitter.png"
import linkedinIcon from "../assets/linkedin.png"
import githubIcon from "../assets/github-sign.png"

export default function Footer() {
  return <footer className="footer-container">
    <div className="dev-account-container">
      <p>Developed by <strong>Dev Wayne.</strong></p>

      <div className="account-icon-container">
        <Link className="account-link" to="https://x.com/@UzumakiWayney" target="_blank">
          <img src={xIcon} alt="X account" />
        </Link>
        <Link className="account-link" to="https://www.linkedin.com/in/nylbert-wayne-cruz-128832339" target="_blank">
          <img src={linkedinIcon} alt="linkedin account" />
        </Link>
        <Link className="account-link" to="https://github.com/wayneCruz" target="_blank">
          <img src={githubIcon} alt="github account" />
        </Link> 
      </div>
    </div>

    <div className="credits-container">
      <p>&#xa9;Movie List 2025.</p>
      <p>All rights Reserved.</p>
    </div>
  </footer>
}