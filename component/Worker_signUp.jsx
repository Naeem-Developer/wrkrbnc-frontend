'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { motion } from "framer-motion";
import { User, Mail, Lock, MapPin, Briefcase, Eye, EyeOff } from "lucide-react";
import OTP_varificatoin from './OTP_varificatoin'
import API_BASE_URL from '@/config/api';
import { handleSuccess } from '@/frontend_utalties/notfication_control'


const Worker_signUp = ({ onBack }) => {
  const [files, setFiles] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [email, setEmail] = useState("")
  const [role, setrole] = useState("")
  const [formdata, setFormdata] = useState({

    First_Name: '',
    Last_Name: '',
    Email: '',
    City: '',
    Address: '',
    Profession: '',
    Password: ''

  });


  // List of districts in Punjab

  const punjabDistricts = [
    "Attock",
    "Bahawalnagar",
    "Bahawalpur",
    "Bhakkar",
    "Chakwal",
    "Chiniot",
    "Dera Ghazi Khan",
    "Faisalabad",
    "Gujranwala",
    "Gujrat",
    "Hafizabad",
    "Jhang",
    "Jhelum",
    "Kasur",
    "Khanewal",
    "Khushab",
    "Kot Addu",
    "Lahore",
    "Layyah",
    "Lodhran",
    "Mandi Bahauddin",
    "Mianwali",
    "Multan",
    "Murree",
    "Muzaffargarh",
    "Narowal",
    "Nankana Sahib",
    "Okara",
    "Pakpattan",
    "Rahim Yar Khan",
    "Rajanpur",
    "Rawalpindi",
    "Sahiwal",
    "Sargodha",
    "Sheikhupura",
    "Sialkot",
    "Toba Tek Singh",
    "Vehari",
    "Wazirabad",
    "Talagang",
    "Taunsa"
  ];
  // List of professions
  const profession = [
    "AC Repairing",
    "Plumbing",
    "Labour",
    "Gardenar",
    "Electrician",
    "Cleaner",
    "Carpenter"

  ]


  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  };

  const handlesubmit = async (e) => {
    setIsSubmiting(true);
    e.preventDefault();
    try {

      const form = new FormData();

      Object.keys(formdata).forEach(key => {
        form.append(key, formdata[key]);
      });

      if (files) {
        form.append('profile_photo', files);
      }

      const response = await axios.post(`${API_BASE_URL}/sign-up/worker`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log('Form data submitted:', formdata)
      if (response.data.success) {
        alert('Signup successful');
        setFormdata({
          First_Name: '',
          Last_Name: '',
          Email: '',
          City: '',
          Address: '',
          Profession: '',
          Password: ''


        });
        setFiles(null)
        setEmail(formdata.Email);
        setrole("worker");


      }

      setIsSubmiting(true);
      handleSuccess("Signup successful, proceed to OTP verification");

    }
    catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please try again.');
    }





  }

  if (isSubmiting) {
    return <OTP_varificatoin email={email} role={role} />
  }
  return (
    <>

      <div className="flex justify-center p-10 items-center min-h-screen bg-bg px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <div className="rounded-[16px] shadow-lg bg-surface border border-border p-8">
          {/* Heading */}
          <h1 className="text-primary font-[700] text-center text-[28px] sm:text-[32px] mb-8 tracking-tight">
            SignUp As Professional
          </h1>

          {/* Form */}
          <form onSubmit={handlesubmit} className="space-y-5">
            {/* First & Last Name */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-muted" />
                <input
                  required
                  value={formdata.First_Name}
                  type="text"
                  onChange={handleChange}
                  name="First_Name"
                  placeholder="First Name"
                  className="w-full border border-border bg-surface-2 text-primary rounded-[10px] pl-10 py-3 text-[15px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <div className="relative w-full">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-muted" />
                <input
                  required
                  value={formdata.Last_Name}
                  type="text"
                  onChange={handleChange}
                  name="Last_Name"
                  placeholder="Last Name"
                  className="w-full border border-border bg-surface-2 text-primary rounded-[10px] pl-10 py-3 text-[15px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted" />
              <input
                required
                value={formdata.Email}
                type="email"
                onChange={handleChange}
                name="Email"
                placeholder="Enter Your Email"
                className="w-full border border-border bg-surface-2 text-primary rounded-[10px] pl-10 py-3 text-[15px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>

            {/* City */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-muted" />
              <select
                required
                onChange={handleChange}
                value={formdata.City}
                name="City"
                className="w-full border border-border bg-surface-2 text-primary rounded-[10px] pl-10 py-3 text-[15px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors appearance-none"
              >
                <option className="text-muted" value="">
                  Select your City
                </option>
                {punjabDistricts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-muted" />
              <input
                required
                value={formdata.Address}
                type="text"
                onChange={handleChange}
                name="Address"
                placeholder="Enter Your Address"
                className="w-full border border-border bg-surface-2 text-primary rounded-[10px] pl-10 py-3 text-[15px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>

            {/* Profession */}
            <div className="relative">
              <Briefcase className="absolute left-3 top-3.5 h-5 w-5 text-muted" />
              <select
                required
                onChange={handleChange}
                value={formdata.Profession}
                name="Profession"
                className="w-full border border-border bg-surface-2 text-primary rounded-[10px] pl-10 py-3 text-[15px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors appearance-none"
              >
                <option className="text-muted" value="">
                  Select your Profession
                </option>
                {profession.map((prof, index) => (
                  <option key={index} value={prof}>
                    {prof}
                  </option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted" />
               <input
                                    type={showPassword ? "text" : "password"}
                                    name="Password"
                                    placeholder="Enter your password"
                                    value={formdata.Password}
                                    onChange={handleChange}
                                    className="w-full border border-border bg-surface-2 text-primary rounded-[10px] pl-10 pr-12 py-3 text-[15px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                                    required
                                />
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

            {/* Profile Picture */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
              <input
                onChange={(e) => setFiles(e.target.files[0])}
                className="border border-border bg-surface-2 text-primary rounded-[10px] p-2 cursor-pointer w-full sm:w-fit file:mr-4 file:py-2 file:px-4 file:rounded-[20px] file:border-0 file:text-[13px] file:font-[600] file:bg-accent file:text-primary hover:file:bg-accent-dark file:cursor-pointer file:transition-colors"
                type="file"
                name="profile_photo"
              />
              <Image
                className="rounded-full object-cover w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] border border-border"
                src={files ? URL.createObjectURL(files) : "/user.png"}
                alt="Profile"
                width={100}
                height={100}
              />
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start gap-2 mt-2">
              <input required type="checkbox" id="Link-checkbox" className="accent-accent mt-1" />
              <label htmlFor="Link-checkbox" className="text-[14px] text-secondary">
                I agree to the WrkrBnC{" "}
                <a
                  className="text-accent hover:text-accent-dark font-[500] transition-colors"
                  href="/user-agrement"
                >
                  User Agreement
                </a>{" "}
                and{" "}
                <a
                  className="text-accent hover:text-accent-dark font-[500] transition-colors"
                  href="/privacypolicy"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmiting}
              className="w-full bg-accent text-primary py-3.5 rounded-[10px] text-[16px] font-[600] hover:bg-accent-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              Sign Up
            </button>
          </form>

          {/* Already have account */}
          <div className="flex justify-between items-center mt-6 text-[14px]">
            <p className="text-secondary">
              Already have an account?{" "}
              <a
                className="text-primary hover:underline font-[500]"
                href="/login"
              >
                Login
              </a>
            </p>

            {/* Back Button */}
            <button
              onClick={onBack}
              className="font-[600] text-accent hover:text-accent-dark transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>









    </>
  )
}

export default Worker_signUp
