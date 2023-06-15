import { Add, Countertops, Remove } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import Annoucement from '../components/Annoucement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartProvider' 
import ThreeDots from './ThreeDots'
import{useLoggedIn} from '../context/LoggedProvider';

import ConfirmAdministration from '../components/confirmadministration';

export default function BestProductsPage({data}) {
    
    let [counter, setCounter] = useState(0);
        let pi;
    const [Selected, setSelected] = useState("");

    let select  = window.location.pathname.split('/')[2]; //selected item

    const { type } = useParams(); //id of the item
 
    const {best} = useParams();
    
    const navigate = useNavigate();

    const curr = data.filter((item) => item.title === type);
    
    const currItem = curr.find((item2) => { 
        if(String(item2.id) === String(select)) {
         
            return item2;
        }
    });
    
  

    // let { user } = useLoggedIn();
    let user = localStorage.getItem('user');

    let userEmail = 'default';

    try {
        // Check type of user
        if(typeof user !== 'string') {
            user = JSON.stringify(user);
        }

        if(String(user).length > 3) {
          const regex = /"email":"([^"]+)"/;
          const matchEmail = user.match(regex);
          userEmail = matchEmail[1];

        }
    }
    catch{
    // pass
    }

    
    let cart = '';

    if(userEmail === 'default') {
        if(localStorage.getItem(`cart-${userEmail}`))
            cart = localStorage.getItem(`cart-${userEmail}`);
    }
    else{
        if(localStorage.getItem(`cart-${userEmail}`))
            cart = localStorage.getItem(`cart-${userEmail}`); //משווים לקארט
    }
    
    cart = JSON.parse(cart);

    

    function add()
    {
        setCounter(counter+1)
    }

    function minus()
    {
        if(counter!==0)
        {
        setCounter(counter-1)
        }
        else
        {
         setCounter(counter)
        }
    }

    function HandleAddToCart(e)
    {
        e.preventDefault();
          
        let fuoundIndex;
      
        if(String(cart).length > 3) {
            fuoundIndex = cart.findIndex((item)=> item.id === currItem.id);
        }
        else
            fuoundIndex = -1;

     

        if(fuoundIndex !== -1){
           cart[fuoundIndex].count = cart[fuoundIndex].count + counter;
        }
        else
        {
            let newItem = {...currItem};
            newItem.count = counter;
            newItem.select = Selected;

            if(String(cart).length > 3)
            {
                cart = JSON.parse(JSON.stringify(cart));
            }
            else {   
                cart = [];
            }

            cart.push(newItem);     
          
        }
       
        // If user logged in add to his cart if not add to default
        if(String(user).length > 3) {
            // Remove the old cart from local storage
            localStorage.removeItem(`cart-${userEmail}`)


            // Create the updated cart
            localStorage.setItem(`cart-${userEmail}`, JSON.stringify(cart));
        }
        else {
            // Remove the old cart from local storage
            localStorage.removeItem(`cart-default`);

            // Create the updated cart
            localStorage.setItem(`cart-default`, JSON.stringify(cart));
        }
     
        
        navigate('/Cart');
    }
    
    
    if(!currItem) {
   
        return ( <ThreeDots/>)
    }


    ConfirmAdministration();

  return (
    <>
    <div className="productCon">
        <Navbar/>
        <br/>
        <Annoucement/>
        <div className="ReturnCon">
          <Link className='btn btn-primary' to={"/"}> return</Link>
    </div>
          <div className="wrapper">
            <div className="ImgContainer">
                <img className='Image' src={currItem.img} alt="" />
            </div>
                <div className="InfoContainer">
                    <h1 className='TitleCon'> {currItem.title}</h1>
                    <p className='descCon'> {currItem.description}</p>
                    <span className='PriceCon'>{currItem.price}$</span>

                    <div className="FilterContainer">
                       
                        <div className="Filter">

                        <span className="FiltetTitle">Size</span>
                          <select  className="FilterSize" onChange={e => setSelected(e.target.value)} defaultValue="">
                            <option disabled value="">select size</option>
                            <option className='FilterSizeOption' value="XS">XS</option>
                            <option className='FilterSizeOption' value="S">S</option>
                            <option className='FilterSizeOption'value="M">M</option>
                            <option className='FilterSizeOption'value="L">L</option>  
                            <option className='FilterSizeOption'value="XL">XL</option>                
                          </select> 
                        </div>
                    </div>
                    <div className="AddContainer">
                        <div className="AmountContainer">
                            <Remove  className='icon' onClick={() =>minus()}/>
                            <span className='Amount'>{counter}</span>
                            <Add className='icon' onClick={() => add()}/>
                        </div>
                         <button className='ProductButton' onClick={(e) => HandleAddToCart(e)}>Add To Cart</button>
                    </div>
                </div>
            </div>  
        <Newsletter/>
        <Footer/>
    </div>
</>

    )
}
