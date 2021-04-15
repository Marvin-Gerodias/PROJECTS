import { Router, Redirect } from '@reach/router';
import './App.css';

import Dashboard from './views/Dashboard';
import UserPortal from './views/UserPortal';
import SingleJob from './views/SingleJob';

function App() {
  return (
    <div className="App">
      <Router>
        <UserPortal path="/user" />
        <Dashboard path="/dashboard/:id" />
        <SingleJob path="/user_job/:id" />
        <Redirect from="/" to="/user" noThrow />
      </Router>
    </div>
  );
}

export default App;
