import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { CardGroup } from 'react-bootstrap';
import fetchRecipesAPI from '../../services/fetchRecipesAPI';
import RecipeCard from './recipeCard';

const QUANTITY_RECOMMENDATIONS = 3;

function RecomentationRecipe({ urlRecipesApi, stateContext, setStateContext }) {
  useEffect(() => {
    fetchRecipesAPI(urlRecipesApi)
      .then((data) => setStateContext(data));
  }, []);

  const { drinks } = stateContext;
  const { meals } = stateContext;

  const chosenIndices = [];
  const arrFilter = (drinks || meals) && (drinks || meals)
    .map((_element, elementIndex, array) => {
      let result = null;
      if (elementIndex < QUANTITY_RECOMMENDATIONS) {
        let randomIndex = 0;
        for (let index = 0; index < 1; index += 1) {
          randomIndex = Math.floor(Math.random() * array.length);
          randomIndex = randomIndex === array.length ? array.length - 1 : randomIndex;
          chosenIndices.push(randomIndex);
          if (chosenIndices.includes(randomIndex)) {
            index = 0;
          }
        }
        result = array[randomIndex];
      }
      return result;
    })
    .filter((recipe) => recipe !== null)
    .filter((_recipe, index) => index < QUANTITY_RECOMMENDATIONS);

  return (
    <div className="carousel">
      <CardGroup className="carouselGroup">
        {arrFilter && arrFilter.map((recipe, i) => (
          <RecipeCard
            key={ recipe.idDrink || recipe.idMeal }
            title={ recipe.strDrink || recipe.strMeal }
            classCards="recomendation-card"
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
