import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
   setUser: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  
  useEffect( () => {
    fetch(`http://localhost:3001/auth`, {
    credentials: "include",
  }).then((response) => response.json())
  .then((data) => {
    if (data.loggedIn === true) {
      setUser(true)
    } else if(data.loggedIn === false) {
      setUser(false)
    }
  })
}, [])
  return (
    <UserContext.Provider value={{user, setUser}}>
    { children }
  </UserContext.Provider>
  )
}