import React from 'react'
import './style.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLoggedIn } from '../context/LoggedProvider';
import { Button } from 'react-scroll';


const Navbar = ({ data }) => {

  let [result, setResult] = useState("");
  const { SignOut } = useLoggedIn();
  
  let amount = parseInt(caluclateAmount());



  function search(e) {
    e.preventDefault();

    // Go to search and send search phrase
    window.location = "/search?q=" + result;
  }
  
  function signOutScope(e) {
    e.preventDefault();

    SignOut();

    window.location.reload();
  }

  function caluclateAmount() {
   
    let currentEmail = localStorage.getItem(`currentEmail`);

    if(currentEmail===null) {
      currentEmail = 'default';
    }

    try {
      return JSON.parse(localStorage.getItem(`cart-${currentEmail}`)).length;  
    }
    catch {
      return '';
    }  
  }

  return (
    <div  className="container">
      <div className="Wrapper">
        <div className="left">
          <span className="language">en</span>
          <div className="search-container">
            <input
              className="Input"
              type="text"
              placeholder="Search"
              onChange={e => setResult(e.target.value)}
            />
          {result &&
          <>
            <SearchIcon onClick={e => search(e)} />
            </>
} 
          </div>
          
        </div>
        <Link className='Logo-Wrapper Logo' to={"/"}>
          <div className="center">
            <h1 className="Logo">NETA</h1>
          </div>
        </Link>
    
        <div className="right">
          {!localStorage.getItem('user')&&
          <>
            <Link to={"/Register"}>
              <div className="menuitem">REGISTER</div>
            </Link>
            <Link to={"/Login"}>
              <div className="menuitem">SIGN IN</div>
            </Link>
          </>
          }
          
            {localStorage.getItem('user') &&
            <>
              <p className='name'>hello! {localStorage.getItem('currentEmail')}</p> 
              <button onClick={(e)=>{signOutScope(e)}}>Sign out</button>
            </>
          }

          

          <Link to={"/Cart"}>
            <div className="menuitem">
              <Badge badgeContent={amount} color="primary">
                <ShoppingCartOutlinedIcon color="action" />
              </Badge>
            </div>
          </Link>
        </div>
          {/* <Search filteredData={filteredData} /> */}
      </div>
    </div>
  );
};

export default Navbar;


