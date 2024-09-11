import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  function handelClick(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  return (
    <main className={styles.login}>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={handelClick}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
