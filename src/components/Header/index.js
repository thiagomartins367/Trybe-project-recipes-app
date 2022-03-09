import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

export default function Header() {
  const [searchBarEnable, setSearchBarEnable] = useState(false);
  const [search, setSearch] = ('');

  const history = useHistory();

  const onChangSearch = ({ target: { value } }) => setSearch(value);
  return (
    <header style={ { height: '58px' } }>
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIcon } alt="profile icon" />
      </button>

      <h1 data-testid="page-title">Foods</h1>

      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ () => setSearchBarEnable(!searchBarEnable) }
      >
        <img src={ searchIcon } alt="search icon" />
      </button>
      {
        searchBarEnable
          && <input
            type="text"
            value={ search }
            onChange={ onChangSearch }
          />
      }

    </header>
  );
}
