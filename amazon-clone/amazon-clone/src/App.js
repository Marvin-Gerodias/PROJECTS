import React from 'react'
import './App.css';

import Header from './Header'
import Home from './Home'
import Checkout from './Checkout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
      <Router>
        
        <div className="app">
          <Header />

          <Switch>

            <Route path='/checkout'>
              <Checkout />
            </Route>

            {/*default route always at the bottom of the switch*/}
            <Route path='/'>
              <Home />
            </Route>

          </Switch>
        </div>
      </Router>
  );
}

export default App;
