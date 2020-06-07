import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import '../styles/styles.css';
import Home from "./Home";
import Review from "./Review";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/review/:movie" component={Review} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
