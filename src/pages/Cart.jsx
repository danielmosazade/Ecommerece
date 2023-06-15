import React, { useState } from "react";
import "./productListStyle.css";
import Navbar from "../components/Navbar";
import Annoucement from "../components/Annoucement";
import Paypal from "./paypal/Paypal";
import Footer from "../components/Footer";
import { Add, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { useLoggedIn } from "../context/LoggedProvider";
import { useNavigate } from "react-router-dom";
import { setDoc,doc,
    addDoc,
    collection,
    getDocs,
    updateDoc,
    where } from "firebase/firestore";
import {useCookies} from "react-cookie";
// import { PayPalButtons } from "@paypal/react-paypal-js";
import { db } from "./FirebaseConfig";
import {v4 as uuid } from 'uuid';
// import nodemailer from 'nodemailer'; service_4epxh1b
import emailjs from '@emailjs/browser';

const Cart = () => {
  const navigate = useNavigate();
  
  const { signOut } = useLoggedIn();

  let {user} = useLoggedIn();


  // let userEmail = 'default';
  
  // try {
  //   if(user.length > 0) {
  //     // Check type of user
  //     if(typeof user !== 'string') {
  //       user = JSON.stringify(user);
  //     }
      
  //     let regex = /"email":"([^"]+)"/;
  //     let matchEmail = user.match(regex);
  //     userEmail = matchEmail[1];
  //   }
  // }
  // catch{
  //   // pass
  // }


  let cart = '';
  let currentEmail = localStorage.getItem('currentEmail');
  
  if(!currentEmail) {
    if(localStorage.getItem(`cart-default`))
      cart = localStorage.getItem(`cart-default`);
    else
      localStorage.setItem('cart-default', '""');
    
    currentEmail = 'default';
  }
  else{
    if(localStorage.getItem(`cart-${currentEmail}`))
      cart = localStorage.getItem(`cart-${currentEmail}`); //משווים לקארט
  }

  useEffect(() => {
    // Update the cart basket's total
    calculateTotal();  
  }, []);
  
  useEffect(() => {
      
      if (currentEmail) {
        const userCart = localStorage.getItem(`cart-${currentEmail}`);
        if (userCart) {
          // setCart(JSON.parse(userCart));
          cart = JSON.parse(userCart);
        }
      }
    // }, [currentEmail, setCart]);
  }, [currentEmail, cart]);

  useEffect(() => {
      if (currentEmail) {
        localStorage.setItem(`cart-${currentEmail}`, JSON.stringify(cart));
      }
  }, [currentEmail, cart]);


  function refreshAmountBadge() {

    // Caluclate the new amount 
    let currentEmail = localStorage.getItem(`currentEmail`);

    if(currentEmail===null) {
      currentEmail = 'default';
    }


    let updatedAmount = JSON.parse(localStorage.getItem(`cart-${currentEmail}`)).length; 
    
    // Updated in website
    document.querySelector('.MuiBadge-badge').innerHTML = updatedAmount;
  }

  function removeElement(id) {

    let getCart = localStorage.getItem(`cart-${currentEmail}`);
    
    cart = JSON.parse(getCart);

    const newData = cart.filter((item) => {
      if(item.id !== id) {
        return item;
      }
    });
    
   
    // If user logged in add to his cart if not add to default
    if(user.length > 0) {
      // Remove the old cart from local storage
      localStorage.removeItem(`cart-${currentEmail}`)

      // Create the updated cart
      localStorage.setItem(`cart-${currentEmail}`, JSON.stringify(newData));
    }
    else {
      // Remove the old cart from local storage
      localStorage.removeItem(`cart-default`)

      // Create the updated cart
      localStorage.setItem(`cart-default`, JSON.stringify(newData));
    }

    // Remove it from site
    document.getElementById('product-' + id).remove();


    // Update the cart basket's total
    calculateTotal();

    // Refresh amount of products
    refreshAmountBadge();
  } 

  function add(id) {
   
    let getCart = localStorage.getItem(`cart-${currentEmail}`);
    
    if(getCart===null) {
      getCart = localStorage.getItem(`cart-default`);
    }

    cart = JSON.parse(getCart);

    let updatedCart = [];

    for (let item of cart) {
      if(item.id === id) {
        item.count = item.count + 1;

        // Updated in the site
        document.getElementById('ProductAmountAdd-' + item.id).innerHTML = item.count;
      }

      // Refill updated cart with updated data from cart
      updatedCart.push(item);
    }
    
    localStorage.setItem(`cart-${currentEmail}`, JSON.stringify(updatedCart));

 
    // Update the cart basket's total
    calculateTotal();
  }


  function minus(id) 
  {
    let getCart = localStorage.getItem(`cart-${currentEmail}`);
    
    if(getCart===null) {
      getCart = localStorage.getItem(`cart-default`);
    }

    cart = JSON.parse(getCart);
   

    let updatedCart = [];

    for (let item of cart) {
      if(item.id === id) {
        // Need to remove complitly
        if(item.count === 1)
          // call the function to remove
          removeElement(id);

        // Never go down more then two
        if(item.count > 1)
          item.count = item.count - 1;
        
        // Updated in the site
        document.getElementById('ProductAmountAdd-' + item.id).innerHTML = item.count;
      }

      // Refill updated cart with updated data from cart
      updatedCart.push(item);
    }
    
    localStorage.setItem(`cart-${currentEmail}`, JSON.stringify(updatedCart));

 
    // Update the cart basket's total
    calculateTotal();
  }
  
  function calculateTotal() {
    
    let getCart = localStorage.getItem(`cart-${currentEmail}`);
    
    if(getCart===null) {
      getCart = localStorage.getItem(`cart-default`);
    }
   
    cart = JSON.parse(getCart);

    let newTotal;

    if(String(cart).length > 3){

      newTotal = cart.reduce((previousScore, currentScore) => previousScore+
      currentScore.price*currentScore.count, 0);
      
    }
    else{
      newTotal = 0;
    }

    if(document.getElementById('total-price-1')) {
      document.getElementById('total-price-1').innerHTML = newTotal + '$';
      document.getElementById('total-price-2').innerHTML = newTotal + '$';
    }

    return newTotal;
  }

  async function onBuyClick(){

    if(localStorage.getItem('currentEmail'))
    {
     // await addDoc(collection(db,"cart"), {...cart,userId:user.email});
      // var location;
      const newTotal = calculateTotal();
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      
      console.log(dateTime)

      const newDoc =  doc(db,'carts',dateTime); 
     
      // await setDoc(newDoc, {...cart,currentEmail:currentEmail,totalSum:newTotal});
      await setDoc(newDoc, {
        items: cart.map(item => ({ ItemID: item.id, count: item.count })),
        currentEmail,
        totalSum: newTotal
      });
      
      const popup = document.createElement("div");
      popup.className = "popup";
      popup.textContent = "Your order successful";
      const popupContainer = document.getElementById("popup");
      popupContainer.appendChild(popup);
      setTimeout(() => {
        popupContainer.removeChild(popup);
      }, 3000);

      sendEmail();

  
      // Remove products from cart visually
      let carts = localStorage.getItem(`cart-${currentEmail}`);
      carts = JSON.parse(carts);
     
      for(let product of carts) {
        document.getElementById(`product-${product.id}`).remove();
      }

      localStorage.setItem(`cart-${currentEmail}`, '""');

      calculateTotal();
    }
    else{
      alert("you need to log in to buy clothes");
      navigate("/Login");
    }
  
  }
  
  function sendEmail() {

    let cartContent = JSON.parse(localStorage.getItem(`cart-${currentEmail}`));
    let message = 'You purchased the following items:\n';

    for(let item of cartContent) {
      message += 'The product: ' + JSON.stringify(item.id) + JSON.stringify(item.img)+', the amount: ' + JSON.stringify(item.count) + ', the price: ' + JSON.stringify(item.price*item.count) + ', \n';
    }

    // Send mail to customer

    let contactParams = {
      to_name: localStorage.getItem('currentEmail').split('@')[0], //Seperete the name@gmail.com to -> name , gamil.com and choose the name 
      from_name: 'Neta',
      customer_email: localStorage.getItem('currentEmail'),
      message: message
    };

    emailjs.send('service_ba99jcl', 'template_obho2se', contactParams, "UpCISlkp92_X2PvgG").then(function (res) {});
   
    
    // Send mail to bussiness
    
    contactParams = {
      from_name: localStorage.getItem('currentEmail').split('@')[0],
      message: message
    };

    emailjs.send('service_ba99jcl', 'template_0rtoxip', contactParams, "UpCISlkp92_X2PvgG").then(function (res) {});
    return message;
   
  }

  return (
    <>
    
      <div className="CartCon">
        <Navbar />
        <br />
        <Annoucement />
        <div className="ReturnCon">
          <Link className="btn btn-primary" to={"/"}>
            {" "}
            return
          </Link>
        </div>
        <div className="CartWrraper">
          <h1 className="CartTitle"> your bag</h1>
          <div className="CartTop">
            <Link to={"/"}>
              <button className="TopButton">CONTINUE SHOPPING</button>
            </Link>
            <div className="TopText">
              <span className="TopTextMessage">shopping cart</span>
            </div>
            {/* <Link to={"/Login"}> */}
              <button className="TopButton">CHEACKOUT PAYMENT</button>
            {/* </Link> */}
          </div>
          <div className="CartBottom">
            <div className="CartBottomInfo">
              { cart.length > 3 && JSON.parse(cart).map((item, index) => (
                <div key={index} id={`product-${item.id}`} className="CartBottomcon">
                  <div className="ProductDetails">
                    <img
                      className="CartBottomImg"
                      src={item.img}
                      alt=""
                    />
                    <div className="CartBottomData">
                      <span className="ProductName">
                        <b>Product: {item.name}</b>
                      </span>
                      <span className="ProductId">
                        <b>ID: {item.id}</b>
                      </span>
                      <span className="ProductSize">
                        <b>Size: {item.select}</b>
                      </span>
                    </div>
                  </div>
                  <div className="CartBottomDetail">
                    <div className="ProductAmountContainer">
                      <Remove className="icon" onClick={() => minus(item.id)} />
                      <div id={`ProductAmountAdd-${item.id}`} className="ProductAmount">{item.count}</div>
                      <Add className="icon" onClick={() => add(item.id)} />
                    </div>
                    <div className="Productanount">
                      {item.price}$
                      <div className="Delete" onClick={() => removeElement(item.id)} >
                        <DeleteIcon />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <hr className="Hr" />
            </div>
            <div className="CartBottomSummery">
              <Paypal />

              <h1 className="SummaryTitle"> ORDER SUMMERY </h1>
              <div className="SummeryItem">
                <span className="SummeryItemText">Subtotal</span>
                <span id='total-price-1' className="SummeryItemanount"></span>
              </div>
              <div className="SummeryItem">
                <span className="SummeryItemText">Estimated shiping</span>
                <span className="SummeryItemanount">$0</span>
              </div>
              <div className="SummeryItem">
                <span className="SummeryItemText">discont</span>
                <span className="SummeryItemanount">$0</span>
              </div>
              <div className="SummeryItem">
                <span className="SummeryItemText bigger">total</span>
                <span id='total-price-2' className="SummeryItemanount"></span>
              </div>

       
 
    {/* <button onClick={onBuyClick} className="SummeryButton">Checkout Now</button> */}
    <button onClick={onBuyClick} className="SummeryButton">Checkout Now</button>
    <div id="popup"></div>
    
    
    


            </div>
          </div>
        </div>
        <br /> <br /> <br />
        <Footer />
      </div>
    </>
  );
};

export default Cart;
