import { useState } from 'react';

// const STATE_INPROGRESS = {
//   foodIds: [],
//   drinkIds: [],
// };

const RecipeDetailsContext = () => {
  const [foodDetails, setfoodDetails] = useState({});
  const [drinkDetails, setDrinkDetails] = useState({});
  const [allFoodRecipes, setAllFoodRecipes] = useState({});
  const [allDrinkRecipes, setAllDrinkRecipes] = useState({});

  const recipeDetailsContext = {
    foodDetails,
    setfoodDetails,
    drinkDetails,
    setDrinkDetails,
    allFoodRecipes,
    setAllFoodRecipes,
    allDrinkRecipes,
    setAllDrinkRecipes,
  };

  return (recipeDetailsContext);
};

export default RecipeDetailsContext;
