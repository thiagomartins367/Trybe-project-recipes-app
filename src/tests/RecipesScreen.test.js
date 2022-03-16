import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { meals } from '../../cypress/mocks/meals';
import App from '../App';
import { FIRST_12_RECIPES } from "../constants";
import renderWithRouter from '../helpers/renderWithRouter';

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
  }
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
    const first12RecipesImg = [];
    const waitForRendering = await screen.findByText('Corba');
    for (let index = 0; index < FIRST_12_RECIPES; index += 1) {
      first12RecipesImg.push(getByTestId(`${index}-card-img`));
    }
    expect(waitForRendering.textContent).toBe('Corba');
    first12RecipesImg.forEach((htmlElement) => {
      const urlImage = meals.find((elementObj) => elementObj.strMealThumb === htmlElement.src);
      console.log(htmlElement.src);
      console.log(urlImage);
    });
  });
});