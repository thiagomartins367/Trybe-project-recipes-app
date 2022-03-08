import React from 'react';

export default function Header() {
  return (
    <header style={ { height: '58px' } }>
      <button type="submit" data-testid="profile-top-btn">icon</button>

      <h1 data-testid="page-title">Foods</h1>

      <button type="button" data-testid="search-top-btn">search</button>
    </header>
  );
}
