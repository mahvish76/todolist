import { Link } from 'react-router-dom';
const Dropdown = () => {
  return (
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              Menu
            </button>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><Link className="dropdown-item" to="/login">Login</Link></li>
              <li><Link className="dropdown-item" to="/">Sign Up</Link></li>
            </ul>
          </div>
  )
}

export default Dropdown