import { createContext ,useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider( {children} ) {
    let [user, setUser] = useState(null);

    const signup = async ( { email, password, userType, profile }, callback ) => {
      const response = await fetch('http://localhost:8000/api/user/signup', {
        method: 'POST', 
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          userType: userType,
          profile: profile
        })
      });
      const status = response.status;
      const resData = await response.json();
      callback(status, resData);
    }



    let login = async ( { email, password } , callback) => {
      const response = await fetch(`http://localhost:8000/api/user/login`, {
        method: 'POST', 
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      });
      const status = response.status;
      const resData = await response.json();

      if (status === 200) {
        setUser(resData);
        
      }
      else {
        setUser(null);
      }
      callback(status, resData);
    }
  
  let logout = async callback => {
    const response = await fetch('http://localhost:8000/api/user/logout', {
      method: 'POST', 
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const status = response.status;
    const resData = await response.json();
    
    if (status === 200) {
      setUser(null);
    }
    callback(status, resData);
  }

   const editprofile = async ( { newEmail, newName, newPhoneNumber, uid}, callback ) => {
      const response = await fetch('http://localhost:8000/api/user/profile/' + uid, {
        method: 'PUT', 
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          newEmail: newEmail,
          newName: newName,
          newPhoneNumber: newPhoneNumber,
        })
      });
      const status = response.status;
      const resData = await response.json();
      if (status === 200) {
        setUser(resData);

      }
      callback(status, resData);
  }

  let isauthenticated = async callback => {
    
    if (user === null) { 
      
      const response = await fetch('http://localhost:8000/api/user/authenticated', {
        method: 'GET', 
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const status = response.status;
      const resData = await response.json();
      if (status === 200) {
        setUser(resData.user);
      }
      else {
        setUser(null);
      }
      callback(status, resData);
      
    }
    
  };
  
    let value = { user, login, signup, logout, editprofile, isauthenticated }

    return(
        <AuthContext.Provider value={value}> 
            {children} 
        </AuthContext.Provider>
    )
}