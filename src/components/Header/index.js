import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

export default function Header() {
  const [searchBarEnable, setSearchBarEnable] = useState(false);
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('');

  const history = useHistory();
  const { location: { pathname } } = history;
  const pathName = `${pathname.replace('/', '')}/`;
  let string = '';
  let pathnameFormatted = '';
  for (let index = 0; index < pathName.length; index += 1) {
    if (pathName[index] === '/') {
      string = `${string[0].toUpperCase()}${
        string.slice(1)
      }`;
      pathnameFormatted += `${string} `;
      string = '';
    } else {
      string += pathName[index];
    }
  }
  const onChangSearch = ({ target: { value } }) => setSearch(value);
  const onChangeRadio = ({ target: { value } }) => {
    setRadio(value);
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
          { pathnameFormatted }
        </h1>
        <div className="header-div-button-search">
          {(pathname === '/foods' || pathname === '/drinks') && (
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
      <div className="header-div-search-bar">
        {searchBarEnable && (
          <>
            <input
              type="text"
              value={ search }
              placeholder="Search Recipe"
              data-testid="search-input"
              onChange={ onChangSearch }
            />
            <div style={ { display: 'flex', alignItems: 'space-between' } }>
              <div style={ { marginLeft: '8px' } }>
                <label htmlFor="ingredient-name">
                  <input
                    type="radio"
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
                    data-testid="first-letter-search-radio"
                    name="product"
                    value="fist-letter"
                    onChange={ onChangeRadio }
                  />
                  Fist Letter
                </label>
              </div>
            </div>
            <p />
            {radio}
            <button type="button" data-testid="exec-search-btn">Search</button>
          </>
        )}
      </div>
    </header>
  );
}
