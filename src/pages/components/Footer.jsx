import React from 'react';
import Logo from '../../assets/mk.svg';


function Footer() {
  return (
    <footer className='footer'>
      <div className="footer__container">
        <a className="dev-link" href="https://portfolio-2-0-iota-henna.vercel.app/" target="_blank" rel="noreferrer noopener">
          <img className="logo" src={Logo} alt="Logo" />
        </a>

        <ul className="social-list">
          <li className="social-item">
            <a className="linkedin" href="https://www.linkedin.com/in/matheus-kristman-07a947171/" target="_blank" rel="noreferrer noopener">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </li>
          <li className="social-item">
            <a className="instagram" href="https://www.instagram.com/tinzin.exe/" target="_blank" rel="noreferrer noopener">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li className="social-item">
            <a className="github" href="https://github.com/MatheusKristman" target="_blank" rel="noreferrer noopener">
              <i className="fa-brands fa-github"></i>
            </a>
          </li>
        </ul>
      </div>

    </footer>
  )
}

export default Footer;