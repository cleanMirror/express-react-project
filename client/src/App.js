import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import Illustration from './component/Illustration';
import IllustView from './component/IllustView';
import Follow from './component/Follow';
import PutIllust from './component/PutIllust';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/illustration' element={<Illustration />} />
        <Route path='/illustView' element={<IllustView/>} />
        <Route path='/follow' element={<Follow />} />
        <Route path='/putIllust' element={<PutIllust/>} />
      </Routes>
    </Router>
  );
};

export default App;
