// src/components/Search/index.jsx
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Search({ onSearch }) {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch categories when component mounts
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(['All', ...data]))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchClick = () => {
    if (typeof onSearch === 'function') {
      onSearch(searchTerm, selectedCategory); // Call the function passed as a prop
    } else {
      console.error('onSearch is not a function');
    }
  };

  return (
    <div className="search-container">
      <select
        className="category-dropdown"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a product"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
}
