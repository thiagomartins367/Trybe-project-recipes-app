import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import icon from '../images/shareIcon.svg';

const doneRecipes = [{
  id: '52771',
  type: 'food',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: '23/06/2020',
  tags: ['Pasta', 'Curry'] }, {
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  doneDate: '23/06/2020',
  tags: [] }];

const obj = {
  btnAll: 'filter-by-all-btn',
  btnFood: 'filter-by-food-btn',
  btnDrink: 'filter-by-drink-btn',
  imgFood: '0-horizontal-image',
  textFood: '0-horizontal-top-text',
  nameFood: '0-horizontal-name',
  dateFood: '0-horizontal-done-date',
  shareBtnFood: '0-horizontal-share-btn',
  tagOneFood: '0-Pasta-horizontal-tag',
  tagTwoFood: '0-Curry-horizontal-tag',
  imgDrink: '1-horizontal-image',
  textDrink: '1-horizontal-top-text',
  nameDrink: '1-horizontal-name',
  shareBtnDrink: '1-horizontal-share-btn',
  dateDrink: '1-horizontal-done-date',
  link: '/done-recipes' };

const {
  id,
  type,
  nationality,
  category,
  alcoholicOrNot,
  name,
  image,
  doneDate,
  tags,
} = doneRecipes;

function inPage() {
  const { history } = renderWithRouter(<App
    id={ id }
    type={ type }
    nationality={ nationality }
    category={ category }
    alcoholicOrNot={ alcoholicOrNot }
    name={ name }
    image={ image }
    doneDate={ doneDate }
    tags={ tags }
  />);
  history.push(obj.link);
}

describe('Testes da tela de receitas feitas', () => {
  it('Verifica se todos os data-testids estão disponíveis', () => {
    inPage();
    expect(screen.getByTestId(obj.btnAll)).toBeInTheDocument();
    expect(screen.getByTestId(obj.btnFood)).toBeInTheDocument();
    expect(screen.getByTestId(obj.btnDrink)).toBeInTheDocument();
    expect(screen.getByTestId(obj.imgFood)).toBeInTheDocument();
    expect(screen.getByTestId(obj.textFood)).toBeInTheDocument();
    expect(screen.getByTestId(obj.nameFood)).toBeInTheDocument();
    expect(screen.getByTestId(obj.dateFood)).toBeInTheDocument();
    expect(screen.getByTestId(obj.shareBtnFood)).toBeInTheDocument();
    expect(screen.getByTestId(obj.tagOneFood)).toBeInTheDocument();
    expect(screen.getByTestId(obj.tagTwoFood)).toBeInTheDocument();
    expect(screen.getByTestId(obj.imgDrink)).toBeInTheDocument();
    expect(screen.getByTestId(obj.textDrink)).toBeInTheDocument();
    expect(screen.getByTestId(obj.nameDrink)).toBeInTheDocument();
    expect(screen.getByTestId(obj.shareBtnDrink)).toBeInTheDocument();
    expect(screen.getByTestId(obj.dateDrink)).toBeInTheDocument();
  });
});

describe('Verifica se o card possui os atributos corretos de uma comida', () => {
  it('Verifica se o card possui os atributos corretos de uma comida', () => {
    inPage();
    const recipeImage = screen.getAllByRole('img');
    const imagesMap = doneRecipes.map((recipes) => recipes.image);
    expect(recipeImage[0]).toHaveAttribute('src', imagesMap[0]);
    const categoryFood = screen.getByTestId(obj.textFood);
    expect(categoryFood)
      .toHaveTextContent(`${doneRecipes[0].nationality} - ${doneRecipes[0].category}`);
    const nameFood = screen.getByTestId(obj.nameFood);
    expect(nameFood)
      .toHaveTextContent(`${doneRecipes[0].name}`);
    const buttonShare = screen.getByTestId(obj.shareBtnFood);
    expect(buttonShare).toHaveAttribute('src', icon);
    const dateFood = screen.getByTestId(obj.dateFood);
    expect(dateFood)
      .toHaveTextContent(`${doneRecipes[0].doneDate}`);
    const tagsFood = screen.getByTestId(obj.tagOneFood);
    const tagsMap = doneRecipes.map((recipes) => recipes.tags);
    expect(tagsFood)
      .toHaveTextContent(tagsMap[0][0]);
    const tagsFoodSecond = screen.getByTestId(obj.tagTwoFood);
    expect(tagsFoodSecond)
      .toHaveTextContent(tagsMap[0][1]);
  });
});

