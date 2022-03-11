import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';

function App() {
  return (
    <div className="meals">
      <ContextProvider>
        <Switch>
          {/* <Route path="/foods" component={ Foods } />
          <Route path="/drinks" component={ } />
          <Route path="/foods/:id-da-receita" component={ } />
          <Route path="/drinks/:id-da-receita" component={ } />
          <Route path="/foods/:id-da-receita/in-progress" component={ } />
          <Route path="/drinks/:id-da-receita/in-progress" component={ } /> */}
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
          {/* <Route path="/explore/foods/ingredients" component={ } />
          <Route path="/explore/drinks/ingredients" component={ } />
          <Route path="/explore/foods/nationalities" component={ } /> */}
          <Route path="/profile" component={ Profile } />
          {/* <Route path="/done-recipes" component={ } />
            <Route path="/favorite-recipes" component={ } /> */}
          <Route exact path="/" component={ Login } />
        </Switch>
      </ContextProvider>
    </div>
  );
}

export default App;
