import logo from '../logo-square.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-3">
          <a className='f-logo' href='#'>
            <img src={ logo } alt="logo" width="150px" height="auto" />
          </a>
          </div>
          <div className="col-12 col-md-6">
              <ul className='f-menu'>
                <li className='f-item'>
                  <a href='#'>About</a>
                  </li>
                <li className='f-item'>
                  <a href='#'>How It Works</a>
                  </li>
                <li className='f-item'>
                  <a href='#'>Contact Us</a>
                  </li>
              </ul>
          </div>
          <div className="col-12 col-md-3">
            <ul className='f-share'>
              <li className='icon'>
                <span>f</span>
              </li>
              <li className='icon'>
                <span>t</span>
              </li>
              <li className='icon'>
                <span>ig</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer