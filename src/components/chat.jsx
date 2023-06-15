// const Navbar = ({ data }) => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
  
//     useEffect(() => {
//       setSearchResults(
//         data.filter(item =>
//           item.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     }, [searchTerm, data]);
  
//     const handleSearchInput = event => {
//       setSearchTerm(event.target.value);
//     };
  
//     return (
//       <div style={{}} className="container">
//         <div className="Wrapper">
//           <div className="left">
//             <span className="language">en</span>
//             <div className="search-container">
//               <input
//                 className="Input"
//                 type="text"
//                 placeholder="Search"
//                 value={searchTerm}
//                 onChange={handleSearchInput}
//               />
//               <SearchIcon />
//             </div>
//           </div>
//           <div className="center">
//             <h1 className="Logo">NETA</h1>
//           </div>
//           <div className="right">
//             <Link to={"/Register"}>
//               <div className="menuitem">REGISTER</div>
//             </Link>
//             <Link to={"/Login"}>
//               <div className="menuitem">SIGN IN</div>
//             </Link>
//             <Link to={"/Cart"}>
//               <div className="menuitem">
//                 <Badge badgeContent={1000} color="primary">
//                   <ShoppingCartOutlinedIcon color="action" />
//                 </Badge>
//               </div>
//             </Link>
//           </div>
//         </div>
//         <Card data={searchResults} />
//       </div>
//     );
//   };
  