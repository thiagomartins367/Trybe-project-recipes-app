import React from 'react';
import StartRecipeButton from './startRecipeButton';
import ContinueRecipeButton from './continueRecipeButton';
import FinishButton from './finishButton';

const verifyProgress = (recipe, recipeType) => {
  const returnStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const [recipeDesctructuring] = [...recipe];
  if (returnStorage) {
    if (recipeType === 'food') {
      const { idMeal } = recipeDesctructuring;
      const idFoodInProgress = Object.keys(returnStorage.meals);
      const searchFoodId = idFoodInProgress.some((id) => idMeal === id);
      return searchFoodId;
    }
    const { idDrink } = recipeDesctructuring;
    const idDrinkInProgress = Object.keys(returnStorage.cocktails);
    const searchDrinkId = idDrinkInProgress.some((id) => idDrink === id);
    return searchDrinkId;
  }
  return false;
};

const verifyDone = () => {
  const returnStorage = JSON.parse(localStorage.getItem('DoneRecipes'));
  if (returnStorage) {
    const idRecipeInProgress = Object.keys(returnStorage[mealsOrCook]);
    const searcRecipeId = idRecipeInProgress.some((id) => idRecipe === id);
    return searcRecipeId;
  }
  return false;
};

const StartContinueFinishButton = (recipe, recipeType) => {
  if (verifyProgress(recipe, recipeType)) {
    return (<ContinueRecipeButton recipe={ recipe } recipeType={ recipeType } />);
  }
  if (verifyDone()) {
    return (<FinishButton recipe={ recipe } recipeType={ recipeType } />);
  }
  return (<StartRecipeButton recipe={ recipe } recipeType={ recipeType } />);
};

export default StartContinueFinishButton;
