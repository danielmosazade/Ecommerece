import React from 'react'
import Annoucement from '../components/Annoucement'
import Categories from '../components/Categories'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Products from "../components/Products"
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { useState } from "react";
import { useEffect } from "react";

const Home = ({data}) => {

  const [products, setProducts] = useState([])

  if(!localStorage.getItem(`cart-default`))
    localStorage.setItem('cart-default', '""');

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/63ce44e0ace6f33a22c5d5c2")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let obj = [];

        for (const key in data.record) {
          obj = [...obj, ...data.record[key]]
        }

        setProducts(obj);
      });
    }, []);
  


    
  return (
    <div >
      <Annoucement/>
      <Navbar data= {products}/>
      {/* <Navbar/> */}
      <Slider  data= {products} />
      <Categories data= {products}/>
      <Products data= {products}/>
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default Home
