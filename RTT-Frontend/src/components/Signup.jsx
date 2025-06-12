import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";

const API_URL = "http://localhost:5000/v1/user/signup"; // Update if your route differs

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);

    const { name, email, password, company, address } = data;

    if (!name || !email || !password || !company || !address) {
      alert("All fields are required");
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
          name,
          email,
          password,
          company,
          address,
          role: "user", // Optional - backend defaults to "user"
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        throw new Error(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <h2 className="text-center text-2xl font-bold leading-tight">Create an Account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
            Sign In
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <Input
            label="Name:"
            placeholder="Enter your full name"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}

          <Input
            label="Email:"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}

          <Input
            label="Password:"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])/,
                message: "Password must include a letter, number, and special character",
              },
            })}
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}

          <Input
            label="Company:"
            placeholder="Enter your company name"
            type="text"
            {...register("company", { required: "Company name is required" })}
          />
          {errors.company && <span className="text-red-500">{errors.company.message}</span>}

          <Input
            label="Address:"
            placeholder="Enter your address"
            type="text"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && <span className="text-red-500">{errors.address.message}</span>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
