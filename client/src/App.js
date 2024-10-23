import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import Illustration from './component/Illustration';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/illustration' element={<Illustration />} />
      </Routes>
    </Router>
  );
};

export default App;
