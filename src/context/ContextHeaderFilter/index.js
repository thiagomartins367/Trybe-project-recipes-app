import { useState } from 'react';

const ContextHeaderFilter = () => {
  const [searchFilter, setSearchFilter] = useState('');

  const contextHeaderFilterObj = {
    searchFilter,
    setSearchFilter,
  };

  return { contextHeaderFilterObj };
};

export default ContextHeaderFilter;
