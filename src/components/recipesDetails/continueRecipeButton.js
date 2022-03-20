import React from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';

function ContinueRecipeButton({ recipe, recipeType }) {
  const history = useHistory();
  const redirectRecipeProgress = () => {
    if (recipeType === 'food') {
      const idRecipeFood = recipe[0].idMeal;
      history.push(`/foods/${idRecipeFood}/in-progress`);
    } else {
      const idRecipeDrink = recipe[0].idDrink;
      history.push(`/drinks/${idRecipeDrink}/in-progress`);
    }
  };
  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      style={ { position: 'fixed', bottom: 0 } }
      onClick={ () => redirectRecipeProgress() }
    >
      Continue Recipe
    </button>
  );
}

ContinueRecipeButton.propTypes = {
  recipe: propTypes.string,
  recipeType: propTypes.string,
}.isRequired;

export default ContinueRecipeButton;
