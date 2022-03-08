import { useEffect, useState } from 'react';
import fetchRecipesAPI from '../services/fetchRecipesAPI';

const ContextRecipesScreen = () => {
  const [stateDrinksRecipes, setDrinksRecipes] = useState({});
  const [stateFoodsRecipes, setFoodsRecipes] = useState({});

  useEffect(() => {
    fetchRecipesAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((data) => setFoodsRecipes(data));
    fetchRecipesAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((data) => setDrinksRecipes(data));
  }, []);

  const contextRecipesObj = {
    stateFoodsRecipes,
    setFoodsRecipes,
    stateDrinksRecipes,
    setDrinksRecipes,
  };

  return contextRecipesObj;
};

export default ContextRecipesScreen;
