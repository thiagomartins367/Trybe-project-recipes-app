import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
// import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="meals">
      <ContextProvider>
        <BrowserRouter>
          <Switch>
            {/* <Route path="/foods" component={Foods} />
            <Route path="/drinks" component={ } />
            <Route path="/foods/:id-da-receita" component={ } />
            <Route path="/drinks/:id-da-receita" component={ } />
            <Route path="/foods/:id-da-receita/in-progress" component={ } />
            <Route path="/drinks/:id-da-receita/in-progress" component={ } />
            <Route path="/explore" component={ } />
            <Route path="/explore/foods" component={ } />
            <Route path="/explore/drinks" component={ } />
            <Route path="/explore/foods/ingredients" component={ } />
            <Route path="/explore/drinks/ingredients" component={ } />
            <Route path="/explore/foods/nationalities" component={ } />
            <Route path="/profile" component={ } />
            <Route path="/favorite-recipes" component={ FavoriteRecipes } /> */}
            <Route path="/done-recipes" component={ DoneRecipes } />
            <Route exact path="/" component={ Login } />
          </Switch>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
