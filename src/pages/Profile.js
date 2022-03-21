import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import { TIME_OUT_MS } from '../constants';
import Context from '../context/Context';

function Profile() {
  const history = useHistory();
  const { setEmail, emailProfile, setEmailProfile } = useContext(Context);

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem('user'));
    if (userEmail !== null) {
      setEmailProfile(userEmail);
    }
  }, []);

  return (
    <section className="section-profile">
      <Header
        titleName="Profile"
        searchIconOnScreen={ false }
      />
      <h3
        className="user-email-profile"
        data-testid="profile-email"
      >
        {emailProfile.email}
      </h3>
      <section className="section-buttons-profile">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => {
            setTimeout(() => history.push('/done-recipes'), TIME_OUT_MS);
          } }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => {
            setTimeout(() => history.push('/favorite-recipes'), TIME_OUT_MS);
          } }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            setEmail('');
            setTimeout(() => history.push('/'), TIME_OUT_MS);
          } }
        >
          Logout
        </button>
      </section>
      <BottomMenu />
    </section>
  );
}

export default Profile;

// teste falhando
