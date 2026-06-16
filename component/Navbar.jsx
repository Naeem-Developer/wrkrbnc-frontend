'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  return (
    <>
      <nav className="bg-surface h-[72px] border-b border-border sticky top-0 z-20 px-6 flex justify-between items-center w-full shadow-sm">
      {/* Logo */}
      <div className="cursor-pointer">
        <Link href="/">
          <span className="font-bold text-[22px] text-primary tracking-tight">WrkrBnC.</span>
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center">
        <Link
          href="/#services"
          className="text-[14px] text-secondary hover:text-primary font-medium transition-colors"
        >
          Services
        </Link>
        <Link
          href="/#howitworks"
          className="text-[14px] text-secondary hover:text-primary font-medium transition-colors"
        >
          How It Works
        </Link>
        <Link href="/login">
          <button className="bg-accent text-primary px-[24px] py-[10px] rounded-lg font-semibold hover:bg-accent-dark transition-all">
            Login
          </button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-primary focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-surface shadow-md flex flex-col items-center gap-4 py-6 md:hidden border-b border-border">
          <Link
            href="/#services"
            className="text-[14px] text-secondary hover:text-primary font-medium"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/#howitworks"
            className="text-[14px] text-secondary hover:text-primary font-medium"
            onClick={() => setIsOpen(false)}
          >
            How It Works
          </Link>
          <Link href="/login" onClick={() => setIsOpen(false)}>
            <button className="bg-accent text-primary px-[24px] py-[10px] rounded-lg font-semibold hover:bg-accent-dark transition-all">
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
    </>
  )
}

export default Navbar
