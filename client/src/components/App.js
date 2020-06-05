import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import '../styles/styles.css';
import Home from "./Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route path="/movie" component={Home} /> */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
