import React from 'react';
import StartRecipeButton from './startRecipeButton';
import ContinueRecipeButton from './continueRecipeButton';
import FinishButton from './finishButton';

const verifyProgress = (recipe, recipeType) => {
  let returnStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (returnStorage === null) {
    returnStorage = {
      meals: {},
      cocktails: {},
    };
  }
  if (returnStorage.meals === undefined) {
    returnStorage.meals = {};
  } else if (returnStorage.cocktails === undefined) {
    returnStorage.cocktails = {};
  }
  if (!returnStorage) {
    return <StartRecipeButton recipe={ recipe } recipeType={ recipeType } />;
  }
  const [recipeDesctructuring] = [...recipe];
  if (recipeType === 'food') {
    const { idMeal } = recipeDesctructuring;
    const idFoodInProgress = Object.keys(returnStorage.meals);
    const searchFoodId = idFoodInProgress.some((id) => idMeal === id);
    if (searchFoodId) {
      return (<ContinueRecipeButton recipe={ recipe } recipeType={ recipeType } />);
    } return (<StartRecipeButton recipe={ recipe } recipeType={ recipeType } />);
  }
  if (recipeType === 'drink') {
    const { idDrink } = recipeDesctructuring;
    const idDrinkInProgress = Object.keys(returnStorage.cocktails);
    const searchDrinkId = idDrinkInProgress.some((id) => idDrink === id);
    if (searchDrinkId) {
      return (<ContinueRecipeButton recipe={ recipe } recipeType={ recipeType } />);
    } return (<StartRecipeButton recipe={ recipe } recipeType={ recipeType } />);
  }
};

const StartContinueFinishButton = (recipe, recipeType, pageName) => {
  if (pageName === 'details') {
    return verifyProgress(recipe, recipeType);
  }
  if (pageName === 'progress') {
    return (<FinishButton recipe={ recipe } recipeType={ recipeType } />);
  }
};

export default StartContinueFinishButton;
