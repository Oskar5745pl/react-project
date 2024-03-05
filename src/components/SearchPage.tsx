import React, { useState } from 'react';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import SortingDropdown from './SortingDropdown';
import ProductList from './ProductList';
import './SearchPage.css'
const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<any>({});
  const [sortOption, setSortOption] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Make API call to fetch search results based on query, filters, and sortOption
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Make API call to fetch search results based on query, newFilters, and sortOption
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    // Make API call to fetch search results based on query, filters, and option
  };

  return (
    <div className='searchPage'>
      <div className='searchSection'>
        <div className='searchBar'>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className='searchOptions'>
          <FilterPanel onFilter={handleFilterChange} />
          <SortingDropdown onSort={handleSortChange} />
          
        </div>
        
      </div>
      
      {/* <ProductList searchQuery={searchQuery} filters={filters} sortOption={sortOption} /> */}
    </div>
  );
};

export default SearchPage;