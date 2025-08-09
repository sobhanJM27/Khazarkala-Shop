export type FilterItem = {
  title: string;
  key?: string;
  _id?: string;
};

export const productsSorts = [
  {
    title: "جدید ترین",
    key: "latest",
  },
  {
    title: "قدیمی ترین",
    key: "oldest",
  },
  {
    title: "گران ترین",
    key: "highest",
  },
  {
    title: "ارزان ترین",
    key: "lowest",
  },
];

export const articlesSorts = [
  {
    title: "جدید ترین",
    key: "latest",
  },
  {
    title: "قدیمی ترین",
    key: "oldest",
  },
];
