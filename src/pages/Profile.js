import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div>
      <h3 data-testid="profile-email">{email.email}</h3>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => {
          history.push('/done-recipes');
        } }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => {
          history.push('/favorite-recipes');
        } }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
