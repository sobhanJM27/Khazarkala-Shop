import { v4 as uuidv4 } from "uuid";
import Telegram from "../components/UI/icons/Telegram";
import Instagram from "../components/UI/icons/Instagram";
import Whatsapp from "../components/UI/icons/Whatsapp";

export const socials = [
  {
    name: "تلگرام",
    link: "https://telegram.me/+989355690741",
    icon: Telegram,
    id: uuidv4(),
  },
  {
    name: "اینستاگرام",
    link: "https://instagram.com/hadinamazi91",
    icon: Instagram,
    id: uuidv4(),
  },
  {
    name: "واتساپ",
    link: "https://wa.me/+989355690741",
    icon: Whatsapp,
    id: uuidv4(),
  },
];
