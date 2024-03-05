import React, { useState } from 'react';

const FilterPanel: React.FC<{ onFilter: (filters: any) => void }> = ({ onFilter }) => {
  const [filters, setFilters] = useState<any>({}); // Define filter state

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  return (
    <div>
      {/* Define filter inputs */}
      <button onClick={applyFilters} className='searchOptionBtns'>Filter</button>
    </div>
  );
};

export default FilterPanel;
