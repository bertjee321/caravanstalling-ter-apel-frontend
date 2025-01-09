import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectAuthError,
  selectAuthIsLoading,
  selectIsAuthenticated,
} from "../../redux/auth/auth.selectors";
import { login } from "../../redux/auth/auth.thunks";
import { AppDispatch } from "../../redux/store";
import "./Login.css";
import SubmitButton from "../../components/buttons/SubmitButton";

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // Select state from the Redux store
  const errorMessage = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthIsLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Local state for login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (isLoading) {
    return (
      <div className="login-container">
        <div className="card">
          <p>Laden ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="card">
        <h1 className="login-title">Caravanstalling</h1>
        <p className="login-subtitle">Inloggen</p>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Voer uw e-mailadres in"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Wachtwoord</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="voer uw wachtwoord in"
              required
            />
          </div>

          <SubmitButton>Inloggen</SubmitButton>
        </form>

        <div className="login-footer">
          <p>
            <a href="#">Wachtwoord vergeten?</a>
          </p>
          <p className="company-info">
            Created by KBit Solutions, <br /> Bert Kruiter (2025)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
