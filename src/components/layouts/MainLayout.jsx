import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Newsletter from "../common/Newsletter";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const MainLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="main-layout">
      <Header user={user} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
