import React from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
// import IngredientOrganization from '../../services/ingredientOrganization';

function StartRecipeButton({ recipe, recipeType }) {
  const history = useHistory();
  // const ingredientList = IngredientOrganization(recipe[0]);

  const addFirstStorage = () => {
    if (recipeType === 'food') {
      const foodStorage = {
        meals: { [recipe[0].idMeal]: [] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(foodStorage));
      const idRecipeFood = recipe[0].idMeal;
      history.push(`/foods/${idRecipeFood}/in-progress`);
    } else {
      const drinkStorage = {
        cocktails: { [recipe[0].idDrink]: [] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(drinkStorage));
      const idRecipeDrink = recipe[0].idDrink;
      history.push(`/drinks/${idRecipeDrink}/in-progress`);
    }
  };

  const redirectRecipeProgress = () => {
    const returnStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (returnStorage) {
      if (recipeType === 'food') {
        const foodStorage = { ...returnStorage,
          meals: { [recipe[0].idMeal]: [] } };
        localStorage.setItem('inProgressRecipes', JSON.stringify(foodStorage));
        const idRecipeFood = recipe[0].idMeal;
        history.push(`/foods/${idRecipeFood}/in-progress`);
      } else {
        const drinkStorage = { ...returnStorage,
          cocktails: { [recipe[0].idDrink]: [] } };
        localStorage.setItem('inProgressRecipes', JSON.stringify(drinkStorage));
        const idRecipeDrink = recipe[0].idDrink;
        history.push(`/drinks/${idRecipeDrink}/in-progress`);
      }
    } else {
      addFirstStorage();
    }
  };

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-recipe-button"
      style={ { position: 'fixed', bottom: 0 } }
      onClick={ () => redirectRecipeProgress() }
    >
      Start Recipe
    </button>
  );
}

StartRecipeButton.propTypes = {
  recipe: propTypes.string,
  recipeType: propTypes.string,
}.isRequired;

export default StartRecipeButton;
