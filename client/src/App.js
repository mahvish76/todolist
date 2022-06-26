import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Container from './components/Container';
import CheckAuthentication from './components/CheckAuthentication';
import { UserContextProvider } from './context/UserContext';
function App() {
  return (
    <UserContextProvider>
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Register />} />
          <Route element={<CheckAuthentication />} >
          <Route path='/:id/dashboard' element={<Container />} />
          </Route>
        </Routes>
      </Router>
      <Footer />
    </div>
    </UserContextProvider>
  );
}

export default App;
