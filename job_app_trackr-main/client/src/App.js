import { Router, Redirect } from '@reach/router';
import './App.css';

import Dashboard from './views/Dashboard';
import UserPortal from './views/UserPortal';


function App() {
  return (
    <div className="App">
      <Router>
        <UserPortal path="/user" />
        <Dashboard path="/dashboard/:id"/> 
        <Redirect from="/" to="/dashboard" noThrow />
      </Router>
    </div>
  );
}

export default App;
