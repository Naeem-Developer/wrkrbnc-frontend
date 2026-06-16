"use client";
import { useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { handleError } from "@/frontend_utalties/notfication_control";
import axios from "axios";
import Link from "next/link";
import API_BASE_URL from "@/config/api";

const Client_Navbar = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
   
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) return;

        const decoded = jwtDecode(token);
        const id = decoded.id;

        const rsp = await axios.get(`${API_BASE_URL}/getClientDetails/${id}`);

        if (rsp.data.success) {
          setUser(rsp.data.data);
        }
      } catch (error) {
        console.error("Profile load failed or user not logged in");
      }
    };

    fetchUser();
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/hireworker/${user._id}?query=${encodeURIComponent(search)}`);
    setIsMobileMenuOpen(false);
  };

  const handleClick = (profession) => {
    router.push(`/hireworker/${user._id}?query=${encodeURIComponent(profession)}`);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <nav className="w-full shadow-md border-b border-border">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface h-[72px] sm:px-6">
        {/* Logo */}
        <div className="text-[22px] font-bold text-primary tracking-tight cursor-pointer">WrkrBnC.</div>

        {/* Search Bar - Hidden on mobile, visible on medium screens and up */}
        <form 
          className="hidden md:flex items-center w-full max-w-md mx-4" 
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for services..."
            className="w-full border border-border bg-surface-2 text-primary rounded-l-full py-2 px-4 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-light text-sm sm:text-base"
          />
          <button 
            type="submit" 
            className="bg-accent hover:bg-accent-dark text-primary font-medium px-4 rounded-r-full py-3 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* Mobile Search Button */}
        <button 
          className="md:hidden relative bg-accent hover:bg-accent-dark text-primary p-2 rounded-full ml-auto transition-colors"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Profile Section - Hidden on small screens, visible on medium and up */}
       <Link href={`/users/${user._id}`} ><div className="hidden md:flex items-center gap-3">
          <Image
            src="/user.png"
            alt="Profile"
            width={40}
            height={40}
            sizes="40px"
            className="rounded-full border border-border"
          />
          <span className="font-medium text-primary">{user.Name || "User"}</span>
        </div></Link>
      </div>

      {/* Mobile Search Bar - Only visible when menu is open */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface-2 px-4 py-3 border-t border-border">
          <form className="flex items-center w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for services..."
              className="w-full border border-border bg-surface text-primary rounded-l-full py-2 px-4 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-light text-sm"
            />
            <button 
              type="submit" 
              className="bg-accent hover:bg-accent-dark text-primary px-4 rounded-r-full py-2 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Sub Navbar */}
      <div className="bg-surface px-4 py-2 hidden md:flex flex-wrap items-center justify-center gap-4 lg:gap-6 text-[14px] font-medium border-t border-border">
        {[
          "AC Repairing",
          "Plumbing",
          "Labour",
          "Gardener",
          "Electrician",
          "Cleaner",
          "Carpenter",
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(item)}
            className="text-secondary hover:text-primary cursor-pointer transition-colors whitespace-nowrap"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Mobile Sub Navbar - Only visible when menu is open */}
      {isMobileMenuOpen && (
        <div className="text-primary bg-surface px-4 py-3 md:hidden">
          <div className="grid grid-cols-2 gap-2">
            {[
              "AC Repairing",
              "Plumbing",
              "Labour",
              "Gardener",
              "Electrician",
              "Cleaner",
              "Carpenter",
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleClick(item)}
                className="text-secondary hover:text-primary hover:bg-surface-2 cursor-pointer transition-colors text-[14px] py-2 text-center bg-surface border border-border rounded-lg"
              >
                {item}
              </button>
            ))}
          </div>
          
          {/* Mobile Profile Section */}
         <Link href={`/users/${user._id}`} ><div className="flex items-center cursor-pointer gap-3 mt-4 pt-4 border-t border-border">
            <Image
              src="/upscaled_4k.png"
              alt="Profile"
              width={36}
              height={36}
              sizes="36px"
              className="rounded-full border border-border"
            />
            <span className="font-medium text-primary">{user.Name || "User"}</span>
          </div></Link> 
        </div>
      )}
    </nav>
  );
};

export default Client_Navbar;