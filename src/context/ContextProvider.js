import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const ContextProvider = ({ children }) => {
  const context = {
    
  };
  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.element,
};

ContextProvider.defaultProps = {
  children: <>default</>,
};

export default ContextProvider;
