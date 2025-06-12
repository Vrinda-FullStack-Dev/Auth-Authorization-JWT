import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessJWT = queryParams.get("accessJWT");
    const refreshJWT = queryParams.get("refreshJWT");
    const error = queryParams.get("error");

    if (accessJWT && refreshJWT) {
      localStorage.setItem("accessJWT", accessJWT);
      localStorage.setItem("refreshJWT", refreshJWT);
      window.location.href = "/dashboard"
      //navigate("/dashboard");
    } else if (error) {
      alert("Google Sign-in failed. Try again.");
      navigate("/login");
    }
  }, []);

  return <p>Signing you in...</p>;
};

export default GoogleRedirectHandler;
