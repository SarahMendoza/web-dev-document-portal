import "./App.css";
import UserHomePage from "./pages/UserPages/UserHomePage.jsx";
import UserViewFormsPage from "./pages/UserPages/UserViewFormsPage.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from "react-router-dom";
import UserSignReviewPage from "./pages/UserPages/UserSignReviewPage.jsx";
import UserSignFormsPage from "./pages/UserPages/UserSignFormsPage.jsx";
import EditForm from "./pages/UserPages/EditForm.jsx";
import LoginPage from "./pages/LoginPages/LoginPage.jsx";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

const MainLayout = () => {
  const appStyle = {
    backgroundColor: "#fff0f0",
    minHeight: "100vh",
  };

  const location = useLocation();
  // Paths where the sidebar is hidden
  const hideSidebarPaths = ["/"];
  const shouldShowSidebar = !hideSidebarPaths.includes(location.pathname);
  console.log(location.pathname);
  return (
    <div style={appStyle}>
      <div className="d-flex flex-column bd-highlight mb-3">
        <Header />
        {shouldShowSidebar && <Sidebar />}
      </div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user-home" element={<UserHomePage />} />
        <Route path="/user-review-sign" element={<UserSignReviewPage />} />
        <Route path="/user-sign-forms" element={<UserSignFormsPage />} />
        <Route path="/editform/:id" element={<EditForm />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
