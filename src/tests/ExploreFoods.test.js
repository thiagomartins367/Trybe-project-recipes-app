import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste da página Explore.js', () => {
  it('há 3 botões na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');

    const exploreByIngredientBtn = screen.getByTestId('explore-by-ingredient');
    expect(exploreByIngredientBtn).toBeInTheDocument();

    const exploreByNationalityBtn = screen.getByTestId('explore-by-nationality');
    expect(exploreByNationalityBtn).toBeInTheDocument();

    const exploreSurpriseBtn = screen.getByTestId('explore-surprise');
    expect(exploreSurpriseBtn).toBeInTheDocument();
  });
  it('o botão "Explore By Ingredient" redireciona para outra rota', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');

    const exploreByIngredientBtn = screen.getByTestId('explore-by-ingredient');
    userEvent.click(exploreByIngredientBtn);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/explore/foods/ingredients');
  });
  it('o botão "Explore By Nationality" redireciona para outra rota', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');

    const exploreByNationalityBtn = screen.getByTestId('explore-by-nationality');
    userEvent.click(exploreByNationalityBtn);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/explore/foods/nationalities');
  });
  it('o botão "Surprise me" redireciona para outra rota', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');

    const exploreSurpriseBtn = screen.getByTestId('explore-surprise');
    userEvent.click(exploreSurpriseBtn);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/explore/foods');
  });
});
