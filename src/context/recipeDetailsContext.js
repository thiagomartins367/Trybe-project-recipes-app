import { useState } from 'react';

const RecipeDetailsContext = () => {
  const [foodDetails, setfoodDetails] = useState({});
  const [drinkDetails, setDrinkDetails] = useState({});
  const [allFoodRecipes, setAllFoodRecipes] = useState({});
  const [allDrinkRecipes, setAllDrinkRecipes] = useState({});
  const [favorite, setFavorite] = useState();
  const [linkCopied, setLinkCopied] = useState(false);

  const recipeDetailsContext = {
    foodDetails,
    setfoodDetails,
    drinkDetails,
    setDrinkDetails,
    allFoodRecipes,
    setAllFoodRecipes,
    allDrinkRecipes,
    setAllDrinkRecipes,
    favorite,
    setFavorite,
    linkCopied,
    setLinkCopied,
  };

  return { recipeDetailsContext };
};

export default RecipeDetailsContext;
