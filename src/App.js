import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import Login from './pages/Login';
import RecipesScreen from './pages/RecipesScreen';

function App() {
  return (
    <main>
      <ContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/foods" component={ RecipesScreen } />
            <Route path="/drinks" component={ RecipesScreen } />
            {/* <Route path="/foods/:id-da-receita" component={ } />
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
            <Route path="/done-recipes" component={ } />
            <Route path="/favorite-recipes" component={ } /> */}
            <Route exact path="/" component={ Login } />
          </Switch>
        </BrowserRouter>
      </ContextProvider>
    </main>
  );
}

export default App;
