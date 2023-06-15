import React, { useRef } from 'react'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { useState } from 'react';
import { Link } from 'react-scroll'


import './style.css'

const Slider = ({ data }) => {
  const [ slideindex, setSlideindex ] = useState(0);
  
  function handleClick(direction) {
    if(direction==="left")
    {
      setSlideindex(slideindex>0 ?slideindex-1 : 2);
    }
    else{
      setSlideindex(slideindex<2 ?slideindex+1 : 0);
    }
  };

  const curr = data.filter((item) => item.slider === "slider");

  return (
    <div className='container3'>
        <div
         className="Leftarrow" onClick={()=>handleClick("left")}>
            <KeyboardArrowLeftOutlinedIcon/>
        </div>
        <div 
        style={{
          transform: `translatex(${slideindex*-100}vw)`
          }} 
          className="Wrapper2" slideindex={slideindex}>
            {/* change her */}
          {curr.map((item, index) => (
            
          <div key={index} className="slide" >
            <div className="imgcon">
             
                <img className='Image' src={item.img} alt='' />
            </div>
            <div className="infocon">

              <h1 className="Title">{item.title}</h1>
              <p className="desc"> {item.desc} </p>
              <div>
                <Link to ="scroll" spy={true} smooth={true} offset={10} duration={500} >
                  <button className='but'>shop now</button>
                </Link>
              {/* I wrapped the categories component in a div id called scroll that gives me the location to acroll to */}
              </div>
            </div>
          </div>
         ))}
      
     
          
        </div>
        <div className="rightarrow" onClick={()=> {handleClick("right")}}>
            <ArrowRightOutlinedIcon/>
        </div>
    </div>
  )
}

export default Slider