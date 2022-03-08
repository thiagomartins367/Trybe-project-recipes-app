import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Route, Switch, BrowserRouter } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';
import ContextProvider from './context/ContextProvider';

function App() {
  return (
    <div className="meals">
      <ContextProvider>
        {/* <BrowserRouter>
          <Switch>
            <Route path="/foods" component={Foods} />
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
            <Route path="/done-recipes" component={ } />
            <Route path="/favorite-recipes" component={ } />
            <Route exact path="/" component={ } />
          </Switch>
        </BrowserRouter> */}
      </ContextProvider>
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
    </div>
  );
}

export default App;
