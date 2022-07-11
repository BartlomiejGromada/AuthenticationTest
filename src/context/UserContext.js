import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { createContext, useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({
  user: null,
  register: async (email, password) => {},
  login: async (email, password) => {},
  logout: async () => {},
});

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        authProvider: "local",
        email,
      });
    } catch (error) {
      console.log("REGISTER ERROR", error);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      navigate("/secret");
    } catch (error) {
      console.log("LOGIN ERROR", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log("SIGNOUT ERROR", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        register: (email, password) => register(email, password),
        login: (email, password) => login(email, password),
        logout: logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
