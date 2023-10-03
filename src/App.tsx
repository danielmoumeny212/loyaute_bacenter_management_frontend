import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, } from "react-redux";
import { AnyAction, ThunkDispatch, unwrapResult } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import authService from "./Services/authService";
import { getCurrentUser } from "./features/userSlice";
import { authenticate } from "./features/authSlice";

// import "./App.css";
import Loader from "./components/Loader";
import Router from "./routes";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const asyncDispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStorageChange = (event: any) => {
      const token = authService.getToken();
      if (!token) {
        setIsLoading(false);
        navigate("/login");
        toast.error("Login EXPIRED");
      }
    };
    // removeBodyLeftPadding();
    window.addEventListener("storage", handleStorageChange);

    const checkTokenAndRedirect = async () => {
      const validToken = authService.isThereValidToken();
      if (!validToken) {
        setIsLoading(false);
        return;
      }
      if (validToken) {
        setIsLoading(true);
        const user = await retryGetCurrentUser(5, 8000);
        if (user) {
          setIsLoading(false);
          dispatch(authenticate());
          navigate("/");
        } else {
          // setIsLoading(false);
          // Gérer le cas où aucune tentative n'a réussi
          toast.error("Échec de la récupération de l'utilisateur après 10 tentatives.");
        }
      }
    };

    checkTokenAndRedirect();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const retryGetCurrentUser = async (maxAttempts: number, delay: number) => {
    let user = null;

    for (let i = 0; i < maxAttempts; i++) {
      try {
        const result = await asyncDispatch(getCurrentUser());
        user = unwrapResult(result);
        if (user) {
          break;
        }
      } catch (error) {
        console.error(error);
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    return user;
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <ToastContainer />
        <Loader type="circle" color="#8e44ad" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      <Router />
    </>
  );
}

export default App;
