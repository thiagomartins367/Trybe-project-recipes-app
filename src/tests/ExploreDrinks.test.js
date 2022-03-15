import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste da página ExploreDrinks.js', () => {
  const historyDrinks = '/explore/drinks';
  it('há dois botões na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(historyDrinks);

    const exploreByIngredientBtn = screen.getByTestId('explore-by-ingredient');
    expect(exploreByIngredientBtn).toBeInTheDocument();

    const exploreSurpriseBtn = screen.getByTestId('explore-surprise');
    expect(exploreSurpriseBtn).toBeInTheDocument();
  });
  it('o botão "Explore By Ingredient" redireciona para outra rota', () => {
    const { history } = renderWithRouter(<App />);
    history.push(historyDrinks);

    const exploreByIngredientBtn = screen.getByTestId('explore-by-ingredient');
    userEvent.click(exploreByIngredientBtn);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/explore/drinks/ingredients');
  });
  it('o botão "Surprise me" redireciona para outra rota', () => {
    const { history } = renderWithRouter(<App />);
    history.push(historyDrinks);

    const exploreSurpriseBtn = screen.getByTestId('explore-surprise');
    userEvent.click(exploreSurpriseBtn);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/explore/drinks');
  });
});
