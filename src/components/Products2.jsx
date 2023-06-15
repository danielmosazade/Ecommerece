import React from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import "./style.css";
 
const Products2 = ({ data }) => {
  const curr = data.filter((item) => item.popularProducts === "popularProducts" );


  return (
    <>
      <div className="PopulerProduct">the most beloved product</div>
        <div className="ProdectsInfo">
          {curr.map((item, index) => (
            
          <Link key={index} to={`/BestProductsPage/${item.id}`}>

            <div className="ProductsDetailsCon">
              <div className="Circle"></div>
              <img className="ProductsDetailsImg" src={item.img} alt="" />

              <div className="Info">
                <div className="icon">
                  <ShoppingCart />
                </div>
                {/* <div className="icon">
                  <SearchOutlinedIcon />
                </div>
                <div className="icon">
                  <FavoriteOutlinedIcon /> */}
                {/* </div> */}
              </div>
            </div>
          </Link>
          ))} 
        </div>
    </>
  );
};

export default Products2;
