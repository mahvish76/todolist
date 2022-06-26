import useAuth from '../hook/useAuth';

const Logout = () => {
  const { setUser } = useAuth();

  const logout = async () => {
    await fetch('http://localhost:3001/logout', {
      method: 'POST',
    }).then((response) => response.json())
    .then((data) => setUser(false))
  }

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  }

  return (
    <button onClick={handleLogout} className='btn btn-warning'>Logout</button>
  )
}

export default Logout