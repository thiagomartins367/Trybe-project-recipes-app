import React from 'react';
import StartRecipeButton from '../components/recipesDetails/startRecipeButton';
import ContinueRecipeButton from '../components/recipesDetails/continueRecipeButton';

const StartContinueFinishButton = (recipe, recipeType) => {
  const { idMeal } = recipe[0];
  // console.log(recipe);
  // console.log(recipeType);
  // console.log(idMeal);
  const returnStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log(returnStorage);
  if (returnStorage === null) {
    console.log('entrou aqui !');
    return (<StartRecipeButton recipe={ recipe } recipeType={ recipeType } />);
  }
  const idRecipesInProgress = Object.keys(returnStorage.meals);
  const searchId = idRecipesInProgress.some((id) => idMeal === id);
  if (searchId) {
    console.log('entrou aqui!!');
    return (<ContinueRecipeButton />);
  }
  console.log('entrou aqui !!!');
  return (<StartRecipeButton recipe={ recipe } recipeType={ recipeType } />);
};

export default StartContinueFinishButton;
