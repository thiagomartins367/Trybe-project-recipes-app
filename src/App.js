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
import ExploreNationalities from './pages/ExploreNationalities';

function App() {
  return (
    <main>
      <ContextProvider>
        <Switch>
          <Route
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
            path="/explore/foods/ingredients"
            component={ FoodsIngredients }
          />
          <Route
            path="/explore/drinks/ingredients"
            component={ DrinksIngredients }
          />
          <Route
            path="/explore/foods/nationalities"
            component={ ExploreNationalities }
          />
          <Route
            path="/explore/drinks/nationalities"
            component={ NotFound }
          />
          <Route
            path="/foods/:idRecipe"
            render={ (propsRoute) => (
              <FoodDetails { ...propsRoute } pageName="details" />) }
          />
          <Route
            path="/drinks/:idRecipe"
            render={ (propsRoute) => (
              <DrinkDetails { ...propsRoute } pageName="details" />) }
          />
          <Route path="/explore/foods" component={ ExploreFoods } />
          <Route path="/explore/drinks" component={ ExploreDrinks } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/foods" component={ RecipesScreen } />
          <Route path="/drinks" component={ RecipesScreen } />
          <Route path="/explore" component={ Explore } />
          <Route path="/profile" component={ Profile } />
          <Route exact path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </ContextProvider>
    </main>
  );
}

export default App;
