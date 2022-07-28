import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import RecipeDetails from '../components/recipesDetails/recipeDetails';
import Context from '../context/Context';
import fetchRecipesAPI from '../services/fetchRecipesAPI';
import RecomentationRecipe from '../components/recipesDetails/recomendationRecipe';
import StartContinueFinishButton from
'../components/recipesDetails/startContinueFinishButton';
import BackButton from '../components/recipesDetails/backButton';

function FoodDetails({ match, pageName }) {
  const { idRecipe } = match.params;
  const {
    foodDetails,
    setfoodDetails,
    allFoodRecipes,
    setAllFoodRecipes,
  } = useContext(Context);

  useEffect(() => {
    fetchRecipesAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`)
      .then((data) => setfoodDetails(data));
  }, []);

  const { meals } = foodDetails;
  const urlDrinkRecipes = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const recipeType = 'food';

  return (
    <section>
      {meals && meals.map((food) => (
        <RecipeDetails key={ food.idMeal } recipe={ food } page={ pageName } />
      )) }
      <RecomentationRecipe
        urlRecipesApi={ urlDrinkRecipes }
        stateContext={ allFoodRecipes }
        setStateContext={ setAllFoodRecipes }
      />
      <br />
      <br />
      <br />
      <section>
        <BackButton destinationRoute="/foods" />
        {meals && StartContinueFinishButton(meals, recipeType, pageName)}
      </section>
    </section>
  );
}

FoodDetails.propTypes = {
  slug: propTypes.string,
}.isRequired;

export default FoodDetails;
