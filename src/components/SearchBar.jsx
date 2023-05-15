// import React, { useState } from "react";
// import styles from '../components/pages/homecss.module.css'
// import iconeSearch from '../images/icone search.png'

// const SearchBar = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearch = () => {
//     onSearch(searchTerm);
//   };

//   return (
//     <div className={styles.search_bar}>
//       <input className={styles.campo_pesquisa}
//         type="search"
//         name="search"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={handleInputChange}
//       />
//       <button type="submit" onClick={handleSearch}><img src={iconeSearch} alt="Pesquisa"></img></button>
//     </div>
//   );
// };

// export default SearchBar;
