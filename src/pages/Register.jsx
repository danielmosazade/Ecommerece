import React, { useState } from 'react';

import  "./productListStyle.css"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { db } from "./FirebaseConfig";
import { collection, Firestore, getDocs,addDoc,setDoc,doc } from "firebase/firestore";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";

function Register() {


const [registerEmail, setRegisterEmail] = useState("");
const [registerPassword, setRegisterPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
let temp = "";
const [users, setUsers] = useState({});
const usersCollectionRef= collection(db,"users");
const navigate = useNavigate();

 const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

 const login = async () => {
   
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
     
      localStorage.setItem("user", JSON.stringify(user));
      let currentUser = JSON.stringify(user);

      

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


const register = async () => {
    if(!registerEmail||!registerPassword||!name)
    {
        alert("Please enter name email and password");
        return;
    }
    if (!emailRegex.test(registerEmail)) {
        alert("Invalid email address")
        return;
    }

    if (registerPassword !== confirmPassword) {
        alert("Passwords do not match")
        return;
    }

    try {
        const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword,

        );
        
        
        const newDoc =  doc(db,'users',registerEmail); 
        await setDoc(newDoc, {
                 name: name,
                 email: registerEmail,
                 uid: user.user.uid
             });

       
        user.user.displayName = name;
       
        login();

        alert("User Registered Successfully!");

    } catch (error) {
        alert("Incorrect Details");
        console.error(error);
    }
};

return (
    <div className="Registerlogin">
        <div className="registerConWrapper">
            <h1 className="Title"> CREATE AN ACOUNT</h1>
            <div className="RegisterForm">
                <input
                    className="RegisterInput"
                    type="text"
                    placeholder="name"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <input
                    className="RegisterInput"
                    type="email"
                    placeholder="email"
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                />
                <input
                    className="RegisterInput"
                    type="password"
                    placeholder="password"
                    onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}
                />
                <input
                    className="RegisterInput"
                    type="password"
                    placeholder="confirm password"
                    onChange={(event) => {
                        setConfirmPassword(event.target.value);
                    }}
                />

                <span className="Agreement">
                    This form constitutes the consent of the registrant, that he has
                    registered on the website and we are not responsible for any weapons
                    that may be caused by this <b> PRIVACY POLICY</b>
                    </span>
                    <button className="RegisterButton" onClick={register}>
                        CREATE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
























