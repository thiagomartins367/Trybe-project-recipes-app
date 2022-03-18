import React from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function FinishButton({ recipe, recipeType }) {
  const history = useHistory();
  const redirectRecipeProgress = () => {
    console.log(recipe);
    console.log(recipeType);
    console.log(history);
    // localStorage.setItem('inProgressRecipes', JSON.stringify(foodStorage));
    // const idRecipeFood = recipe[0].idMeal;
    // history.push('/done-recipes');
  };

  return (
    <button
      type="button"
      disabled
      data-testid="finish-recipe-btn"
      style={ { position: 'fixed', bottom: 0 } }
      onClick={ () => redirectRecipeProgress() }
    >
      Done Recipe
    </button>
  );
}

FinishButton.propTypes = {
  recipe: propTypes.string,
  recipeType: propTypes.string,
}.isRequired;

export default FinishButton;
