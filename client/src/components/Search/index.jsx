
import { useFilter } from '../Context/FilterContext';

const Search = () => {
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory } = useFilter();

  return (
    <div className="search-container">
      <div className="search-bar">
      <select
        className="category-dropdown"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button">
          {/* <FaSearch /> */}
        </button>
      </div>
    </div>
  );
};

export default Search;
