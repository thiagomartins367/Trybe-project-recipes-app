import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const verifyFavorite = (recipe) => {
  const returnStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (returnStorage) {
    const idRecipe = recipe.idMeal || recipe.idDrink;
    const searchIdFavorite = returnStorage.some(({ id }) => id === idRecipe);
    return searchIdFavorite;
  }
  return false;
};

function FavoriteButton({ recipe }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(verifyFavorite(recipe));
  }, []);

  const addFavoriteRecipeBtn = () => {
    const idRecipe = recipe.idMeal || recipe.idDrink;
    const returnStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favorite) {
      // retira dos favoritos
      const filterIdfavorite = returnStorage.filter(({ id }) => id !== idRecipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterIdfavorite));
      setFavorite(false);
    } else {
      // adiciona aos favoritos
      const recipeStorage = [
        ...returnStorage, {
          id: recipe.idMeal || recipe.idDrink,
          type: recipe.idMeal ? 'food' : 'drink',
          nationality: recipe.strArea || '',
          category: recipe.strCategory || '',
          alcoholicOrNot: recipe.strAlcoholic || '',
          name: recipe.strMeal || recipe.strDrink,
          image: recipe.strMealThumb || recipe.strDrinkThumb,
        }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(recipeStorage));
      setFavorite(true);
    }
  };

  return (
    <div className="div-favorite-btn">
      <button
        type="button"
        className="favorite-btn"
        onClick={ () => addFavoriteRecipeBtn() }
      >
        <img
          data-testid="favorite-btn"
          className="favorite-btn-img"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite-btn"
        />
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {
  recipe: propTypes.objectOf(propTypes.string),
}.isRequired;

export default FavoriteButton;
