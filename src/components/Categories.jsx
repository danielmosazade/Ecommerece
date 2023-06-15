import React from 'react'
import {categories} from "../data"
import { Routes,Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

import './style.css'

const Categories = ({data}) => {

  const curr = data.filter((item) => item.father === "father")

  return (
    <div id="scroll">
      {/* id to slider-scroll */}
      <div className="CategoriesCon"> 
      {curr.map((item, index)=>(
        
        <div key={index} className="styledCon">
        <img className='categoriesImg' src={item.img} alt="" />
        <div className="InfoCon">
          <h1 className='CategoriesTitle'>{item.categorie}</h1>
          {/* link to SelectedCaegorie*/}
          <Link to={item.categorie}>
          <button className='CategoriesBut'>shop now</button>  
           </Link>
        </div>
      </div>    ))} 
    </div>
    </div>
  )
}

export default Categories

{/* <Routes>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/users" element={<Users users={users} />}></Route>
        <Route path="/users/:username" element={<EachUser users={users} />}></Route>
</Routes> */}