import React from 'react';
import beefMeals from '../mocks/beefMeals';
import cocktailDrinks from '../mocks/cocktailDrinks';
import cocoaDrinks from '../mocks/cocoaDrinks';
import drinkCategories from '../mocks/drinkCategories';
import drinks from '../mocks/drinks';
import mealCategories from '../mocks/mealCategories';
import { meals } from '../mocks/meals';
import milkDrinks from '../mocks/milkDrinks';
import ordinaryDrinks from '../mocks/ordinaryDrinks';
import otherDrinks from '../mocks/otherDrinks';
import App from '../../App';
import { ORDINARY_DRINK } from '../../constants';
import renderWithRouter from '../../helpers/renderWithRouter';
import mealsMock from './mealsMock';
import {
  checkRecipesFromSelectedCategory,
  checkRecipesFromTheAllCategory,
  checkRedirectRecipeDetailsScreen,
} from './testFunctions.test';

describe('Testes - Página "RecipesScreen" (Tela Principal de Receitas)-2ª Parte', () => {
  it('Exibe as refeições da categoria "Ordinary Drink" quando selecionada.', async () => {
    const renderComponent = renderWithRouter(<App />);
    const recipesCategory = [...ordinaryDrinks.drinks];
    const recipesCategoryImg = [];
    recipesCategory.forEach((recipeObj) => {
      recipesCategoryImg.push(recipeObj.strDrinkThumb);
    });
    const functionParameters = {
      renderComponent,
      firstRecipeNameCategory: recipesCategory[0].strDrink,
      firstRecipeName: 'GG',
      secondCategory: ORDINARY_DRINK,
      mockCategoriesImgs: recipesCategoryImg,
      dataTestIdCategoryRecipe: 'Ordinary Drink-category-filter',
      page: '/drinks',
    };
    await checkRecipesFromSelectedCategory(functionParameters);
  });
  it('Exibe as refeições da categoria "Cocktail" quando selecionada.', async () => {
    const renderComponent = renderWithRouter(<App />);
    const recipesCategory = [...cocktailDrinks.drinks];
    const recipesCategoryImg = [];
    recipesCategory.forEach((recipeObj) => {
      recipesCategoryImg.push(recipeObj.strDrinkThumb);
    });
    const functionParameters = {
      renderComponent,
      firstRecipeNameCategory: recipesCategory[1].strDrink,
      firstRecipeName: 'GG',
      secondCategory: ORDINARY_DRINK,
      mockCategoriesImgs: recipesCategoryImg,
      dataTestIdCategoryRecipe: 'Cocktail-category-filter',
      page: '/drinks',
    };
    await checkRecipesFromSelectedCategory(functionParameters);
  });
  it('Exibe as refeições da categoria "Shake" quando selecionada.', async () => {
    const renderComponent = renderWithRouter(<App />);
    const recipesCategory = [...milkDrinks.drinks];
    const recipesCategoryImg = [];
    recipesCategory.forEach((recipeObj) => {
      recipesCategoryImg.push(recipeObj.strDrinkThumb);
    });
    const functionParameters = {
      renderComponent,
      firstRecipeNameCategory: recipesCategory[1].strDrink,
      firstRecipeName: 'GG',
      secondCategory: ORDINARY_DRINK,
      mockCategoriesImgs: recipesCategoryImg,
      dataTestIdCategoryRecipe: 'Shake-category-filter',
      page: '/drinks',
    };
    await checkRecipesFromSelectedCategory(functionParameters);
  });
  it('Exibe as refeições da categoria "Other/Unknown" quando selecionada.', async () => {
    const renderComponent = renderWithRouter(<App />);
    const recipesCategory = [...otherDrinks.drinks];
    const recipesCategoryImg = [];
    recipesCategory.forEach((recipeObj) => {
      recipesCategoryImg.push(recipeObj.strDrinkThumb);
    });
    const functionParameters = {
      renderComponent,
      firstRecipeNameCategory: recipesCategory[1].strDrink,
      firstRecipeName: 'GG',
      secondCategory: ORDINARY_DRINK,
      mockCategoriesImgs: recipesCategoryImg,
      dataTestIdCategoryRecipe: 'Other/Unknown-category-filter',
      page: '/drinks',
    };
    await checkRecipesFromSelectedCategory(functionParameters);
  });
  it('Exibe as refeições da categoria "Cocoa" quando selecionada.', async () => {
    const renderComponent = renderWithRouter(<App />);
    const recipesCategory = [...cocoaDrinks.drinks];
    const recipesCategoryImg = [];
    recipesCategory.forEach((recipeObj) => {
      recipesCategoryImg.push(recipeObj.strDrinkThumb);
    });
    const functionParameters = {
      renderComponent,
      firstRecipeNameCategory: recipesCategory[1].strDrink,
      firstRecipeName: 'GG',
      secondCategory: ORDINARY_DRINK,
      mockCategoriesImgs: recipesCategoryImg,
      dataTestIdCategoryRecipe: 'Cocoa-category-filter',
      page: '/drinks',
    };
    await checkRecipesFromSelectedCategory(functionParameters);
  });
  it(`${
    'Exibe as 12 refeições inicias quando a categoria "All"'
  } ${'é selecionada na tela "/foods".'}`, async () => {
    const renderComponent = renderWithRouter(<App />);
    const functionParameters = {
      renderComponent,
      secondCategory: mealCategories.meals[0].strCategory,
      secondCategoryDataTestId: 'Beef-category-filter',
      firstRecipeNameCategory: beefMeals.meals[0].strMeal,
      categoryAllDataTestId: 'All-category-filter',
      firstRecipeName: mealCategories.meals[0].strCategory,
      page: '/foods',
    };
    await checkRecipesFromTheAllCategory(functionParameters);
  });
  it(`${
    'Exibe as 12 refeições inicias quando a categoria "All"'
  } ${'é selecionada na tela "/drinks".'}`, async () => {
    const renderComponent = renderWithRouter(<App />);
    const functionParameters = {
      renderComponent,
      secondCategory: drinkCategories.drinks[0].strCategory,
      secondCategoryDataTestId: 'Ordinary Drink-category-filter',
      firstRecipeNameCategory: ordinaryDrinks.drinks[0].strDrink,
      categoryAllDataTestId: 'All-category-filter',
      firstRecipeName: drinkCategories.drinks[0].strCategory,
      page: '/drinks',
    };
    await checkRecipesFromTheAllCategory(functionParameters);
  });
  it(`${
    'A rota muda para a tela de detalhes da receita clicada'
  } ${'na tela "/foods".'}`, async () => {
    const renderComponent = renderWithRouter(<App />);
    const mockMeals = [...meals, ...mealsMock];
    const functionParameters = {
      renderComponent,
      firstRecipeName: mockMeals[0].strMeal,
      page: '/foods',
      recipesMock: mockMeals,
      typeRecipes: 'Meal',
    };
    await checkRedirectRecipeDetailsScreen(functionParameters);
  });
  it(`${
    'A rota muda para a tela de detalhes da receita clicada'
  } ${'na tela "/drinks".'}`, async () => {
    const renderComponent = renderWithRouter(<App />);
    const functionParameters = {
      renderComponent,
      firstRecipeName: drinks.drinks[0].strDrink,
      page: '/drinks',
      recipesMock: drinks.drinks,
      typeRecipes: 'Drink',
    };
    await checkRedirectRecipeDetailsScreen(functionParameters);
  });
});
