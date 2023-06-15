import React from "react";
import "./productListStyle.css";
import Navbar from "../components/Navbar";
import Annoucement from "../components/Annoucement";
import Products2 from "../components/Products2";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useEffect } from "react";

const ProductList = ({data}) => {

  useEffect(() => {

    const element = document.getElementById('scroll-up');

    // Scroll to the element
    element.scrollIntoView({
      behavior: 'smooth', // Optionally, specify the scrolling behavior ('auto', 'smooth')
      block: 'start', // Optionally, specify the vertical alignment of the element in the viewport ('start', 'center', 'end', 'nearest')
      inline: 'nearest' // Optionally, specify the horizontal alignment of the element in the viewport ('start', 'center', 'end', 'nearest')
    });
  }, []);

  console.log(data)
  return (
    <div className="container" id='scroll-up'>
      <Navbar />
      <br />
      <Annoucement />
      <h1 className="Title">loved product</h1>
      {/* <div className="FilterCon">
        <div className="Filter">
          <div className="FilterText">Filter Products:</div>
          <select className="Select">
            <option disabled selected  value="">color</option>
            <option value="text">white</option>
            <option value="text">black</option>
            <option value="text">red</option>
            <option value="text">green</option>
            <option value="text">grey</option>
          </select>
          <select  className="Select">
            <option disabled selected  value="">size</option>
            <option value="text">XS</option>  
            <option value="text">S</option>
            <option value="text">M</option>
            <option value="text">L</option>
            <option value="text">XL</option>
          </select>
        </div>
        <div className="Filter">
          <div className="FilterText">Sort Products:</div>
          <select  className="Select">
            <option  selected  value="text">Newest</option>
            <option value="text">price (asc)</option>
            <option value="text">price (desc)</option>
          </select>

        </div>
      </div> */}
      <Products2  data= {data} />
      <Newsletter /> 
      <Footer />
      
    </div>
  );
};

export default ProductList;
