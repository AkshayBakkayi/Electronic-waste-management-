import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Processing...");
    try {
      // Replace the URL with your actual API endpoint
      const response = await axios.post(
        "http://localhost:7000/singup/forgot-password",
        { email }
      );
      toast.dismiss();
      toast.success("New Password sent to your email!");
      setEmail(""); // Clear the email field
    } catch (error) {
      toast.dismiss();
      toast.error("Error sending password . Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <ToastContainer
        className="text-2xl"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="relative flex flex-col m-6 p-8 bg-white shadow-2xl rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-md font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-2 rounded-lg hover:bg-emerald-400 hover:text-black"
          >
            {loading ? "Sending..." : "Send "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
