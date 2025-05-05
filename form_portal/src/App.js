import "./App.css";
import UserHomePage from "./pages/UserPages/UserHomePage.jsx";
import UserViewFormsPage from "./pages/UserPages/UserViewFormsPage.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import UserSignReviewPage from "./pages/UserPages/UserSignReviewPage.jsx";
import UserSignFormsPage from "./pages/UserPages/UserSignFormsPage.jsx";
import EditForm from "./pages/UserPages/EditForm.jsx";
import LoginPage from "./pages/LoginPages/LoginPage.jsx";
import UserFormPreview from "./pages/UserPages/UserFormPreview.jsx";
import SetPasswordPage from "./pages/LoginPages/SetPasswordPage.jsx";
import AdminCreateUserPage from "./pages/AdminPages/AdminAddUserPage.jsx";
import AdminCreateTemplatePage from "./pages/AdminPages/AdminCreateTemplatePage.jsx";
import AdminViewTemplatePage from "./pages/AdminPages/AdminViewTemplatePage.jsx";
import AdminHomePage from "./pages/AdminPages/AdminHomePage.jsx";

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

  // const [user, setUser] = useState({
  //   username: "",
  //   userLevel: -1,
  //   isAdmin: -1,
  // });

  // const login = (userData) => {
  //   console.log("Logging in...");
  //   console.log(userData);
  //   setUser(userData);
  // };

  // const logout = () => {
  //   setUser({ username: "", userLevel: -1, isAdmin: 0 });
  // };

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
        <Route path="/user-review-sign" element={<UserSignReviewPage />} />
        <Route path="/user-sign-forms" element={<UserSignFormsPage />} />
        <Route path="/editform" element={<EditForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/set-password" element={<SetPasswordPage />} />
        <Route path="/create-user" element={<AdminCreateUserPage />} />
        <Route path="/preview-form" element={<UserFormPreview />} />
        <Route
          path="/admin-create-template"
          element={<AdminCreateTemplatePage />}
        />
        <Route
          path="/admin-view-template"
          element={<AdminViewTemplatePage />}
        />
        <Route path="/admin-home" element={<AdminHomePage/>}/>
      </Routes>
    </div>
  );
};

export default App;
