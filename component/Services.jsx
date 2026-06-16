import Link from "next/link";
import React from "react";

const Services = ({ title, pic, dis }) => {
  return (
    <div className="group relative flex flex-col bg-surface rounded-[12px] border border-border p-[20px] transition-all duration-200 ease-in hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(15,31,61,0.12)] hover:border-accent">
      {/* Icon Area */}
      <div className="mb-4">
        <div className="w-[48px] h-[48px] bg-accent-light rounded-full flex items-center justify-center p-2">
          <img
            src={pic}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Title & Count Label */}
      <div className="mb-2">
        <h3 className="text-[16px] font-[600] text-primary group-hover:text-accent-dark transition-colors">
          {title}
        </h3>
        <span className="text-[13px] text-muted block mt-1">24 workers</span>
      </div>

      {/* Description */}
      <p className="mt-2 text-secondary text-[14px] leading-relaxed line-clamp-3">
        {dis}
      </p>

      {/* Invisible link overlay for entire card */}
      <Link href={`/login`} className="absolute inset-0 z-10" aria-label={`Hire ${title}`} />
    </div>
  );
};

export default Services;
