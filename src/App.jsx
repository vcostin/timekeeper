import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import About from "./About.jsx";
import ScheduleListContainer from "./ScheduleListContainer.jsx";

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/schedule">Schedule</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/schedule"
          element={<ScheduleListContainer />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
