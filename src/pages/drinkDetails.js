import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import RecipeDetails from '../components/recipesDetails/recipeDetails';
import Context from '../context/Context';
import fetchRecipesAPI from '../services/fetchRecipesAPI';
import RecomentationRecipe from '../components/recipesDetails/recomendationRecipe';
import StartRecipeButton from '../components/recipesDetails/startRecipeButton';

function DrinkDetails({ match: { params } }) {
  const drinkIdDetails = params.slug;
  const {
    drinkDetails,
    setDrinkDetails,
    allDrinkRecipes,
    setAllDrinkRecipes,
  } = useContext(Context);

  useEffect(() => {
    fetchRecipesAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkIdDetails}`)
      .then((data) => setDrinkDetails(data));
  }, []);

  const { drinks } = drinkDetails;
  const urlFoodRecipes = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  return (
    <div>
      {drinks && drinks.map((drink) => (
        <RecipeDetails key={ drink.idDrink } recipe={ drink } />
      )) }
      <RecomentationRecipe
        urlRecipesApi={ urlFoodRecipes }
        stateContext={ allDrinkRecipes }
        setStateContext={ setAllDrinkRecipes }
      />
      {drinks && <StartRecipeButton recipe={ drinks } recipeType="drink" />}
    </div>
  );
}

DrinkDetails.propTypes = {
  slug: propTypes.string,
}.isRequired;

export default DrinkDetails;
