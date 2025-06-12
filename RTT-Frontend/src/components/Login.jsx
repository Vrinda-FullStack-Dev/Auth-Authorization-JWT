import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./ui/Input"; // Custom Input component
import Button from "./ui/Button"; // Custom Button component
import GoogleLoginButton from "./GoogleLoginButton";

const API_URL = "http://localhost:5000/v1/user/login"; // Your updated backend route

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    if (!data.email || !data.password) {
      alert("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (result.status === "success") {
        console.log("Login successful:", result);

        if (result.accessJWT && result.refreshJWT) {
          localStorage.setItem("accessToken", result.accessJWT);
          localStorage.setItem("refreshToken", result.refreshJWT);

          alert(result.message || "Login successful!");
          window.location.href = "/dashboard"; // Or wherever your app should redirect
        } else {
          alert("Login successful but missing tokens.");
        }
      } else {
        throw new Error(result.message || "Login failed. Try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-200">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", { required: "Email is required" })}
            error={errors.email && errors.email.message}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register("password", { required: "Password is required" })}
            error={errors.password && errors.password.message}
          />
          <Button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
{/* 
        //Sign in with google */}
        <GoogleLoginButton />
        <div className="mt-4 text-center">
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
          <p className="mt-2 text-sm text-center">
              Forgot your password?{" "}
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Reset here
            </Link>
          </p>

          
        </div>
      </div>
    </div>
  );
}

export default Login;
