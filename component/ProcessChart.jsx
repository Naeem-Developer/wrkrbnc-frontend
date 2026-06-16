"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const ProcessChart = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Browse Services",
      description: "Explore local services like electricians, plumbers, and cleaners.",
      number: "1"
    },
    {
      title: "Select & Book",
      description: "Check profiles, choose the right worker, and book instantly.",
      number: "2"
    },
    {
      title: "Service Done",
      description: "Worker arrives, finishes job, and you rate the service.",
      number: "3"
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
    }, 3000);
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <div className="bg-surface py-[80px]">
      <div className="max-w-[1200px] mx-auto px-[24px]">
        <h2 className="text-[36px] font-[700] text-center mb-16 text-primary">
          How We <span className="text-accent">Work</span> 
        </h2>

        {/* Horizontal Steps Row */}
        <div className="relative w-full flex justify-between items-start gap-4">
          {/* Connector line */}
          <div className="absolute top-[22px] left-[15%] right-[15%] h-[2px] bg-border border-t-[2px] border-dashed border-border z-0"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center relative z-10 w-1/3 transition-all duration-500 ${
                index <= activeStep ? "opacity-100 scale-105" : "opacity-70"
              }`}
            >
              <div
                className={`flex items-center justify-center rounded-full mb-4 w-[44px] h-[44px] text-[20px] font-[700] transition-colors duration-300 ${
                  index <= activeStep
                    ? "bg-primary text-accent shadow-lg"
                    : "bg-surface-2 text-muted border border-border"
                }`}
              >
                {step.number}
              </div>
              <h3 className="text-[18px] font-[600] text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-[14px] text-secondary max-w-[260px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Active Step Button */}
        <div className="flex justify-center mt-12">
         <Link href="/login">
          <button className="bg-accent text-primary px-[24px] py-[12px] rounded-lg font-[600] text-[16px] transition hover:bg-accent-dark">
            {steps[activeStep].title}
          </button>
         </Link>
        </div>
      </div>
    </div>
  );
};

export default ProcessChart;
