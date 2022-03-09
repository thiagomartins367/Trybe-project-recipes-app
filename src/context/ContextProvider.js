import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import ContextRecipesScreen from './ContextRecipesScreen';

const ContextProvider = ({ children }) => {
  const {
    stateFoodsRecipes,
    setFoodsRecipes,
    stateFoodRecipesCategories,
    setFoodRecipesCategories,
    stateDrinksRecipes,
    setDrinksRecipes,
    stateDrinkRecipesCategories,
    setDrinkRecipesCategories,
  } = ContextRecipesScreen();
  const context = {
    stateFoodsRecipes,
    setFoodsRecipes,
    stateFoodRecipesCategories,
    setFoodRecipesCategories,
    stateDrinksRecipes,
    setDrinksRecipes,
    stateDrinkRecipesCategories,
    setDrinkRecipesCategories,
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
