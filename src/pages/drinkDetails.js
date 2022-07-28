import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import RecipeDetails from '../components/recipesDetails/recipeDetails';
import Context from '../context/Context';
import fetchRecipesAPI from '../services/fetchRecipesAPI';
import RecomentationRecipe from '../components/recipesDetails/recomendationRecipe';
import StartContinueFinishButton from
'../components/recipesDetails/startContinueFinishButton';
import BackButton from '../components/recipesDetails/backButton';

function DrinkDetails({ match, pageName }) {
  const { idRecipe } = match.params;
  const {
    drinkDetails,
    setDrinkDetails,
    allDrinkRecipes,
    setAllDrinkRecipes,
  } = useContext(Context);

  useEffect(() => {
    fetchRecipesAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`)
      .then((data) => setDrinkDetails(data));
  }, []);

  const { drinks } = drinkDetails;
  const urlFoodRecipes = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const recipeType = 'drink';

  return (
    <div>
      {drinks && drinks.map((drink) => (
        <RecipeDetails key={ drink.idDrink } recipe={ drink } page={ pageName } />
      )) }
      <RecomentationRecipe
        urlRecipesApi={ urlFoodRecipes }
        stateContext={ allDrinkRecipes }
        setStateContext={ setAllDrinkRecipes }
      />
      <br />
      <br />
      <br />
      <section>
        <BackButton destinationRoute="/drinks" />
        {drinks && StartContinueFinishButton(drinks, recipeType, pageName)}
      </section>
    </div>
  );
}

DrinkDetails.propTypes = {
  idRecipe: propTypes.string,
}.isRequired;

export default DrinkDetails;
