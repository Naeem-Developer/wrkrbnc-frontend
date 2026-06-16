"use client"
import Client_signUp from "@/component/Client_signUp";
import Worker_signUp from "@/component/Worker_signUp";
import { motion } from "framer-motion";
import { Briefcase, User } from "lucide-react";
import { useState } from "react";




const Signup = () => {
  const [selectedRole, setSelectedRole] = useState(null)



  const handlerole = async (role) => {

    setSelectedRole(role);
  }

  if (selectedRole === 'worker') {
    return <Worker_signUp onBack={() => setSelectedRole("")} />
  }

  if (selectedRole === 'client') {
    return <Client_signUp onBack={() => setSelectedRole("")} />
  }



  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-bg px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="rounded-[16px] shadow-lg bg-surface border border-border p-8 text-center">
            {/* Heading */}
            <h2 className="text-[28px] sm:text-[32px] font-[700] mb-2 text-primary tracking-tight">
              Join as a
            </h2>
            <p className="text-secondary font-[500] mb-8 text-[15px]">
              Choose your role to continue
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Worker Option */}
              <button
                onClick={() => handlerole("worker")}
                className="group border border-border rounded-[12px] p-6 bg-surface-2 hover:bg-surface hover:border-accent hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center cursor-pointer"
              >
                <Briefcase className="h-10 w-10 text-primary group-hover:text-accent mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-[16px] font-[600] text-primary group-hover:text-accent transition-colors">
                  Worker
                </h3>
                <p className="text-[13px] text-secondary mt-1">
                  Find your next job
                </p>
              </button>

              {/* Client Option */}
              <button
                onClick={() => handlerole("client")}
                className="group border border-border rounded-[12px] p-6 bg-surface-2 hover:bg-surface hover:border-accent hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center cursor-pointer"
              >
                <User className="h-10 w-10 text-primary group-hover:text-accent mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-[16px] font-[600] text-primary group-hover:text-accent transition-colors">
                  Client
                </h3>
                <p className="text-[13px] text-secondary mt-1">
                  Hire professionals
                </p>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

    </>
  )
}

export default Signup

