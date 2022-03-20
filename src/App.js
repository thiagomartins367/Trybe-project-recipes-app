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
import RecipeInProgress from './pages/recipeInProgress';
import FoodDetails from './pages/foodDetails';
import DrinkDetails from './pages/drinkDetails';
import NotFound from './pages/notFound';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <main>
      <ContextProvider>
        <Switch>
          <Route
            exact
            path="/foods/:idRecipe/in-progress"
            render={
              (propsRoute) => (<RecipeInProgress
                { ...propsRoute }
                recipeType="food"
                pageName="progress"
              />)
            }
          />
          <Route
            exact
            path="/drinks/:idRecipe/in-progress"
            render={
              (propsRoute) => (<RecipeInProgress
                { ...propsRoute }
                recipeType="drink"
                pageName="progress"
              />)
            }
          />
          <Route
            exact
            path="/foods/:idRecipe"
            render={ (propsRoute) => (
              <FoodDetails { ...propsRoute } pageName="details" />) }
          />
          <Route
            exact
            path="/drinks/:idRecipe"
            render={ (propsRoute) => (
              <DrinkDetails { ...propsRoute } pageName="details" />) }
          />
          <Route exact path="/foods" component={ RecipesScreen } />
          <Route exact path="/drinks" component={ RecipesScreen } />
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/" component={ Login } />
          <Route exact path="/explore/foods/ingredients" component={ FoodsIngredients } />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ DrinksIngredients }
          />
          <Route path="*" component={ NotFound } />
          {/* <Route exact path="/explore/foods/nationalities" component={ } /> */}
        </Switch>
      </ContextProvider>
    </main>
  );
}

export default App;
