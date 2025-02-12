import "./App.css";
import UserHomePage from "./pages/UserHomePage.jsx";
import UserViewFormsPage from "./pages/UserViewFormsPage.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  const appStyle = {
    backgroundColor: '#fff0f0', // Set the background color
    minHeight: '100vh', // Ensure the background covers the entire viewport height
  };
  return (
    <Router>
      <div style={appStyle}>
        <div className="d-flex flex-column bd-highlight mb-3">
          <Header />
          <Sidebar />
        </div>

      <div className="main-page-content">
        // place a page component inside of this divider
      </div>
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
      </div>
    </Router>
  );
}

export default App;
