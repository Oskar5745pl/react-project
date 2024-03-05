import React, { useState } from 'react';

const SortingDropdown: React.FC<{ onSort: (sortOption: string) => void }> = ({ onSort }) => {
  const [sortOption, setSortOption] = useState('');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const applySort = () => {
    onSort(sortOption);
  };

  return (
    <div>
      {/* <select value={sortOption} onChange={handleSortChange}> */}
        {/* Define sorting options */}
      {/* </select> */}
      <button onClick={applySort} className='searchOptionBtns'>Sort By</button>
    </div>
  );
};

export default SortingDropdown;
