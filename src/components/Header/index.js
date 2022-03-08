import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

export default function Header() {
  const history = useHistory();
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
      >
        <img src={ searchIcon } alt="search icon" />
      </button>
    </header>
  );
}
