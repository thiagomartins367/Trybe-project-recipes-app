import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import {
  ingredientSearch,
  nameLatterSearch,
  searchLatterSearch,
  ingredientSearchDrink,
  nameLatterSearchDrink,
  searchLatterSearchDrink,
} from '../../services/fetchSearchFilter';

const consultRedurect = (editableStateRecipesData, historyData, pathNameData) => {
  if (editableStateRecipesData.length === 1 && pathNameData === 'foods/') {
    historyData.push(`/${pathNameData}${editableStateRecipesData[0].idMeal}`);
  } else if (editableStateRecipesData.length === 1 && pathNameData === 'drinks/') {
    historyData.push(`/${pathNameData}${editableStateRecipesData[0].idDrink}`);
  }
};

const alertRequest = (response, history, setEditableStateRecipes, pathName) => {
  if (response === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    history.push('/');
  }
  setEditableStateRecipes(response);
  consultRedurect(response, history, pathName);
};

export default function Header({ titleName, searchIconOnScreen }) {
  const [searchBarEnable, setSearchBarEnable] = useState(false);
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('');
  const { setEditableStateRecipes,
    setActiveFilter,
  } = useContext(Context);
  const history = useHistory();
  const { location: { pathname } } = history;
  const pathName = `${pathname.replace('/', '')}/`;
  const onChangSearch = ({ target: { value } }) => setSearch(value);
  const onChangeRadio = ({ target: { value } }) => {
    setRadio(value);
  };

  const ingredient = pathName === 'foods/' ? ingredientSearch : ingredientSearchDrink;
  const name = pathName === 'foods/' ? nameLatterSearch : nameLatterSearchDrink;
  const latter = pathName === 'foods/' ? searchLatterSearch : searchLatterSearchDrink;
  const handleClickSearchInput = () => {
    switch (radio) {
    case 'ingredient':
      ingredient(search)
        .then((response) => {
          alertRequest(response, history, setEditableStateRecipes, pathName);
        });
      setActiveFilter('');
      break;
    case 'name':
      name(search)
        .then((response) => {
          alertRequest(response, history, setEditableStateRecipes, pathName);
        });
      setActiveFilter('');
      break;
    case 'fist-letter':
      latter(search)
        .then((response) => {
          alertRequest(response, history, setEditableStateRecipes, pathName);
        });
      setActiveFilter('');
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    default:
      break;
    }
  };
  return (
    <header>
      <section className="section-header">
        <div className="header-div-button-profile">
          <button type="button" onClick={ () => history.push('/profile') }>
            <img
              src={ profileIcon }
              alt="profile icon"
              data-testid="profile-top-btn"
            />
          </button>
        </div>
        <h1 className="header-h1-page-title" data-testid="page-title">
          { titleName }
        </h1>
        <div className="header-div-button-search">
          {searchIconOnScreen && (
            <button
              type="button"
              onClick={ () => setSearchBarEnable(!searchBarEnable) }
            >
              <img
                src={ searchIcon }
                alt="search icon"
                data-testid="search-top-btn"
              />
            </button>
          )}
        </div>
      </section>
      {searchBarEnable && (
        <section className="header-section-search-bar">
          <div className="header-div-search">
            <input
              type="text"
              value={ search }
              placeholder="Search Recipe"
              data-testid="search-input"
              onChange={ onChangSearch }
            />
          </div>
          <section className="header-section-radio-buttons">
            <div style={ { marginLeft: '8px' } }>
              <label htmlFor="ingredient-name">
                <input
                  type="radio"
                  className="header-radio-button"
                  data-testid="ingredient-search-radio"
                  name="product"
                  value="ingredient"
                  onChange={ onChangeRadio }
                />
                Ingredient
              </label>
            </div>
            <div style={ { marginLeft: '8px' } }>
              <label htmlFor="name">
                <input
                  type="radio"
                  className="header-radio-button"
                  data-testid="name-search-radio"
                  name="product"
                  value="name"
                  onChange={ onChangeRadio }
                />
                Name
              </label>
            </div>
            <div style={ { marginLeft: '8px' } }>
              <label htmlFor="fist-letter">
                <input
                  type="radio"
                  className="header-radio-button"
                  data-testid="first-letter-search-radio"
                  name="product"
                  value="fist-letter"
                  onChange={ onChangeRadio }
                />
                Fist Letter
              </label>
            </div>
          </section>
          <div className="header-div-search-btn">
            <button
              type="button"
              data-testid="exec-search-btn"
              onClick={ handleClickSearchInput }
            >
              Search
            </button>
          </div>
        </section>
      )}
    </header>
  );
}

Header.propTypes = {
  titleName: PropTypes.string,
  searchIconOnScreen: PropTypes.bool,
}.isRequired;
