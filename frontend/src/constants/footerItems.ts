import { v4 as uuidv4 } from "uuid";
import { Uuid } from "../types/uuidType";

export type FooterItem = {
  name: string;
  link: string;
  image?: string;
  imgTitle?: string;
  needInvert?: boolean;
  key: Uuid;
};

export const fastAccessItems = [
  {
    name: "محصولات",
    link: "/products",
    key: uuidv4(),
  },
  {
    name: "مقالات",
    link: "/articles",
    key: uuidv4(),
  },
];

export const linkItems = [
  {
    name: "درباره ما",
    link: "about-us",
    key: uuidv4(),
  },
  {
    name: "تماس با ما",
    link: "contact-us",
    key: uuidv4(),
  },
];

export const externalLegalItems = [
  {
    name: "زرین پال",
    link: "https://www.zarinpal.com/",
    image: "https://www.svgrepo.com/show/329819/zarinpal.svg",
    key: uuidv4(),
    needInvert: true,
  },
];
