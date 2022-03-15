import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import ContextRecipesScreen from './ContextRecipesScreen/ContextRecipesScreen';
import ContextLogin from './ContextLogin/ContextLogin';
import ContextProfile from './ContextProfile/ContextProfile';
import ContextHeaderFilter from './ContextHeaderFilter';

const ContextProvider = ({ children }) => {
  const { contextRecipesObj } = ContextRecipesScreen();
  const { contextLoginObj } = ContextLogin();
  const { contextProfileObj } = ContextProfile();
  const { contextHeaderFilterObj } = ContextHeaderFilter();

  const context = {
    ...contextRecipesObj,
    ...contextLoginObj,
    ...contextProfileObj,
    ...contextHeaderFilterObj,
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
