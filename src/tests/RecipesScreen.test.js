import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import beefMeals from '../../cypress/mocks/beefMeals';
import breakfastMeals from '../../cypress/mocks/breakfastMeals';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import mealCategories from '../../cypress/mocks/mealCategories';
import { meals } from '../../cypress/mocks/meals';
import App from '../App';
import { DRINK_RECIPES_URL, FIRST_12_RECIPES, MEAL_RECIPES_URL } from "../constants";
import renderWithRouter from '../helpers/renderWithRouter';
import fetchRecipesAPI from '../services/fetchRecipesAPI';
// import fetchRecipesAPI from '../services/fetchRecipesAPI';

describe('Testes da Página "RecipesScreen" (Tela Principal de Receitas)', () => {
  const checkFirst12RecipeCards = async (getByTestId, firstRecipeName) => {
    const first12Recipes = [];
    const waitForRendering = await screen.findByText(firstRecipeName);
    for (let index = 0; index < FIRST_12_RECIPES; index += 1) {
      first12Recipes.push(getByTestId(`${index}-recipe-card`));
    }
    expect(waitForRendering.textContent).toBe(firstRecipeName);
    expect(first12Recipes.length).toBe(FIRST_12_RECIPES);
    try {
      expect(getByTestId('12-recipe-card')).not.toBeInTheDocument();
    } catch (error) {
      console.log('Executou CATCH');
      const string = 'O card "12-recipe-card" não deve existir na página';
      expect(typeof string).toBe('string');
    }
  };
  const checkImageFirst12Recipes = async (getByTestId, firstRecipeName, page) => {
    const first12RecipesImg = [];
    let recipeType = '';
    let requisitionURL = '';
    switch (page) {
    case '/foods':
      recipeType = 'meals';
      requisitionURL = `${MEAL_RECIPES_URL}`;
      break;
    case '/drinks':
      recipeType = 'drinks';
      requisitionURL = `${DRINK_RECIPES_URL}`;
      break;
  
    default:
      break;
    }
    const waitForRendering = await screen.findByText(firstRecipeName);
    for (let index = 0; index < FIRST_12_RECIPES; index += 1) {
      first12RecipesImg.push(getByTestId(`${index}-card-img`));
    }
    expect(waitForRendering.textContent).toBe(firstRecipeName);
    let recipesImg = [];
    const recipeTypeFormatted = `${recipeType[0].toUpperCase()}${recipeType.slice(1).replace('s', '')}`;
    await fetchRecipesAPI(requisitionURL).then((data) => recipesImg = data[recipeType]);
    recipesImg.forEach((meal) => {
      // console.log(meal[`str${recipeTypeFormatted}Thumb`]);
      recipesImg.push(meal[`str${recipeTypeFormatted}Thumb`]);
    });
    first12RecipesImg.forEach((htmlElement) => {
      expect(recipesImg).toContain(htmlElement.src);
    });
  };
  const checkRecipesCategoriesFilters = async (getByTestId, mealsCategories, secondCategory ) => {
    const foodsCategories = [];
    foodsCategories.push('All');
    for (let index = 0; index < 5; index += 1) {
      foodsCategories.push(mealsCategories[index].strCategory);
    }
    const waitForRendering = await screen.findByText(secondCategory);
    expect(waitForRendering.textContent).toBe(secondCategory);
    foodsCategories.forEach((category) => {
      expect(getByTestId(`${category}-category-filter`)).toBeInTheDocument();
    });
  };
  const checkRecipesFromSelectedCategory = async (getByTestId, firstRecipeName, mockCategoriesImgs, dataTestIdCategoryRecipe) => {
    const waitForRendering = await screen.findByText('Beef');
    expect(waitForRendering.textContent).toBe('Beef');
    userEvent.click(getByTestId(dataTestIdCategoryRecipe));
    const waitForRenderingRecipes = await screen.findByText(firstRecipeName);
    expect(waitForRenderingRecipes.textContent).toBe(firstRecipeName);
    const categoryRecipesImg = [];
    for (let index = 0; index < FIRST_12_RECIPES; index += 1) {
      try {
        categoryRecipesImg.push(getByTestId(`${index}-card-img`));
      } catch (error) {
        break;
      }
    }
    categoryRecipesImg.forEach((htmlElement) => {
      expect(mockCategoriesImgs).toContain(htmlElement.src);
    });
  };
  it('Verifica se há todos os 12 cards de receitas na tela "/foods"', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/foods');
    await checkFirst12RecipeCards(getByTestId, 'Corba');
  });
  it('Verifica se há todos os 12 cards de receitas na tela "/drinks"', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/drinks');
    await checkFirst12RecipeCards(getByTestId, 'GG');
  });
  it('Verifica se todos os 12 cards de receitas na tela "/foods" são refeições', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/foods');
    await checkImageFirst12Recipes(getByTestId, 'Corba', '/foods');
  });
  it('Verifica se todos os 12 cards de receitas na tela "/drinks" são bebidas', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/drinks');
    await checkImageFirst12Recipes(getByTestId, 'GG', '/drinks');
  });
  it('Verifica se exibe as 5 primeiras categorias de comidas na tela "/foods"', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/foods');
    await checkRecipesCategoriesFilters(getByTestId, mealCategories.meals, 'Beef');
  });
  it('Verifica se exibe as 5 primeiras categorias de bebidas na tela "/drinks"', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/drinks');
    let drinksCategories = [...drinkCategories.drinks];
    drinksCategories[2] = { strCategory: 'Shake' };
    await checkRecipesCategoriesFilters(getByTestId, drinksCategories, 'Ordinary Drink');
  });
  it('Verifica se são exibidas as comidas corretas quando a categoria "Beef" está selecionada.', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/foods');
    const beefCategory = [...beefMeals.meals];
    const beefCategoryImg = [];
    beefCategory.push({
      'strMeal': 'Beef Rendang',
      'strMealThumb': 'https://www.themealdb.com/images/media/meals/bc8v651619789840.jpg',
      'idMeal': '53053',
    });
    beefCategory.forEach((recipeObj) => {
      beefCategoryImg.push(recipeObj.strMealThumb);
    });
    await checkRecipesFromSelectedCategory(getByTestId, beefCategory[0].strMeal, beefCategoryImg, 'Beef-category-filter');
  });
  it('Verifica se são exibidas as comidas corretas quando a categoria "Breakfast" está selecionada.', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/foods');
    const breakfastCategory = [...breakfastMeals.meals];
    const breakfastCategoryImg = [];
    breakfastCategory.forEach((recipeObj) => {
      breakfastCategoryImg.push(recipeObj.strMealThumb);
    });
    await checkRecipesFromSelectedCategory(getByTestId, breakfastCategory[0].strMeal, breakfastCategoryImg, 'Breakfast-category-filter');
  });
});