import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import RecipeDetails from '../components/recipesDetails/recipeDetails';
import StartContinueFinishButton from
'../components/recipesDetails/startContinueFinishButton';
import Context from '../context/Context';
import fetchRecipesAPI from '../services/fetchRecipesAPI';
import BackButton from '../components/recipesDetails/backButton';

function RecipeInProgress({ match, recipeType, pageName }) {
  const { idRecipe } = match.params;
  const {
    foodDetails,
    setfoodDetails,
    drinkDetails,
    setDrinkDetails,
  } = useContext(Context);
  useEffect(() => {
    if (recipeType === 'food') {
      fetchRecipesAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`)
        .then((data) => setfoodDetails(data));
    } if (recipeType === 'drink') {
      fetchRecipesAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`)
        .then((data) => setDrinkDetails(data));
    }
  }, []);

  const { drinks } = drinkDetails;
  const { meals } = foodDetails;
  const recipeProgress = meals || drinks;

  return (
    <section>
      {recipeProgress && recipeProgress.map((recipe, index) => (
        <RecipeDetails
          key={ index }
          recipe={ recipe }
          page="progress"
          recipeType={ recipeType }
        />
      )) }
      <section>
        <BackButton destinationRoute={ `/${recipeType}s` } />
        {
          recipeProgress
          && StartContinueFinishButton(recipeProgress, recipeType, pageName)
        }
      </section>
    </section>
  );
}

RecipeInProgress.propTypes = {
  idRecipe: propTypes.string,
}.isRequired;

export default RecipeInProgress;
