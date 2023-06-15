import { LinkedCamera } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dress, shirts, skirts } from "../data";
import { FavoriteOutlined, ShoppingCart } from "@mui/icons-material";
import Search from "@mui/icons-material/Search";
import Annoucement from "./Annoucement";
import Navbar from "./Navbar";
import "./style.css";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import { Button, IconButton, StepButton } from "@mui/material";
import "bootstrap/dist/css/bootstrap.css";
import Cart from "../pages/Cart";
import ProductsPage from "../pages/ProductsPage";
import { Route, Routes } from "react-router-dom";

import { useEffect } from "react";

export default function SelectedCategorie({ data }) {

  useEffect(() => {

    const element = document.getElementById('scroll-up');

    // Scroll to the element
    element.scrollIntoView({
      behavior: 'smooth', // Optionally, specify the scrolling behavior ('auto', 'smooth')
      block: 'start', // Optionally, specify the vertical alignment of the element in the viewport ('start', 'center', 'end', 'nearest')
      inline: 'nearest' // Optionally, specify the horizontal alignment of the element in the viewport ('start', 'center', 'end', 'nearest')
    });
  }, []);

  const {type} = useParams()//select categorie
  const curr = data.filter((item) => item.title === type)
  console.log(curr); 
  
  return (
    <>
      <div id='scroll-up'></div>
      <Annoucement />
      <Navbar />
      <div className="ReturnCon">
        <Link className="btn btn-primary" to={"/"}>
          return
        </Link>
      </div>
        <div className="SelectedCategorie">

          {curr.map((item, index) => {
            return (
              
              <React.Fragment key={index}>
              <Link to={`/${type}/${item.id}`}>

                <div className="ProdectsInfo">
                  <div className="SelectedCategorieIcon">
                    <div className="Circle"></div>
                    
                    <img className="ProductsDetailsImg" src={item.img} alt="" />

                    <div className="Info">
                      {/* <div className="icon">
                        <ShoppingCart />
                      </div> */}
                      <div className="icon">
                        <Search />
                      </div>
                      {/* <div className="icon">
                        <FavoriteOutlined />
                      </div> */}
                    </div>
                  </div>
                </div>
                </Link>
                </React.Fragment>
              
            );
          })}
        </div>
      
      <Newsletter />
      <Footer />
    </>
  );
}
