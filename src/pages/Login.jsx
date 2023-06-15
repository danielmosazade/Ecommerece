import React from "react";
import "./productListStyle.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, Firestore, getDocs } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import{auth} from './FirebaseConfig';
import { useLoggedIn } from "../context/LoggedProvider";

function Login() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  //remove and use context data
  const [loggedIn, setLoggedIn] = useState(false);
  const {user, setUser} = useLoggedIn();
  const { SignOut } = useLoggedIn();
  
  const usersCollectionRef = collection(db,"users");
  let currentUser = 'default';

useEffect(() => {
    const storedUser = localStorage.getItem("user");
   
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }
    else {
      setUser({});
      setLoggedIn(false);
    }

    onAuthStateChanged(auth, (currentUser) => {
      if (storedUser) {
        setUser(storedUser);
        setLoggedIn(true);
      } 
      else {
        setUser({});
        setLoggedIn(false);
        localStorage.removeItem("user");
        localStorage.removeItem("currentEmail");
      }
    });
  }, []);

  const login = async () => {
    if (loggedIn) {
      alert("There is already a user logged in");
      return;
    }

    if (!loginEmail || !loginPassword) {
      alert("Please enter email and password");
      return;
    }
    
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
     
      localStorage.setItem("user", JSON.stringify(user));
      currentUser = JSON.stringify(user);

      

      let currentEmail;

      // Save user's email 
      try {
        if(String(currentUser).length>0) {
          // Check type of currentUser
          if(typeof currentUser !== 'string') {
            currentUser = JSON.stringify(currentUser);
          }
         
          let regex = /"email":"([^"]+)"/;
          let matchEmail = currentUser.match(regex);
          let userEmail = matchEmail[1];

          currentEmail = userEmail;

          localStorage.setItem('currentEmail', userEmail);
        }
        else {
          currentEmail = 'default';
          localStorage.setItem('currentEmail', 'default');
        }
      }
      catch{
        // pass
      }

      // Double check that user have cart if not creates one for him
      if(!localStorage.getItem('cart-'+ currentEmail)) {
        localStorage.setItem('cart-'+ currentEmail ,'""')
      }

      navigate("/");

    } catch (error) {
      console.log(error.message);
    }
   
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // setUser({});
      // setLoggedIn(false);
      // localStorage.removeItem("user");
      SignOut();

      alert("You have successfully signed out!");
    } catch (error) {
      console.log(error.message);
    }
  };
  const resetPassword = async () => {
    try {
      await resetPassword(auth, loginEmail);
      
    } catch (error) {
        alert("Password has been sent!");
      console.log(error.message);
    }
  };



//   useEffect(() => {
//     const getUsers = async () => {
//       const usersCollection = db.collection("users");
//       const data = await usersCollection.get();
//       setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     };

//     getUsers();
//   }, []);

//   const addUserToFirestore = async (user) => {
//     const usersCollection = db.collection("users");
//     await usersCollection.add(user);
//   };

return (
  <div className="Login">
   
    <div className="LoginConWrapper">
      <h1 className="LoginTitle"> SIGN IN</h1>
      <div className="LoginForm">
        <input
          className="LoginInput"
          type="text"
          placeholder="username"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          className="LoginInput"
          type="text"
          placeholder="password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <button className="LoginButton" onClick={login}>lOGIN</button>
        <div className="LoginCon" onClick={resetPassword}>FORGOT THE PASSWORD?</div>
        <Link to={"/Register"}>
          <div className="LoginCon" >
            CREATE A NEW ACCOUNT
          </div>
        </Link>
      </div>
   
    </div>
    
  </div>
);
}

export default Login;
