import './App.css';
import { Router, Redirect } from '@reach/router'

//view imports
import Portal from './Views/Portal'
import Dashboard from './Views/Dashboard'

function App() {
  return (
    <div className="App">
      <Router>
        <Portal path="/portal" />
        <Dashboard path="/dashboard/:id" />

        <Redirect from="/" to="portal" noThrow />
      </Router>
    </div>
  );
}

export default App;
