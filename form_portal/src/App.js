import "./App.css";
import UserHomePage from "./pages/UserPages/UserHomePage.jsx";
import UserViewFormsPage from "./pages/UserPages/UserViewFormsPage.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import UserSignReviewPage from "./pages/UserPages/UserSignReviewPage.jsx";
import UserSignFormsPage from "./pages/UserPages/UserSignFormsPage.jsx";
import EditForm from "./pages/UserPages/EditForm.jsx";

function App() {
  const appStyle = {
    backgroundColor: "#fff0f0", 
    minHeight: "100vh", 
  };
  return (
    <Router>
      <div style={appStyle}>
        <div className="d-flex flex-column bd-highlight mb-3">
          <Header />
          <Sidebar />
        </div>
        <Routes>
          <Route path="/" element={<UserHomePage/>}/>
          <Route path="/user-review-sign" element={<UserSignReviewPage />} />
          <Route path="/user-sign-forms" element={<UserSignFormsPage />} />
          <Route path="/editform/:id" element={<EditForm/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
