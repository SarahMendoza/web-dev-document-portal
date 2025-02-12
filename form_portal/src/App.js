import "./App.css";
import UserHomePage from "./pages/UserHomePage.jsx";
import UserViewFormsPage from "./pages/UserViewFormsPage.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav>
        <ul style={{ display: "flex", gap: "1rem" }}>
          <li>
            <Link to="/">UserHomePage</Link>
          </li>
          <li>
            <Link to="/about">UserViewFormsPage</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<UserHomePage />} />
        <Route path="/about" element={<UserViewFormsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
