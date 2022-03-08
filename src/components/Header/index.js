import React from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

export default function Header() {
  return (
    <header style={ { height: '58px' } }>
      <button
        type="submit"
        data-testid="profile-top-btn"
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
