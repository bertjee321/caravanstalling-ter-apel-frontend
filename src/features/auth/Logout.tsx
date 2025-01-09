import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonContainerVertical from "../../components/buttons/button-containers/ButtonContainerVertical";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import { logout } from "../../redux/auth/auth.thunks";
import { AppDispatch } from "../../redux/store";
import "./Logout.css";

const Logout: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  const handleStayLoggedIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="logout-container">
      <div className="card">
        <h1 className="logout-title">Uitloggen</h1>
        <p className="logout-subtitle">Weet je zeker dat je wilt uitloggen?</p>

        <ButtonContainerVertical>
          <SecondaryButton onClick={handleLogout}>
            Ja, uitloggen
          </SecondaryButton>
          <PrimaryButton onClick={handleStayLoggedIn}>
            Nee, ingelogd blijven
          </PrimaryButton>
        </ButtonContainerVertical>
      </div>
    </div>
  );
};

export default Logout;
