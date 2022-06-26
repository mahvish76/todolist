import Button from "./Button";
import {useNavigate, Link} from 'react-router-dom';
import {useState} from 'react';
import useAuth from "../hook/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {setUser } = useAuth();
  const navigate = useNavigate();

  const loginUser = async (id) => {
     const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      credentials: "include",
      body: JSON.stringify({
        email, password
      }),
    });
    const data = await response.json();
    if (data.msg) {
      setError(data.msg)
    }
    const loggedIn = data.loggedIn;
    setUser(loggedIn)
    setEmail('');
    setPassword('');
    if (loggedIn === true) {
      const id = data.user[0]?.id;
      navigate(`/${id}/dashboard`)
    }
  }
  
  const handleUser = (e) =>{
    e.preventDefault();
    if (email === "" || password === "") {
      setError("All fields are required");
      return;
    }
    loginUser();
  }

  return (
    <section className="layout container">
    <div className="p-3 mx-auto mt-5 login">
    {error && 
    <div className="alert alert-danger" role="alert">
          {error}
    </div>}
      <h1>Login</h1>
      <form className="row g-3" onSubmit={handleUser}>
        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="email" placeholder="abc@ex.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="col-12">
          <label htmlFor="password">
            Password
          </label>
          <input type="password" id="password" className="form-control" placeholder="password" value ={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="col-12">
          <span className="small d-flex justify-content-center">
            Don't have an account? <Link className="link" to="/">Sign up</Link>
          </span>
        </div>
        <div className="col-12">
          <Button text="Login" />
        </div>
      </form>
    </div>
    </section>
  )
}

export default Login