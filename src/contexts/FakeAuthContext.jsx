import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initailState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };

    case "logout":
      return { ...state, isAuthenticated: false, user: null };

    default:
      throw new Error("Uknown Action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initailState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const auth = useContext(AuthContext);
  if (auth === undefined)
    throw new Error("AuthContext was uesd outside the AuthProvider");
  return auth;
}

export { AuthProvider, useAuth };
