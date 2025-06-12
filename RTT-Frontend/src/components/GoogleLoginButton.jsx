// GoogleLoginButton.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse JWTs from query params after redirect
    const queryParams = new URLSearchParams(window.location.search);
    const accessJWT = queryParams.get("accessJWT");
    const refreshJWT = queryParams.get("refreshJWT");
    const error = queryParams.get("error");

    if (accessJWT && refreshJWT) {
      localStorage.setItem("accessJWT", accessJWT);
      localStorage.setItem("refreshJWT", refreshJWT);

      navigate("/dashboard");
    }

    if (error) {
      alert("Google Sign-in failed. Try again.");
    }
  }, []);

  const handleGoogleLogin = () => {
    // Redirect to backend's Google OAuth endpoint
    window.location.href = "http://localhost:5000/v1/user/auth/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg p-2 hover:bg-gray-100"
    >
      <img
        src="https://www.svgrepo.com/show/355037/google.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
