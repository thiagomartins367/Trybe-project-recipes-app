import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import ContextRecipesScreen from './ContextRecipesScreen/ContextRecipesScreen';
import ContextLogin from './ContextLogin/ContextLogin';

const ContextProvider = ({ children }) => {
  const { contextRecipesObj } = ContextRecipesScreen();
  const { contextLoginObj } = ContextLogin();

  const context = {
    ...contextRecipesObj, ...contextLoginObj,
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
