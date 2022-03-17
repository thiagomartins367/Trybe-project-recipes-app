import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import beefMeals from '../../cypress/mocks/beefMeals';
import breakfastMeals from '../../cypress/mocks/breakfastMeals';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';
import dessertMeals from '../../cypress/mocks/dessertMeals';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import goatMeals from '../../cypress/mocks/goatMeals';
import mealCategories from '../../cypress/mocks/mealCategories';
import { meals } from '../../cypress/mocks/meals';
import milkDrinks from '../../cypress/mocks/milkDrinks';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import otherDrinks from '../../cypress/mocks/otherDrinks';
import App from '../App';
import { DRINK_RECIPES_URL, FIRST_12_RECIPES, MEAL_RECIPES_URL } from '../constants';
import renderWithRouter from '../helpers/renderWithRouter';
import fetchRecipesAPI from '../services/fetchRecipesAPI';
import drinksMock from './recipesScreenTests/drinksMock';
import mealsMock from './recipesScreenTests/mealsMock';
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
    const recipeTypeFormatted = `${recipeType[0].toUpperCase()}${recipeType
      .slice(1)
      .replace('s', '')}`;
    await fetchRecipesAPI(requisitionURL).then((data) => recipesImg = data[recipeType]);
    recipesImg.forEach((meal) => {
      recipesImg.push(meal[`str${recipeTypeFormatted}Thumb`]);
    });
    first12RecipesImg.forEach((htmlElement) => {
      expect(recipesImg).toContain(htmlElement.src);
    });
  };
  const checkRecipesCategoriesFilters = async (
    getByTestId,
    mealsCategories,
    secondCategory,
  ) => {
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
  const checkRecipesFromSelectedCategory = async (objectParameter) => {
    const {
      renderComponent,
      firstRecipeNameCategory,
      firstRecipeName,
      secondCategory,
      mockCategoriesImgs,
      dataTestIdCategoryRecipe,
      page,
    } = objectParameter;
    const { getByTestId, history } = renderComponent;
    history.push(page);
    const waitForRendering = await screen.findByText(secondCategory);
    expect(waitForRendering.textContent).toBe(secondCategory);
    userEvent.click(getByTestId(dataTestIdCategoryRecipe));
    const waitForRenderingRecipes = await screen.findByText(firstRecipeNameCategory);
    expect(waitForRenderingRecipes.textContent).toBe(firstRecipeNameCategory);
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
    userEvent.click(getByTestId(dataTestIdCategoryRecipe));
    checkImageFirst12Recipes(getByTestId, firstRecipeName, page);
  };
  const checkRecipesFromTheAllCategory = async (objectParameter) => {
    const {
      renderComponent,
      secondCategory,
      secondCategoryDataTestId,
      firstRecipeNameCategory,
      categoryAllDataTestId,
      firstRecipeName,
      page,
    } = objectParameter;
    const { getByTestId, history } = renderComponent;
    history.push(page);
    const waitForRenderingCategory = await screen.findByText(secondCategory);
    userEvent.click(getByTestId(secondCategoryDataTestId));
    const waitForRenderingRecipe = await screen.findByText(firstRecipeNameCategory);
    expect(waitForRenderingCategory.textContent).toBe(secondCategory);
    expect(waitForRenderingRecipe.textContent).toBe(firstRecipeNameCategory);
    userEvent.click(getByTestId(categoryAllDataTestId));
    await checkImageFirst12Recipes(getByTestId, firstRecipeName, page);
  };
  const checkRedirectRecipeDetailsScreen = async (objectParameter) => {
    const {
      renderComponent,
      firstRecipeName,
      page,
      recipesMock,
      typeRecipes,
    } = objectParameter;
    const { getByTestId, history } = renderComponent;
    history.push(page);
    const waitForRenderingRecipe = await screen.findByText(firstRecipeName);
    expect(waitForRenderingRecipe.textContent).toBe(firstRecipeName);
    for (let index = 0; index < FIRST_12_RECIPES; index += 1) {
      userEvent.click(getByTestId(`${index}-recipe-card`));
      const { location: { pathname } } = history;
      expect(pathname).toBe(`${page}/${recipesMock[index][`id${typeRecipes}`]}`);
      history.push(page);
    }
  };
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
    await checkRecipesCategoriesFilters(getByTestId, drinksCategories, 'Ordinary Drink');
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
    await checkRecipesFromSelectedCategory(
      functionParameters,
    );
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
      idMeal: '53050'
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
      idMeal: '53049'
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
      secondCategory: 'Ordinary Drink',
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
      secondCategory: 'Ordinary Drink',
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
      secondCategory: 'Ordinary Drink',
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
      secondCategory: 'Ordinary Drink',
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
      secondCategory: 'Ordinary Drink',
      mockCategoriesImgs: recipesCategoryImg,
      dataTestIdCategoryRecipe: 'Cocoa-category-filter',
      page: '/drinks',
    };
    await checkRecipesFromSelectedCategory(functionParameters);
  });
  it('Exibe as 12 refeições inicias quando a categoria "All" é selecionada na tela "/foods".', async () => {
    const renderComponent = renderWithRouter(<App />);
    const functionParameters = {
      renderComponent,
      secondCategory: mealCategories.meals[0].strCategory,
      secondCategoryDataTestId: 'Beef-category-filter',
      firstRecipeNameCategory: beefMeals.meals[0].strMeal,
      categoryAllDataTestId: 'All-category-filter',
      firstRecipeName: mealCategories.meals[0].strCategory,
      page: '/foods',
    }
    await checkRecipesFromTheAllCategory(functionParameters);
  });
  it('Exibe as 12 refeições inicias quando a categoria "All" é selecionada na tela "/drinks".', async () => {
    const renderComponent = renderWithRouter(<App />);
    const functionParameters = {
      renderComponent,
      secondCategory: drinkCategories.drinks[0].strCategory,
      secondCategoryDataTestId: 'Ordinary Drink-category-filter',
      firstRecipeNameCategory: ordinaryDrinks.drinks[0].strDrink,
      categoryAllDataTestId: 'All-category-filter',
      firstRecipeName: drinkCategories.drinks[0].strCategory,
      page: '/drinks',
    }
    await checkRecipesFromTheAllCategory(functionParameters);
  });
  it('A rota muda para a tela de detalhes da receita clicada na tela "/foods".', async () => {
    const renderComponent = renderWithRouter(<App />);
    const functionParameters = {
      renderComponent,
      firstRecipeName: mealsMock[0].strMeal,
      page: '/foods',
      recipesMock: mealsMock,
      typeRecipes: 'Meal',
    }
    await checkRedirectRecipeDetailsScreen(functionParameters);
  });
  it('A rota muda para a tela de detalhes da receita clicada na tela "/drinks".', async () => {
    const renderComponent = renderWithRouter(<App />);
    const functionParameters = {
      renderComponent,
      firstRecipeName: drinksMock[0].strDrink,
      page: '/drinks',
      recipesMock: drinksMock,
      typeRecipes: 'Drink',
    }
    await checkRedirectRecipeDetailsScreen(functionParameters);
  });
});
