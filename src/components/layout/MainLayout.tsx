import { Outlet } from "react-router-dom";
import NavigationMenu from "../navigation/NavigationMenu";
import "./MainLayout.css";

const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      {/* Left Navigation Menu */}
      <NavigationMenu />

      {/* Main Content */}
      <main className="app-content">
        <Outlet /> {/* Renders child routes */}
      </main>
    </div>
  );
};

export default MainLayout;
