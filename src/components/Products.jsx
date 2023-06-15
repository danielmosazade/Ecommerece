import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import "./style.css";
import { useEffect } from "react";

const Products = ({ data }) => {
  const curr = data.filter(
    (item) => item.popularProducts === "popularProducts"
  );

  useEffect(() => {

    const element = document.getElementById('Scroll-3');

    // Scroll to the element
    element.scrollIntoView({
      behavior: 'smooth', // Optionally, specify the scrolling behavior ('auto', 'smooth')
      block: 'start', // Optionally, specify the vertical alignment of the element in the viewport ('start', 'center', 'end', 'nearest')
      inline: 'nearest' // Optionally, specify the horizontal alignment of the element in the viewport ('start', 'center', 'end', 'nearest')
    });
  }, []);

  return (
    <>
      <div id="Scroll-3">
        <div className="PopulerProduct">the most beloved product</div>

        <Link to={"/ProductList"}>
          <div className="ProdectsInfo">
            {curr.map((item, index) => (
              
              <div key={index} className="ProductsDetailsCon">
                <div className="Circle"></div>
                <img className="ProductsDetailsImg" src={item.img} alt="" />

                <div className="Info">
                  {/* <div className="icon">
                    <ShoppingCart />
                  </div> */}
                  <div className="icon">
                    <SearchOutlinedIcon />
                  </div>
                  {/* <div className="icon">
                    <FavoriteOutlinedIcon />
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </Link>
      </div>
    </>
  );
};

export default Products;
