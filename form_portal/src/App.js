import "./App.css";
import UserContext from "./context/AuthContext.jsx";
import UserHomePage from "./pages/UserPages/UserHomePage.jsx";
import UserViewFormsPage from "./pages/UserPages/UserViewFormsPage.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useState } from "react";
import UserSignReviewPage from "./pages/UserPages/UserSignReviewPage.jsx";
import UserSignFormsPage from "./pages/UserPages/UserSignFormsPage.jsx";
import EditForm from "./pages/UserPages/EditForm.jsx";
import LoginPage from "./pages/LoginPages/LoginPage.jsx";

function App() {
  const appStyle = {
    backgroundColor: "#fff0f0",
    minHeight: "100vh",
  };

  const [user, setUser] = useState({
    username: "",
    userLevel: -1,
    isAdmin: -1,
  });

  const login = (userData) => {
    console.log("Logging in...");
    console.log(userData);
    setUser(userData);
  };

  const logout = () => {
    setUser({ username: "", userLevel: -1, isAdmin: 0 });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      <Router>
        <div style={appStyle}>
          <div className="d-flex flex-column bd-highlight mb-3">
            <Header />
            <Sidebar />
          </div>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/user-home" element={<UserHomePage />} />
            <Route path="/user-review-sign" element={<UserSignReviewPage />} />
            <Route path="/user-sign-forms" element={<UserSignFormsPage />} />
            <Route path="/editform/:id" element={<EditForm />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
