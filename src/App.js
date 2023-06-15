import SelectedCategorie from "./components/SelectedCategorie";
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart"
import ProductsPage from "./pages/ProductsPage";
import ProductList from "./pages/ProductList"; 
import { useState } from "react";
import { useEffect } from "react";
import BestProductsPage from "./pages/BestProductsPage";
import Search from "./pages/Search";
import SentEmail from "./components/SentEmail";

function App() {
  const[products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/63ce44e0ace6f33a22c5d5c2")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
       let obj =[];
        for (const key in data.record) {
          obj = [...obj, ...data.record[key]]
        }
        
        setProducts(obj);
      });
    }, []);
    
    return (     
     <div >
        <Routes>
        
          <Route path="/" element={<Home  />}></Route>
          <Route path="/:type" element={<SelectedCategorie  data= {products}/>}></Route>
          <Route path="/:type/:select" element={<ProductsPage  data= {products} />}></Route>
          {/* type= selected item, select the id of this item */}
          <Route path="/BestProductsPage/:best" element={<BestProductsPage  data= {products}/>}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
          <Route path="/ProductList" element={<ProductList  data= {products}/>}></Route>
          <Route path="/Search" element={<Search />}></Route>

          <Route path="/Login" element={<Login />}></Route>

          <Route path="/Register" element={<Register />}></Route>
          <Route path="/SentEmail" element={<SentEmail />}></Route>

        </Routes> 
    </div>  
  );
}

export default App;



