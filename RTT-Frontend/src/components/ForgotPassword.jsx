import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";

const API_URL = "http://localhost:5000/v1/user/reset-password";

function ForgotPassword() {
  const [step, setStep] = useState(1); // 1 = request pin, 2 = reset password
  const [emailForReset, setEmailForReset] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 },
  } = useForm();

  const onRequestPin = async ({ email }) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (result.status === "success") {
        setEmailForReset(email);
        setStep(2);
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Request Pin Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const onResetPassword = async (data) => {
    try {
      const res = await fetch(API_URL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, email: emailForReset }),
      });
      const result = await res.json();
      if (result.status === "success") {
        alert("Password updated successfully!");
        setStep(1);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {step === 1 ? "Request Password Reset" : "Reset Your Password"}
        </h2>

        {step === 1 ? (
          <form onSubmit={handleSubmit(onRequestPin)} className="space-y-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              error={errors.email && errors.email.message}
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Send Reset Pin
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmitStep2(onResetPassword)} className="space-y-4">
            <Input
              label="Pin"
              placeholder="Enter the 6-digit pin"
              {...registerStep2("pin", {
                required: "Pin is required",
                minLength: { value: 6, message: "Pin must be 6 digits" },
                maxLength: { value: 6, message: "Pin must be 6 digits" },
              })}
              error={errorsStep2.pin && errorsStep2.pin.message}
            />

            <Input
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              {...registerStep2("newPassword", {
                required: "New password is required",
                minLength: { value: 6, message: "Min 6 characters required" },
              })}
              error={errorsStep2.newPassword && errorsStep2.newPassword.message}
            />

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Reset Password
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
