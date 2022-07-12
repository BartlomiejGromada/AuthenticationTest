import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { createContext, useReducer, useState } from "react";
import { auth, db } from "../firebase";

const initialFetchingState = {
  fetching: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "PENDING":
      return {
        fetching: true,
        error: null,
      };
    case "SUCCESS":
      return {
        fetching: false,
        error: false,
      };
    case "FAILED":
      return {
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const UserContext = createContext({
  user: null,
  register: async (email, password) => {},
  login: async (email, password) => {},
  logout: async () => {},
  fetchingState: initialFetchingState,
});

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [fetchingState, dispatch] = useReducer(reducer, initialFetchingState);

  const register = async (email, password) => {
    dispatch({ type: "PENDING" });
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

      dispatch({ type: "SUCCESS" });
      return true;
    } catch (error) {
      dispatch({ type: "FAILED", payload: error.message });
      console.log("REGISTER ERROR", error);
      return false;
    }
  };

  const login = async (email, password) => {
    dispatch({ type: "PENDING" });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: "SUCCESS" });
      setUser(userCredential.user);
      return true;
    } catch (error) {
      dispatch({ type: "FAILED", payload: error.message });
      console.log("LOGIN ERROR", error);
      return false;
    }
  };

  const logout = async () => {
    dispatch({ type: "PENDING" });
    try {
      await signOut(auth);
      setUser(null);
      dispatch({ type: "SUCCESS" });
      return true;
    } catch (error) {
      dispatch({ type: "FAILED", payload: error.message });
      console.log("SIGNOUT ERROR", error);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        register: (email, password) => register(email, password),
        login: (email, password) => login(email, password),
        logout: logout,
        fetchingState: fetchingState,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