describe('Verifica se o card possui os atributos corretos de uma bebida', () => {
  it('Verifica se o card possui os atributos corretos de uma bebida', () => {
    inPage();
    const recipeImage = screen.getAllByRole('img');
    const imagesMap = doneRecipes.map((recipes) => recipes.image);
    expect(recipeImage[1]).toHaveAttribute('src', imagesMap[1]);
    const categoryDrink = screen.getByTestId('1-horizontal-top-text');
    expect(categoryDrink)
      .toHaveTextContent(`${doneRecipes[1].alcoholicOrNot} - ${doneRecipes[1].category}`);
    const nameDrink = screen.getByTestId(obj.nameDrink);
    expect(nameDrink)
      .toHaveTextContent(`${doneRecipes[1].name}`);
    const buttonShare = screen.getByTestId(obj.shareBtnDrink);
    expect(buttonShare).toHaveAttribute('src', icon);
    const dateDrink = screen.getByTestId(obj.dateDrink);
    expect(dateDrink)
      .toHaveTextContent(`${doneRecipes[1].doneDate}`);
  });
});

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Clipboard', () => {
  describe('writeText', () => {
    jest.spyOn(navigator.clipboard, 'writeText');
  });
});

describe('Testa as funcionalidades do botão compartilhar', () => {
  describe('Ao clicar no botão de compartilhar aparece: "Link copied!"', () => {
    it('A URL da tela de detalhes da receita é copiado para o clipboard"', () => {
      inPage();
      screen.getByTestId(obj.shareBtnFood).click();
      jest.spyOn(navigator.clipboard, 'writeText');
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/foods/52771');
      const buttonShare = screen.getByTestId('URL-copiada');
      expect(buttonShare).toHaveTextContent('Link copied!');
    });
  });
});

describe('Implemente 2 botões que filtram por comida ou bebida e all', () => {
  it('Ao clicar no botão "Food" as receitas devem ser filtradas por comidas', () => {
    inPage();
    const nameDrink = screen.getByTestId(obj.nameDrink);
    screen.getByTestId(obj.btnFood).click();
    const nameFood = screen.getByTestId(obj.nameFood);
    expect(nameFood)
      .toHaveTextContent(`${doneRecipes[0].name}`);
    expect(nameDrink).not.toBeInTheDocument();
  });
  it('Ao clicar no botão "Drink" as receitas devem ser filtradas por drinks', () => {
    inPage();
    const nameFood = screen.getByTestId(obj.nameFood);
    screen.getByTestId(obj.btnDrink).click();
    const nameDrink = screen.getByTestId(obj.nameFood);
    expect(nameDrink)
      .toHaveTextContent(`${doneRecipes[1].name}`);
    expect(nameFood).not.toBeInTheDocument();
  });
  it('Ao clicar no botão "All" todas as receitas devem aparecer', () => {
    inPage();
    const nameFood = screen.getByTestId(obj.nameFood);
    screen.getByTestId(obj.btnFood).click();
    screen.getByTestId(obj.btnAll).click();
    const nameDrink = screen.getByTestId(obj.nameDrink);
    expect(nameDrink)
      .toHaveTextContent(`${doneRecipes[1].name}`);
    expect(nameFood)
      .toHaveTextContent(`${doneRecipes[0].name}`);
  });
});

describe('Testa se redirecione para a tela de detalhes da receita', () => {
  it('Ao clicar na foto da receita, a rota deve mudar', () => {
    const { history } = renderWithRouter(<App
      id={ id }
      type={ type }
      nationality={ nationality }
      category={ category }
      alcoholicOrNot={ alcoholicOrNot }
      name={ name }
      image={ image }
      doneDate={ doneDate }
      tags={ tags }
    />);
    history.push(obj.link);
    screen.getByTestId(obj.imgFood).click();
    const {
      location: pathname,
    } = history;
    expect(pathname.pathname).toBe('/foods/52771');
  });
  it('Ao clicar no nome da receita, a rota deve mudar', () => {
    const { history } = renderWithRouter(<App
      id={ id }
      type={ type }
      nationality={ nationality }
      category={ category }
      alcoholicOrNot={ alcoholicOrNot }
      name={ name }
      image={ image }
      doneDate={ doneDate }
      tags={ tags }
    />);
    history.push(obj.link);
    screen.getByTestId(obj.nameDrink).click();
    const {
      location: pathname,
    } = history;
    expect(pathname.pathname).toBe('/drinks/178319');
  });
});
