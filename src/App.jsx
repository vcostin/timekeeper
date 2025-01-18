import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ScheduleForm from './SheduleForm.jsx';
import Home from './Home.jsx';
import About from './About.jsx';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/schedule">Schedule</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<ScheduleForm />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
