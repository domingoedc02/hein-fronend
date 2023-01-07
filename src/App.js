
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Routes from './Components/Routes';
import { UserProvider } from './UserContext';
import { useEffect, useState } from 'react';



 
 
function App() {

  let token = localStorage.getItem("token")
  const [cartItems, setCartItems] = useState({
      productIds: []
  })
  
    

  const [branding, setBranding] = useState({
      brand: "all",
      category: "all"
  })

  const [user, setUser] = useState({
              id: null,
              isAdmin: null,
              username: null,
              firstName: null,
              lastName: null,
              password: null,
              email: null

          })

  const unsetUser = () => {
          localStorage.clear();

          setUser({
            id: null,
            isAdmin: null,
            username: null,
            firstName: null,
            lastName: null,
            password: null,
            email: null
          })
    }

    useEffect(() => {
      
      if(token !== null){
        fetch("https://hein-server.domingoec.net/users/details", {
        })
        .then(response => response.json())
        .then(data => {
          //console.log(data) //object - user details
          // console.log(data !== "undefined")
            if(typeof data._id !== "undefined"){
              // console.log(data._id)
              setUser({
                id: data._id,
                isAdmin: data.isAdmin,
                username: data.userName,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password,
                email: data.email
              })
            }
        })
      }
    }, [token])
    
    

  return (
    <UserProvider value={{user, setUser, unsetUser, branding, setBranding, cartItems, setCartItems}}>
        
        <Routes/>
    </UserProvider>
      
      
  

  );
}

export default App;
