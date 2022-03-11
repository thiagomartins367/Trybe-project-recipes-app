import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import Login from './pages/Login';
import RecipesScreen from './pages/RecipesScreen';
import Profile from './pages/Profile';
import Explore from './pages/Explore';

function App() {
  return (
    <main>
      <ContextProvider>
        <Switch>
          {/* <Route path="/foods/:id-da-receita" component={ } />
          <Route path="/drinks/:id-da-receita" component={ } /> */}
          <Route path="/foods" component={ RecipesScreen } />
          <Route path="/drinks" component={ RecipesScreen } />
          <Route exact path="/explore" component={ Explore } />
          <Route path="/profile" component={ Profile } />
          {/* <Route path="/foods/:id-da-receita/in-progress" component={ } />
          <Route path="/drinks/:id-da-receita/in-progress" component={ } />
          <Route path="/explore/foods" component={ } />
          <Route path="/explore/drinks" component={ } />
          <Route path="/explore/foods/ingredients" component={ } />
          <Route path="/explore/drinks/ingredients" component={ } />
          <Route path="/explore/foods/nationalities" component={ } />
          <Route path="/done-recipes" component={ } />
          <Route path="/favorite-recipes" component={ } /> */}
          <Route exact path="/" component={ Login } />
        </Switch>
      </ContextProvider>
    </main>
  );
}

export default App;
