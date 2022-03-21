import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import {
  searchNationalities,
  searchFoodNationalities } from '../services/fetchNationalities';
import { FIRST_12_RECIPES, MEAL_RECIPES_URL } from '../constants';
import BottomMenu from '../components/BottomMenu';
import RecipeCard from '../components/recipesScreen/RecipeCard';
import fetchRecipesAPI from '../services/fetchRecipesAPI';

function ExploreNationalities() {
  const [nationality, setNationality] = useState([]);
  const [stateActiveFilterNationality, setActiveFilterNationality] = useState('All');
  const [
    stateRecipesAllNationalities,
    setRecipesAllNationalities,
  ] = useState([]);
  const [
    editableStateRecipesByNationalities,
    setEditableStateRecipesByNationalities,
  ] = useState([]);

  useEffect(() => {
    setNationality([{ strArea: 'All' }]);
    searchNationalities()
      .then((data) => setNationality([{ strArea: 'All' }, ...data.meals]));
    fetchRecipesAPI(MEAL_RECIPES_URL)
      .then((data) => setRecipesAllNationalities(data.meals));
  }, []);

  const searchRecipe = async (nat) => {
    setActiveFilterNationality(nat);
    if (nat !== 'All') {
      const response = await searchFoodNationalities(nat);
      const getRecipe = response.meals.slice(0, FIRST_12_RECIPES);
      setEditableStateRecipesByNationalities(getRecipe);
    }
  };

  const recipesData = stateRecipesAllNationalities;

  if (
    recipesData.length >= FIRST_12_RECIPES
    && stateActiveFilterNationality === 'All'
  ) {
    const editableRecipeData = [];
    for (let index = 0; index < FIRST_12_RECIPES; index += 1) {
      editableRecipeData.push(recipesData[index]);
    }
    if (
      editableStateRecipesByNationalities[
        editableStateRecipesByNationalities.length - 1
      ] !== editableRecipeData[editableRecipeData.length - 1]
    ) {
      setEditableStateRecipesByNationalities(editableRecipeData);
    }
  }

  return (
    <section>
      <Header
        titleName="Explore Nationalities"
        searchIconOnScreen={ false }
      />
      <section className="section-nationality-dropdown">
        <select
          className="nationality-dropdown"
          onChange={ ({ target }) => searchRecipe((target.value)) }
          data-testid="explore-by-nationality-dropdown"
        >
          {nationality && nationality.map((nat, key) => (
            <option
              value={ nat.strArea }
              key={ key }
              data-testid={ `${nat.strArea}-option` }
            >
              {nat.strArea}
            </option>
          ))}
        </select>
      </section>
      <section className="meals">
        {nationality && editableStateRecipesByNationalities.map((element, index) => (
          <Link
            to={ `/foods/${element.idMeal}` }
            key={ `${index}-${element.strMeal}` }
          >
            <RecipeCard
              dataTestIdRecipeCard={ `${index}-recipe-card` }
              dataTestIdRecipeImg={ `${index}-card-img` }
              dataTestIdRecipeName={ `${index}-card-name` }
              recipeImage={ element.strMealThumb }
              recipeName={ element.strMeal }
            />
          </Link>
        ))}
      </section>
      <br />
      <br />
      <br />
      <BottomMenu />
    </section>
  );
}

export default ExploreNationalities;
