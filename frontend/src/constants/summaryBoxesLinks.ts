import { v4 as uuidv4 } from "uuid";
import { SvgIconType } from "../types/IconType";
import Blog from "../components/UI/icons/Blog";
import AboutUs from "../components/UI/icons/AboutUs";
import HelpCenter from "../components/UI/icons/HelpCenter";
import Products from "../components/UI/icons/Products";

export const summaryBoxesLinks: {
  title: string;
  url: string;
  IconComp: SvgIconType;
  id: string;
}[] = [
  {
    title: "محصولات خزر کالا",
    url: "/products",
    IconComp: Products,
    id: uuidv4(),
  },
  {
    title: "مقالات خزر کالا",
    url: "/articles",
    IconComp: Blog,
    id: uuidv4(),
  },
  {
    title: "درباره ما",
    url: "/about-us",
    IconComp: AboutUs,
    id: uuidv4(),
  },
  {
    title: "تماس با ما",
    url: "/contact-us",
    IconComp: HelpCenter,
    id: uuidv4(),
  },
];
