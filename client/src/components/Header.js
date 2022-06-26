import useAuth from '../hook/useAuth';
import logo from '../List.png';
import Dropdown from './Dropdown';
import Logout from './Logout';

const Header = () => {
  const { user } = useAuth();
  return (
    <header>
      <nav className="navbar nav-header">
        <div className="container">
          <a className="" href="#">
            <img src={ logo } alt="logo" width="120px" height="auto" />
          </a>
          {(!user) ? <Dropdown /> : <Logout />}
        </div>
      </nav>
    </header>
  )
}

export default Header