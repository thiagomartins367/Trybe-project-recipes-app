import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';

const addFinishRecipe = (finishRecipeStore) => {
  const returnStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  if (returnStorage) {
    localStorage.setItem('doneRecipes', JSON.stringify(
      [...returnStorage, ...finishRecipeStore],
    ));
  }
  localStorage.setItem('doneRecipes', JSON.stringify(finishRecipeStore));
};

function FinishButton({ recipe, recipeType }) {
  const history = useHistory();
  const { finishRecipe, setRemoveButtonFinish } = useContext(Context);
  const redirectDoneRecipe = () => {
    const date = new Date();
    const dateDay = String(date.getDate()).padStart(2, '0');
    const dateMonth = String(date.getMonth() + 1).padStart(2, '0');
    const dateYear = String(date.getFullYear());
    const doneDate = `${dateDay}/${dateMonth}/${dateYear}`;
    const finishRecipeStore = [{
      id: recipe[0].idMeal || recipe[0].idDrink,
      type: recipeType,
      nationality: recipe[0].strArea || '',
      category: recipe[0].strCategory || '',
      alcoholicOrNot: recipe[0].strAlcoholic || '',
      name: recipe[0].strMeal || recipe[0].strDrink,
      image: recipe[0].strMealThumb || recipe[0].strDrinkThumb,
      doneDate,
      tags: [recipe[0].strTags] || '',
    }];
    addFinishRecipe(finishRecipeStore);
    setRemoveButtonFinish(true);
    history.push('/done-recipes');
  };

  return (
    <button
      type="button"
      disabled={ finishRecipe }
      data-testid="finish-recipe-btn"
      className="finish-recipe-button"
      style={ { position: 'fixed', bottom: 0 } }
      onClick={ () => redirectDoneRecipe() }
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
