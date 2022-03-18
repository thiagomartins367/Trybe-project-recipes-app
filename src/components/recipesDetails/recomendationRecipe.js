import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { CardGroup } from 'react-bootstrap';
import fetchRecipesAPI from '../../services/fetchRecipesAPI';
import RecipeCard from './recipeCard';

const NUMBER_FIVE = 5;

function RecomentationRecipe({ urlRecipesApi, stateContext, setStateContext }) {
  useEffect(() => {
    fetchRecipesAPI(urlRecipesApi)
      .then((data) => setStateContext(data));
  }, []);

  const { drinks } = stateContext;
  const { meals } = stateContext;

  const arrFilter = (drinks || meals) && (drinks || meals)
    .filter((_recipe, index) => index <= NUMBER_FIVE);

  return (
    <div className="carousel">
      <CardGroup className="carouselGroup">
        {arrFilter && arrFilter.map((recipe, i) => (
          <RecipeCard
            key={ recipe.idDrink || recipe.idMeal }
            title={ recipe.strDrink || recipe.strMeal }
            image={ recipe.strDrinkThumb || recipe.strMealThumb }
            category={ recipe.strAlcoholic || recipe.strCategory }
            testid={ `${[i]}-recomendation-card` }
          />
        ))}
      </CardGroup>
    </div>
  );
}

RecomentationRecipe.propTypes = {
  urlRecipesApi: propTypes.string,
}.isRequired;

export default RecomentationRecipe;
