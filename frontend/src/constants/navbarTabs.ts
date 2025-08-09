import { v4 as uuidv4 } from "uuid";
import Home from "../components/UI/icons/Home";
import Course from "../components/UI/icons/Course";
import Article from "../components/UI/icons/Article";
import User from "../components/UI/icons/User";

export const navbarTabs = [
  {
    name: "خانه",
    path: "/",
    id: uuidv4(),
    icon: Home,
  },
  {
    name: "محصولات",
    path: "/products",
    id: uuidv4(),
    icon: Course,
  },
  {
    name: "مقالات",
    path: "/articles",
    id: uuidv4(),
    icon: Article,
  },
];

export const LoginUserTabs = [
  {
    name: "پنل",
    path: "/dashboard",
    id: uuidv4(),
    icon: User,
  },
  {
    name: "محصولات من",
    path: "/dashboard/products",
    id: uuidv4(),
    icon: Course,
  },
];
