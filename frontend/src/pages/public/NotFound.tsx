import { PUBLIC_BASE_URL } from "../../api/axiosInstance";

const NotFound = () => {
  return (
    <main className="bg-main-brown-300 flex flex-col items-center gap-4 py-12 mb-0">
      <img src={PUBLIC_BASE_URL + "images/404.svg"} alt="404 icon" />
    </main>
  );
};

export default NotFound;
