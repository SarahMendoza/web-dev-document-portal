<<<<<<< HEAD:form_portal/src/components/SidebarData.jsx
import UserHomePage from "../pages/UserPages/UserHomePage";
import UserCreateFormPage from "../pages/UserPages/UserCreateFormPage";
import UserViewFormsPage from "../pages/UserPages/UserViewFormsPage";
import UserSignFormsPage from "../pages/UserPages/UserSignFormsPage";
import AdminViewFormsPage from "../pages/AdminPages/AdminViewFormPage";
=======
import UserHomePage from "./../../pages/UserPages/UserHomePage";
import UserCreateFormPage from "./../../pages/UserPages/UserCreateFormPage";
import UserViewFormsPage from "./../../pages/UserPages/UserViewFormsPage";
import UserSignFormsPage from "./../../pages/UserPages/UserSignFormsPage";
>>>>>>> c5ae3599470e6dd511a8d0ee7bb6eae4f4a307ac:form_portal/src/components/Sidebar/SidebarData.jsx

export const SidebarData = [
  {
    title: "Home",
    component: UserHomePage,
    user_type: "User",
    path: "/user-home",
    cName: "nav-text",
  },
  {
    title: "Create Form",
    component: UserCreateFormPage,
    user_type: "User",
    path: "/create-forms",
    cName: "nav-text",
  },
  {
    title: "View Forms",
    component: UserViewFormsPage,
    user_type: "User",
    path: "/view-forms",
    cName: "nav-text",
  },
  {
    title: "Sign Forms",
    component: UserSignFormsPage,
    user_type: "User",
    path: "/sign-forms",
    cName: "nav-text",
  },
  {
    title: "Admin View Forms",
    component: AdminViewFormsPage,
    user_type: "Admin",
    path: "/admin-view-forms",
    cName: "nav-text",
  },
];
