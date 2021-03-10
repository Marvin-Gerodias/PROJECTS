import React, { useEffect } from 'react'
import './App.css';

import Header from './Header'
import Login from './Login'
import Home from './Home'
import Checkout from './Checkout'
import Payment from './Payment'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { auth } from './firebase'
import { useStateValue } from './StateProvider'
import Orders from './Orders'

//Stripe
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe('pk_test_51ITEFzHUcOuXHEqyIwh1T8uSdhZsYCWspEee7o6zuFMc0ZhqVPgYFnZtCm7IxnaxaVzEKvqZJkbuJVF4xxVwQS4V00rB2K0c5x')

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once when the app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>> ', authUser);
      if(authUser){
        //the user just logged ir / was already logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
      <Router>
        
        <div className="app">

          <Switch>

            <Route path='/login'>
              <Login />
            </Route>

            <Route path='/checkout'>
              <Header />  
              <Checkout />
            </Route>

            <Route path='/payment'>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </Route>
            
            <Route path='/orders'>
              <Header />
              <Orders />
            </Route>

            {/*default route always at the bottom of the switch*/}
            <Route path='/'>
              <Header />
              <Home />
            </Route>

          </Switch>
        </div>
      </Router>
  );
}

export default App;
