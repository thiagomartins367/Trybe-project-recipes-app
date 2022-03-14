import React from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import ContextProvider from './context/ContextProvider';
import DrinkDetails from './pages/drinkDetails';
import FoodDetails from './pages/foodDetails';
import Login from './pages/login';
import NotFound from './pages/notFound';
import RecipeInProgress from './pages/recipeInProgress';

function App() {
  return (
    // <div className="meals">
    <div>
      <ContextProvider>
        <BrowserRouter>
          <Switch>
            {/* <Route path="/foods" component={ } />
            <Route path="/drinks" component={ } /> */}
            <Route
              exact
              path="/foods/:slug/in-progress"
              render={ () => <RecipeInProgress /> }
              // component={ RecipeInProgress }
            />
            <Route
              exact
              path="/drinks/:slug/in-progress"
              component={ RecipeInProgress }
            />
            <Route
              exact
              path="/foods/:slug"
              render={ (propsRoute) => (
                <FoodDetails { ...propsRoute } />) }
            />
            <Route
              exact
              path="/drinks/:slug"
              render={ (propsRoute) => (
                <DrinkDetails { ...propsRoute } />) }
            />
            {/* <Route path="/explore" component={ } />
            <Route path="/explore/foods" component={ } />
            <Route path="/explore/drinks" component={ } />
            <Route path="/explore/foods/ingredients" component={ } />
            <Route path="/explore/drinks/ingredients" component={ } />
            <Route path="/explore/foods/nationalities" component={ } />
            <Route path="/profile" component={ } />
            <Route path="/done-recipes" component={ } />
            <Route path="/favorite-recipes" component={ } /> */}
            <Route exact path="/" component={ Login } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </ContextProvider>
      {/* <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object> */}
    </div>
  );
}

export default App;
