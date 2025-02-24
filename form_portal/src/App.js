import "./App.css";
import UserHomePage from "./pages/UserPages/UserHomePage.jsx";
import UserViewFormsPage from "./pages/UserPages/UserViewFormsPage.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import UserSignReviewPage from "./pages/UserPages/UserSignReviewPage.jsx";

function App() {
  const appStyle = {
    backgroundColor: "#fff0f0", // Set the background color
    minHeight: "100vh", // Ensure the background covers the entire viewport height
  };
  return (
    <Router>
      <div style={appStyle}>
        <div className="d-flex flex-column bd-highlight mb-3">
          <Header />
          <Sidebar />
        </div>
        <Routes>
          <Route path="/user-review-sign" element={<UserSignReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
