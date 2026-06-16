"use client"
import axios from 'axios'
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useState } from 'react'
import { handleError, handleSuccess } from '../frontend_utalties/notfication_control';
import { useRouter } from 'next/navigation';
import API_BASE_URL from '@/config/api';

const OTP_varificatoin = ({ email, role }) => {
  const [OTP, setOTP] = useState("")
  const router = useRouter();
  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  const handlevarify = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post(`${API_BASE_URL}/create-${role}/varify-OTP`, { Email: email, otp: OTP });
      if (res.data.success) {
        handleSuccess(res.data.message);
        setOTP("");
        router.push('/login');
      }


    } catch (error) {
      if (!OTP) {
        handleError("Please enter the OTP.");
      } else {
        handleError(error.response?.data?.message || "An error occurred. Please try again.");
        console.error('Error during OTP verification:', error.response?.data || error.message);
      }


    }
  }



  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-bg px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-surface rounded-[16px] shadow-lg border border-border p-8">
            {/* Heading */}
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-12 w-12 text-accent mb-3" />
              <h2 className="text-[28px] font-[700] text-primary text-center tracking-tight">
                Verify OTP
              </h2>
              <p className="text-secondary mt-2 text-center text-[15px]">
                Please enter the OTP sent to your email.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handlevarify} className="mt-6 space-y-5">
              <input
                value={OTP}
                onChange={handleChange}
                type="text"
                maxLength={6}
                placeholder="Enter OTP"
                className="w-full border border-border bg-surface-2 text-primary rounded-[10px] py-3 px-4 text-center text-lg tracking-widest focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
              />

              <button
                type="submit"
                className="w-full bg-accent text-primary font-[600] py-3.5 rounded-[10px] text-[16px] hover:bg-accent-dark transition-all mt-2"
              >
                Verify OTP
              </button>
            </form>

            {/* Resend Option */}
            <p className="text-center mt-6 text-[14px] text-secondary">
              Didn’t receive the code?{" "}
              <a
                href="#"
                className="text-accent font-[500] hover:text-accent-dark transition-colors"
              >
                Resend OTP
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default OTP_varificatoin
