
import App from "../App";
import React from "react";
import renderWithRouter from "../helpers/renderWithRouter";
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import userEvent from "@testing-library/user-event";

describe('Testes do Componente "BottomMenu.js"', () => {
  const srcImagesIcons = [
    `http://localhost/${drinkIcon}`,
    `http://localhost/${exploreIcon}`,
    `http://localhost/${mealIcon}`,
  ];
  const checkBottomMenuDoesExist = (page) => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push(page);
    const footer = getByTestId('footer');
    const drinksBottomBtn = getByTestId('drinks-bottom-btn');
    const exploreBottomBtn = getByTestId('explore-bottom-btn');
    const foodBottomBtn = getByTestId('food-bottom-btn');
    const iconsOfBottomMenu = [drinksBottomBtn, exploreBottomBtn, foodBottomBtn];
    expect(footer).toBeInTheDocument();
    iconsOfBottomMenu.forEach((htmlElement, index) => {
      expect(htmlElement).toBeInTheDocument();
      expect(htmlElement.src).toBe(srcImagesIcons[index]);
    });
  };
  const checkBottomMenuDoesNotExist = (page) => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/foods');
    const footer = getByTestId('footer');
    history.push(page);
    expect(footer).not.toBeInTheDocument();
  };
  const checkPageRedirection = (htmlElement, history, urlPathname ) => {
    userEvent.click(htmlElement);
    const { location: { pathname } } = history;
    expect(pathname).toBe(urlPathname);
  };
  it('Verifica se o componente "BottomMenu" e seus subcomponentes existem na página "/foods"', () => {
    checkBottomMenuDoesExist('/foods');
  });
  it('Verifica se o componente "BottomMenu" e seus subcomponentes existem na página "/drinks"', () => {
    checkBottomMenuDoesExist('/drinks');
  });
  it('Verifica se o componente "BottomMenu" e seus subcomponentes existem na página "/explore"', () => {
    checkBottomMenuDoesExist('/explore');
  });
  it('Verifica se o componente "BottomMenu" e seus subcomponentes existem na página "/explore/foods"', () => {
    checkBottomMenuDoesExist('/explore/foods');
  });
  it('Verifica se o componente "BottomMenu" e seus subcomponentes existem na página "/explore/drinks"', () => {
    checkBottomMenuDoesExist('/explore/drinks');
  });
  it.skip('Verifica se o componente "BottomMenu" e seus subcomponentes\n existem na página "/explore/foods/ingredients"', () => {
    checkBottomMenuDoesExist('/explore/foods/ingredients');
  });
  it.skip('Verifica se o componente "BottomMenu" e seus subcomponentes\n existem na página "/explore/drinks/ingredients"', () => {
    checkBottomMenuDoesExist('/explore/drinks/ingredients');
  });
  it.skip('Verifica se o componente "BottomMenu" e seus subcomponentes\n existem na página "/explore/foods/nationalities"', () => {
    checkBottomMenuDoesExist('/explore/foods/nationalities');
  });
  it('Verifica se o componente "BottomMenu" NÃO existe na página "/"', () => {
    checkBottomMenuDoesNotExist('/');
  });
  it('Verifica se o componente "BottomMenu" NÃO existe na página "/done-recipes"', () => {
    checkBottomMenuDoesNotExist('/done-recipes');
  });
  it('Verifica se o componente "BottomMenu" NÃO existe na página "/favorite-recipes"', () => {
    checkBottomMenuDoesNotExist('/favorite-recipes');
  });
  it('Verifica se o componente "BottomMenu" NÃO existe na tela de detalhes de uma receita de comida.', () => {
    checkBottomMenuDoesNotExist('/foods/52771');
  });
  it('Verifica se o componente "BottomMenu" NÃO existe na tela de detalhes de uma receita de bebida.', () => {
    checkBottomMenuDoesNotExist('/drinks/178319');
  });
  it('Verifica se o componente "BottomMenu" NÃO existe na tela de receita em progresso de comida.', () => {
    checkBottomMenuDoesNotExist('/foods/52771/in-progress');
  });
  it('Verifica se o componente "BottomMenu" NÃO existe na tela de receita em progresso de bebida.', () => {
    checkBottomMenuDoesNotExist('/drinks/178319/in-progress');
  });
  it('Verifica se redireciona para a rota correta, "/drinks", ao clicar\n no ícone de "CockTail" (drinkIcon.svg).', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/foods');
    const drinksBottomBtn = getByTestId('drinks-bottom-btn');
    checkPageRedirection(drinksBottomBtn, history, '/drinks' );
  });
  it('Verifica se redireciona para a rota correta, "/foods", ao clicar\n no ícone de "Refeição" (mealIcon.svg).', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/drinks');
    const foodBottomBtn = getByTestId('food-bottom-btn');
    checkPageRedirection(foodBottomBtn, history, '/foods' );
  });
  it('Verifica se redireciona para a rota correta, "/explore", ao clicar\n no ícone de "Bússola" (exploreIcon.svg).', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/foods');
    const exploreBottomBtn = getByTestId('explore-bottom-btn');
    checkPageRedirection(exploreBottomBtn, history, '/explore' );
  });
});
