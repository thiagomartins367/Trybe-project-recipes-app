import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import RecipeDetailsContext from './recipeDetailsContext';
import ContextRecipesScreen from './ContextRecipesScreen/ContextRecipesScreen';
import ContextLogin from './ContextLogin/ContextLogin';
import ContextProfile from './ContextProfile/ContextProfile';

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
    favorite,
    setFavorite,
  } = RecipeDetailsContext();

  const contextRecipeDetailsContext = {
    foodDetails,
    setfoodDetails,
    drinkDetails,
    setDrinkDetails,
    allFoodRecipes,
    setAllFoodRecipes,
    allDrinkRecipes,
    setAllDrinkRecipes,
    favorite,
    setFavorite,
  };

const ContextProvider = ({ children }) => {
  const { contextRecipesObj } = ContextRecipesScreen();
  const { contextLoginObj } = ContextLogin();
  const { contextProfileObj } = ContextProfile();

  const context = {
    ...contextRecipesObj,
    ...contextLoginObj,
    ...contextProfileObj,
    ...contextRecipeDetailsContext,
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
