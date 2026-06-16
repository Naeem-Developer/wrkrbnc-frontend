"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff  } from "lucide-react";
import axios from "axios";
import { handleError, handleSuccess } from "@/frontend_utalties/notfication_control";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie"
import API_BASE_URL from '@/config/api';


export default function LoginPage() {
  const router = useRouter();
  const [Login, setLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ Email: "", Password: "" });
  const [isSubmitin, setIsSubmitin] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitin(true);
    try {
      const user = await axios.post(`${API_BASE_URL}/userLogin`, form, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      if (user.data.success) {
        handleSuccess("Login Successfully");
        Cookies.set("token", user.data.token);
        const role = user.data.role;
        const userId = user.data.id;
        if (role === 'client') {
          router.push(`/hireworker/${userId}`);
        } else if (role === 'worker') {
          router.push(`/user/${userId}`)
        }
      };

    } catch (error) {
      if (!form.Email || !form.Password) {
        handleError("Please fill in all fields.");
        return;
      } else {
        console.error('Login error:', error);
        handleError(error.response?.data?.message || "An error occurred during login. Please try again.");
      }

    }
  };




  return (
    <div className="flex justify-center items-center min-h-screen bg-bg px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="rounded-[16px] shadow-lg bg-surface border border-border p-8">
          <h2 className="text-[28px] font-[700] text-center text-primary mb-3 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-center text-secondary mb-8 text-[15px]">
            Login to continue to your account
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted" />
              <input
                type="email"
                name="Email"
                placeholder="Enter your email"
                value={form.Email}
                onChange={handleChange}
                className="w-full border border-border bg-surface-2 text-primary rounded-[10px] pl-10 py-3 text-[15px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted" />

              <input
                type={showPassword ? "text" : "password"}
                name="Password"
                placeholder="Enter your password"
                value={form.Password}
                onChange={handleChange}
                className="w-full border border-border bg-surface-2 text-primary rounded-[10px] pl-10 pr-12 py-3 text-[15px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                required
              />

              {/* Eye Icon Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-muted hover:text-secondary transition-colors"
              >
                {showPassword ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Links */}
            <div className="flex justify-between items-center text-[14px]">
              <Link href="/forgetpassword" className="text-secondary hover:text-primary transition-colors">
                Forgot Password?
              </Link>
              <Link href="/sign-up" className="text-accent hover:text-accent-dark font-[600] transition-colors">
                Create Account
              </Link>

            </div>

            {/* Submit Button */}
            <button
              disabled={isSubmitin}
              type="submit"
              className="w-full bg-accent text-primary py-3.5 rounded-[10px] text-[16px] font-[600] hover:bg-accent-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitin ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
