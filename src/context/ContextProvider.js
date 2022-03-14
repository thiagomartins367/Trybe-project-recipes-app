import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import RecipeDetailsContext from './recipeDetailsContext';

const ContextProvider = ({ children }) => {
  const {
    foodDetails,
    setfoodDetails,
    drinkDetails,
    setDrinkDetails,
    allFoodRecipes,
    setAllFoodRecipes,
    allDrinkRecipes,
    setAllDrinkRecipes,
  } = RecipeDetailsContext();

  const context = {
    foodDetails,
    setfoodDetails,
    drinkDetails,
    setDrinkDetails,
    allFoodRecipes,
    setAllFoodRecipes,
    allDrinkRecipes,
    setAllDrinkRecipes,
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
