import React from 'react';
import propTypes from 'prop-types';
import RecipeCard from './recipeCard';
import FavoriteButton from './favoriteButton';
import ShareButton from './shareButton';
import IngredientList from './ingredientList';
import IngredientListCheck from './ingredientListCheck';

function RecipeDetails({ recipe, page, recipeType }) {
  return (
    <section>
      <div className="main-recipe-card">
        <RecipeCard
          title={ recipe.strMeal || recipe.strDrink }
          image={ recipe.strMealThumb || recipe.strDrinkThumb }
          category={ recipe.strAlcoholic || recipe.strCategory }
        />
      </div>
      <section className="section-buttons-share-favorite">
        <FavoriteButton recipe={ recipe } />
        <ShareButton />
      </section>
      {page === 'details'
        ? <IngredientList recipe={ recipe } />
        : <IngredientListCheck recipe={ recipe } recipeType={ recipeType } />}
      <section className="section-instructions">
        <h4>
          Instructions
        </h4>
        <p data-testid="instructions">
          {recipe.strInstructions}
        </p>
      </section>
      {recipe.strYoutube && (
        <div className="div-video">
          <iframe
            data-testid="video"
            width="100%"
            height="425"
            title={ recipe.strMeal }
            src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
          />
        </div>
      )}
      { page === 'progress' && <div style={ { height: '60px' } } /> }
    </section>
  );
}

RecipeDetails.propTypes = {
  recipe: propTypes.objectOf(propTypes.string),
}.isRequired;

export default RecipeDetails;
