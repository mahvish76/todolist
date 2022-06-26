import Button from "./Button";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hook/useAuth";

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const registerUser = async () => {
      const register = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name, email, password
      }),
    })
    const data = await register.json();
    console.log(data)
    if (data.msg) {
      setError(data.msg);
    }
    setUser(false);
    navigate("/login");
  }
  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      setError("All fields are required")
    } 
    registerUser();

    setName('');
    setEmail('');
    setPassword('');
  }


  return (
    <section className="layout container">
    <div className="p-4 mx-auto mt-5 register">
    {error && 
    <div className="alert alert-danger" role="alert">
          {error}
    </div>}
      <h1>Signup</h1>
      <form className="row g-3" onSubmit={onSubmit}>
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" autoComplete="none" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label htmlFor="email">
            Email
          </label>
          <input type="email" id="email" className="form-control" placeholder="abc@ex.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="col-12">
          <label htmlFor="password">
            Password
          </label>
          <input type="password" id="password" className="form-control" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="col-12">
          <span className="small d-flex justify-content-center">
            Already have an account? <Link className="link" to="/login">login</Link>
          </span>
        </div>
        <div className="col-12">
          <Button text="Signup" />
        </div>
      </form>
    </div>
    </section>
  )
}

export default Register