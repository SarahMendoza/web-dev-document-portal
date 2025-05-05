import UserHomePage from "../../pages/UserPages/UserHomePage";
import UserCreateFormPage from "../../pages/UserPages/UserCreateFormPage";
import UserViewFormsPage from "../../pages/UserPages/UserViewFormsPage";
import UserSignFormsPage from "../../pages/UserPages/UserSignFormsPage";
import AdminViewFormsPage from "../../pages/AdminPages/AdminViewFormPage";
import AdminHomePage from "../../pages/AdminPages/AdminHomePage";
import AdminManageUsersPage from "../../pages/AdminPages/AdminManageUsersPage";
import AdminCreateTemplatePage from "../../pages/AdminPages/AdminCreateTemplatePage";

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
];

export const AdminSidebarData = [
  {
    title: "Home",
    component: AdminHomePage,
    user_type: "Admin",
    path: "/admin-home",
    cName: "nav-text",
  },
  {
    title: "View Forms",
    component: AdminViewFormsPage,
    user_type: "Admin",
    path: "/admin-view-forms",
    cName: "nav-text",
  },
  {
    title: "Manage Users",
    component: AdminManageUsersPage,
    user_type: "Admin",
    path: "/admin-manage-users",
    cName: "nav-text",
  },
  {
    title: "Manage Templates",
    component: AdminCreateTemplatePage,
    path: "/admin-manage-templates",
    user_type: "Admin",
    cName: "nav-text",
  },
];
