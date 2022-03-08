import React, { useState, useEffect } from 'react';

function Profile() {
  const [email, setEmail] = useState('');
  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div>
      <h3 data-testid="profile-email">{email.email}</h3>
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
    </div>
  );
}

export default Profile;
