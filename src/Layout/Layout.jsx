import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function Layout() {
  return (
    <>
      <Header />
      <main className="h-screen w-screen ">
        <Outlet />
        <Footer/>
      </main>
    </>
  );
}

export default Layout;
