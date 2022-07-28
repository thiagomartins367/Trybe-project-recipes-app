import React from 'react';
import beefMeals from '../mocks/beefMeals';
import breakfastMeals from '../mocks/breakfastMeals';
import chickenMeals from '../mocks/chickenMeals';
import dessertMeals from '../mocks/dessertMeals';
import drinkCategories from '../mocks/drinkCategories';
import goatMeals from '../mocks/goatMeals';
import mealCategories from '../mocks/mealCategories';
import App from '../../App';
import { ORDINARY_DRINK } from '../../constants';
import renderWithRouter from '../../helpers/renderWithRouter';
import {
  checkFirst12RecipeCards,
  checkImageFirst12Recipes,
  checkRecipesCategoriesFilters,
  checkRecipesFromSelectedCategory,
} from './testFunctions.test';

describe('Testes - Página "RecipesScreen" (Tela Principal de Receitas)-1ª Parte', () => {
  it('Verifica se há todos os 12 cards de receitas na tela "/foods".', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/foods');
    await checkFirst12RecipeCards(getByTestId, 'Corba');
  });
  it('Verifica se há todos os 12 cards de receitas na tela "/drinks".', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/drinks');
    await checkFirst12RecipeCards(getByTestId, 'GG');
  });
  it('Todos os 12 cards de receitas na tela "/foods" são refeições.', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/foods');
    await checkImageFirst12Recipes(getByTestId, 'Corba', '/foods');
  });
  it('Todos os 12 cards de receitas na tela "/drinks" são bebidas.', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/drinks');
    await checkImageFirst12Recipes(getByTestId, 'GG', '/drinks');
  });
  it('Exibe as 5 primeiras categorias de refeições na tela "/foods".', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/foods');
    await checkRecipesCategoriesFilters(getByTestId, mealCategories.meals, 'Beef');
  });
  it('Exibe as 5 primeiras categorias de bebidas na tela "/drinks".', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/drinks');
    const drinksCategories = [...drinkCategories.drinks];
    drinksCategories[2] = { strCategory: 'Shake' };
    await checkRecipesCategoriesFilters(getByTestId, drinksCategories, ORDINARY_DRINK);
  });
  it('Exibe as refeições da categoria "Beef" quando selecionada.', async () => {
    const renderComponent = renderWithRouter(<App />);
    const recipesCategory = [...beefMeals.meals];
    const recipesCategoryImg = [];
    recipesCategory.push({
      strMeal: 'Beef Rendang',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/bc8v651619789840.jpg',
      idMeal: '53053',
    });
    recipesCategory.forEach((recipeObj) => {
      recipesCategoryImg.push(recipeObj.strMealThumb);
    });
    const functionParameters = {
      renderComponent,
      firstRecipeNameCategory: recipesCategory[0].strMeal,
      firstRecipeName: 'Corba',
      secondCategory: 'Beef',
      mockCategoriesImgs: recipesCategoryImg,
      dataTestIdCategoryRecipe: 'Beef-category-filter',
      page: '/foods',
    };
    await checkRecipesFromSelectedCategory(functionParameters);
  });
  it('Exibe as refeições da categoria "Breakfast" quando selecionada.', async () => {
    const renderComponent = renderWithRouter(<App />);
    const recipesCategory = [...breakfastMeals.meals];
    const recipesCategoryImg = [];
    recipesCategory.forEach((recipeObj) => {
      recipesCategoryImg.push(recipeObj.strMealThumb);
    });
    const functionParameters = {
      renderComponent,
      firstRecipeNameCategory: recipesCategory[0].strMeal,
      firstRecipeName: 'Corba',
      secondCategory: 'Beef',
      mockCategoriesImgs: recipesCategoryImg,
      dataTestIdCategoryRecipe: 'Breakfast-category-filter',
      page: '/foods',
    };
    await checkRecipesFromSelectedCategory(functionParameters);
  });
  it('Exibe as refeições da categoria "Chicken" quando selecionada.', async () => {
    const renderComponent = renderWithRouter(<App />);
    const recipesCategory = [...chickenMeals.meals];
    const recipesCategoryImg = [];
    recipesCategory.push({
      strMeal: 'Ayam Percik',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/020z181619788503.jpg',
      idMeal: '53050',
    });
    recipesCategory.forEach((recipeObj) => {
      recipesCategoryImg.push(recipeObj.strMealThumb);
    });
    const functionParameters = {
      renderComponent,
      firstRecipeNameCategory: recipesCategory[0].strMeal,
      firstRecipeName: 'Corba',
      secondCategory: 'Beef',
      mockCategoriesImgs: recipesCategoryImg,
      dataTestIdCategoryRecipe: 'Chicken-category-filter',
      page: '/foods',
    };
    await checkRecipesFromSelectedCategory(functionParameters);
  });
  it('Exibe as refeições da categoria "Dessert" quando selecionada.', async () => {
    const renderComponent = renderWithRouter(<App />);
    const recipesCategory = [...dessertMeals.meals];
    const recipesCategoryImg = [];
    recipesCategory.push({
      strMeal: 'Apam balik',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg',
      idMeal: '53049',
    });
    recipesCategory.forEach((recipeObj) => {
      recipesCategoryImg.push(recipeObj.strMealThumb);
    });
    const functionParameters = {
      renderComponent,
      firstRecipeNameCategory: recipesCategory[0].strMeal,
      firstRecipeName: 'Corba',
      secondCategory: 'Beef',
      mockCategoriesImgs: recipesCategoryImg,
      dataTestIdCategoryRecipe: 'Dessert-category-filter',
      page: '/foods',
    };
    await checkRecipesFromSelectedCategory(functionParameters);
  });
  it('Exibe as refeições da categoria "Goat" quando selecionada.', async () => {
    const renderComponent = renderWithRouter(<App />);
    const recipesCategory = [...goatMeals.meals];
    const recipesCategoryImg = [];
    recipesCategory.forEach((recipeObj) => {
      recipesCategoryImg.push(recipeObj.strMealThumb);
    });
    const functionParameters = {
      renderComponent,
      firstRecipeNameCategory: recipesCategory[0].strMeal,
      firstRecipeName: 'Corba',
      secondCategory: 'Beef',
      mockCategoriesImgs: recipesCategoryImg,
      dataTestIdCategoryRecipe: 'Goat-category-filter',
      page: '/foods',
    };
    await checkRecipesFromSelectedCategory(functionParameters);
  });
});
