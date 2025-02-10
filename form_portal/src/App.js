import "./App.css";
import UserHomePage from "./pages/UserHomePage.jsx";
import UserViewFormsPage from "./pages/UserViewFormsPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav>
        <ul style={{ display: "flex", gap: "1rem" }}>
          <li>
            <Link to="/home">UserHomePage</Link>
          </li>
          <li>
            <Link to="/about">UserViewFormsPage</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/home" element={<UserHomePage />} />
        <Route path="/about" element={<UserViewFormsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
