import { useNavigate } from "react-router-dom";
import "./NavigationMenu.css";

const NavigationMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (navigateTo: string) => {
    navigate(`/${navigateTo}`);
  };

  return (
    <nav className="app-navbar bg--dark-blue">
      <ul className="navbar-vertical">
        <li className="nav--item" onClick={() => handleNavigation("dashboard")}>
          Dashboard
        </li>
        <li className="nav--item" onClick={() => handleNavigation("customers")}>
          Klanten
        </li>
        <li className="nav--item" onClick={() => handleNavigation("invoices")}>
          Facturen
        </li>
        <li className="nav--item" onClick={() => handleNavigation("vehicles")}>
          Voertuigen
        </li>
        <hr style={{ margin: "5px 10px 5px 10px" }}></hr>
        <li className="nav--item" onClick={() => handleNavigation("logout")}>
          Uitloggen
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
