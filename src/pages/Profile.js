import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState({ email: '' });

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem('user'));
    if (userEmail !== null) {
      setEmail(userEmail);
    }
  }, []);
  return (
    <div>
      <Header />
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
      <BottomMenu />
    </div>
  );
}

export default Profile;
