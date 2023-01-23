import "~/styles/globals.css";
import { Outlet, Link } from "react-router-dom";
import logoImg from "~/assets/logo.svg";

export function App() {
  return (
    <>
      <header className="w-full bg-white flex items-center justify-between p-4 sm:px-8 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img
            src={logoImg}
            alt="logo open-ai"
            className="w-28 object-contain"
          />
        </Link>

        <Link
          to="/create-post"
          className="font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md transition-opacity hover:opacity-80"
        >
          Create
        </Link>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fefe] min-h-[calc(100vh-73px)]">
        <Outlet />
      </main>
    </>
  );
}
