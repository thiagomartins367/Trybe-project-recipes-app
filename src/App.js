import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import RecipesScreen from './pages/RecipesScreen';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import FoodsIngredients from './pages/FoodsIngredients';
import DrinksIngredients from './pages/DrinksIngredients';

function App() {
  return (
    <main>
      <ContextProvider>
        <Switch>
          <Route exact path="/foods" component={ RecipesScreen } />
          <Route exact path="/drinks" component={ RecipesScreen } />
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
          <Route exact path="/explore/foods/ingredients" component={ FoodsIngredients } />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ DrinksIngredients }
          />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/" component={ Login } />
          {/* <Route exact path="/foods/:id-da-receita" component={ } />
          <Route exact path="/drinks/:id-da-receita" component={ } />
          <Route exact path="/foods/:id-da-receita/in-progress" component={ } />
          <Route exact path="/drinks/:id-da-receita/in-progress" component={ } />
          <Route exact path="/explore/foods/nationalities" component={ } />
          <Route exact path="/done-recipes" component={ } />
          <Route exact path="/favorite-recipes" component={ }/> */}
        </Switch>
      </ContextProvider>
    </main>
  );
}

export default App;
