import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import Navbar from '../components/Navbar';
import Annoucement from '../components/Annoucement'
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

export default function Search() {
    
    // Get all products
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Filter data
    let filteredData = [];


    useEffect(() => {
        fetch("https://api.jsonbin.io/v3/b/63ce44e0ace6f33a22c5d5c2")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let obj  =[];
            for (const key in data.record) {
                obj = [...obj, ...data.record[key]]
            }

            setProducts(obj);
          
            
            // Search part
            
            // Get search phrase from url
            let searchPhrase = decodeURIComponent(window.location.search.substring(3)).toLowerCase();
        
            for (let product of obj) {
                // if(product.name) {
                //     if(String(product.name).toLowerCase().includes(searchPhrase)) {
                //         filteredData.push(product);
                //     }
                // }
    
                if(product.title) {
                    if(String(product.title).toLowerCase().includes(searchPhrase)) {
                        filteredData.push(product);
                    }
                }
            }
          
            setFilteredProducts(filteredData);

            if(filteredData.length===0) {
                console.log('no such product');
            }
        });
        }, []);

    


    return (
    <>
    <Navbar data = {products}/>
    <br></br>
    <div className="PopulerProduct">SEARCH RESULT</div>
    <div className="ReturnCon">
        <Link className="btn btn-primary" to={"/"}>
          return
        </Link>
      </div>

    {filteredProducts.length === 0 ? (
      <div className="Empty">THERE IS NO RESULT, TRY TO SEARCH BY CATEGORIE LIKE: DERSS SKIRTS OR SHIRTS</div>
    ) : (
      <div className="ProdectsInfo">
        {filteredProducts.map((item, index) => (
          <Link key={index} to={`/${item.title}/${item.id}`}>
            <div className="ProductsDetailsCon">
              <div className="Circle"></div>
              <img className="ProductsDetailsImg" src={item.img} alt="" />

              <div className="Info">
                <div className="icon">
                  <ShoppingCart />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}

    <div className="ReturnCon">
        {/* <Link className="btn btn-primary" to={"/"}>
          return
        </Link> */}
    </div>

    <Newsletter />
    <Footer />
  </>
);
};




