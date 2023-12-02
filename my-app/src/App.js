import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Courses from './Courses';

function App() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/courses" component={Courses} />
    </Router>
  );
}

export default App;
