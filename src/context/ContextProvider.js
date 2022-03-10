import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import ContextRecipesScreen from './ContextRecipesScreen/ContextRecipesScreen';

const ContextProvider = ({ children }) => {
  const { contextRecipesObj } = ContextRecipesScreen();
  const context = {
    ...contextRecipesObj,
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
