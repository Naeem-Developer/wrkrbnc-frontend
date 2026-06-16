"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Plus, Trash2, User, MapPin, Briefcase, ImageIcon, Settings, LogOut, Menu, X } from "lucide-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Footer from "@/component/Footer";
import { handleError, handleSuccess } from "@/frontend_utalties/notfication_control";
import Setting from "@/component/Setting";
import Services from "@/component/Services";
import DashboardSkeleton from "@/component/loader";
import Cookies from "js-cookie";
import WrkrBnCLoader from "@/component/loader";
import API_BASE_URL from '@/config/api';

export default function WorkerDashboard() {
  const router = useRouter();
  const { slug } = useParams();
  const [section, setSection] = useState("profile");
  const [newService, setNewService] = useState({ title: "", price: "" });
  const [isuser, setIsuser] = useState(false)
  const [worker, setWorker] = useState({});
  const [newPortfolio, setNewPortfolio] = useState({ title: "", image: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [error, setError] = useState(null);

  //  load user data
  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const UserInfo = await axios.get(`${API_BASE_URL}/getUserDetails/${slug}`)
        if (UserInfo.data.success) {
          setWorker(UserInfo.data.data)
          setIsuser(true);
        } else {
          setError("Worker profile not found.");
        }
      } catch (err) {
        console.error("error fetching worker data", err);
        setError("Unable to load worker dashboard details.");
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) fetchData();
  }, [slug])

  // Close mobile menu when section changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [section]);

  //  add service function
  const addService = async (e) => {
    e.preventDefault();
    if (!newService.title || !newService.price) {
      alert("Please provide both title and price");
      return;
    }
    try {
      const resp = await axios.post(`${API_BASE_URL}/addService/${slug}`, newService);
      if (resp.data.success) {
        setWorker(resp.data.data);
        setNewService({ title: "", price: "" });
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  }

  // add portfolio function
  const addportfolio = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", newPortfolio.title);
    data.append("image", newPortfolio.image);

    if (!newPortfolio.title || !newPortfolio.image) {
      return handleError("Both title and Image are required")
    }

    try {
      const resp = await axios.post(`${API_BASE_URL}/addportfolio/${slug}`, data)
      if (resp.data.success) {
        setWorker(resp.data.data);
        setNewPortfolio({ title: "", image: "" })
      }

      if (!resp.data.success) {
        return handleError(resp.data.message)
      }
    } catch (error) {
      console.error("Error adding portfolio item:", error);
      handleError("Server error please try again")
    }
  };

  // delete service function
  const deleteService = async (index) => {
    const confirm = window.confirm("Are you sure you want to delete this service?");
    if (!confirm) return;
    try {
      const resp = await axios.delete(`${API_BASE_URL}/deleteService/${slug}/${worker.services[index]._id}`);
      if (resp.data.success) {
        setWorker({ ...worker, services: resp.data.data })
        handleSuccess(resp.data.message)
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      handleError("Server error please try again")
    }
  }

  // delete portfolio function
  const deletePortfolio = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this portfolio?");
    if (!confirm) return;
    try {
      const resp = await axios.delete(`${API_BASE_URL}/deletePortfolio/${slug}/${id}`);
      if (resp.data.success) {
        setWorker({ ...worker, portfolio: resp.data.data })
        handleSuccess(resp.data.message)
      }
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      handleError("Server error please try again")
    }
  }

  const logout = async () => {
    try {
      const resp = await axios.get(`${API_BASE_URL}/logout`, {
        withCredentials: true
      });
      if (resp.data.success) {
        handleSuccess("logged out successfully")
        Cookies.remove("token");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Logout error:", error);
      handleError("Server error please try again")
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "portfolio", label: "Portfolio", icon: ImageIcon },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (isLoading) {
    return <WrkrBnCLoader />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="bg-surface rounded-[16px] border border-border p-8 text-center max-w-md">
          <p className="text-primary text-[18px] font-[600] mb-4">Dashboard Error</p>
          <p className="text-secondary text-[15px] mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-accent text-primary px-6 py-3 rounded-[10px] font-[600] hover:bg-accent-dark transition-colors">Reload Page</button>
        </div>
      </div>
    );
  }

  if (!isuser) return null;

  return (
    <>
      {isuser ? (
        <>
          <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden bg-primary text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-sm border-b border-white/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="text-[18px] font-[600] text-accent">Worker Panel</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-accent">
                    <Image
                      src={worker.Profile_Pic || "/default-avatar.png"}
                      alt="Profile"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                </div>
              </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
              <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={toggleMobileMenu} />
            )}

            {/* Mobile Sidebar */}
            <aside className={`
              ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
              md:translate-x-0 transition-transform duration-300 ease-in-out
              fixed md:relative inset-y-0 left-0 z-40
              w-[260px] bg-primary text-white/70 shadow-xl flex flex-col md:flex border-r border-white/10
            `}>
              <div className="hidden md:block text-[22px] font-[700] text-accent p-6 border-b border-white/10">
                Worker Panel
              </div>
              <nav className="flex-1 px-4 space-y-3 py-6 md:py-6">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSection(item.id)}
                    className={`
                      flex items-center gap-3 w-full px-4 py-3 rounded-[8px] font-[500] transition-colors
                      ${section === item.id
                        ? "bg-accent text-primary"
                        : "hover:bg-primary-mid hover:text-white"
                      }
                    `}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
              <div className="p-4 border-t border-white/10 mt-auto">
                <button
                  onClick={logout}
                  className="flex items-center gap-3 w-full text-[#ef4444] hover:text-[#dc2626] transition-colors px-4 py-3 rounded-[8px] hover:bg-[#ef4444]/10 font-[500]"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-6 space-y-6 bg-bg">
              {/* Profile Section */}
              {section === "profile" && (
                <div className="bg-surface border border-border rounded-[16px] p-6 md:p-8">
                  <h2 className="text-[20px] font-[700] text-primary mb-6 flex items-center gap-3 border-b border-border pb-4">Profile</h2>
                  <div className="flex flex-col items-center md:items-start md:flex-row gap-8">
                    <div className="relative w-32 h-32 md:w-32 md:h-32 rounded-full overflow-hidden border border-border">
                      <Image
                        src={worker.Profile_Pic || "/default-avatar.png"}
                        alt="Profile"
                        fill
                        sizes="128px"
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left space-y-2">
                      <p className="text-[24px] font-[600] text-primary">{worker.First_Name}.{worker.Last_Name?.charAt(0) || ''}</p>
                      <p className="text-[16px] font-[500] text-accent">{worker.Profession}</p>
                      <p className="text-secondary flex items-center justify-center md:justify-start gap-2 text-[14px]">
                        <MapPin size={16} className="text-accent" />
                        {worker.City}
                      </p>
                      <p className="text-success font-[500] text-[14px] bg-success/10 w-fit px-3 py-1 rounded-[20px] mx-auto md:mx-0 mt-2">Available</p>
                      <p className="text-secondary mt-4 text-[15px] max-w-2xl">{worker.Description || "No description provided"}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Services Section */}
              {section === "services" && (
                <div className="bg-surface border border-border rounded-[16px] p-6 md:p-8">
                  <h2 className="text-[20px] font-[700] text-primary mb-6 flex items-center gap-3 border-b border-border pb-4">Manage Services</h2>
                  <form onSubmit={addService} className="flex flex-col sm:flex-row gap-3 mt-4">
                    <input
                      type="text"
                      placeholder="Service Title"
                      value={newService.title}
                      onChange={(e) =>
                        setNewService({ ...newService, title: e.target.value })
                      }
                      className="border border-border bg-surface-2 text-primary placeholder-muted rounded-[8px] px-4 py-3 flex-1 w-full sm:w-auto outline-none focus:border-accent transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Price"
                      value={newService.price}
                      onChange={(e) =>
                        setNewService({ ...newService, price: e.target.value })
                      }
                      className="border border-border bg-surface-2 text-primary placeholder-muted rounded-[8px] px-4 py-3 w-full sm:w-32 outline-none focus:border-accent transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-accent hover:bg-accent-dark text-primary px-6 py-3 rounded-[8px] font-[600] flex items-center justify-center gap-2 transition-colors"
                    >
                      <Plus size={18} />
                      <span>Add</span>
                    </button>
                  </form>
                  <div className="mt-8 space-y-3">
                    {worker?.services?.length > 0 ? (
                      worker.services.map((service, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center bg-surface-2 border border-border px-5 py-4 rounded-[12px] hover:border-accent transition-colors"
                        >
                          <span className="text-[15px] font-[500] text-primary flex items-center gap-2 flex-wrap">
                            {service.title} <span className="text-muted hidden sm:inline">•</span>
                            <span className="text-accent font-[700] bg-accent-light px-2 py-1 rounded-[6px] text-[13px]">
                              Rs.{service.price}
                            </span>
                          </span>
                          <button
                            onClick={() => deleteService(idx)}
                            className="text-[#ef4444] hover:text-[#dc2626] p-2 hover:bg-[#ef4444]/10 rounded-[8px] transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10 text-muted bg-surface-2 border border-border rounded-[12px]">
                        <p className="text-[16px] font-[500]">No services available</p>
                        <p className="text-[14px] mt-1">Add your first service above</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Portfolio Section */}
              {section === "portfolio" && (
                <div className="bg-surface border border-border rounded-[16px] p-6 md:p-8">
                  <h2 className="text-[20px] font-[700] text-primary mb-6 flex items-center gap-3 border-b border-border pb-4">Manage Portfolio</h2>
                  <form
                    onSubmit={addportfolio}
                    className="flex flex-col md:flex-row gap-3 mt-4"
                  >
                    {/* Title Input */}
                    <input
                      required={true}
                      type="text"
                      placeholder="Job Title"
                      value={newPortfolio.title}
                      onChange={(e) =>
                        setNewPortfolio({ ...newPortfolio, title: e.target.value })
                      }
                      className="border border-border bg-surface-2 text-primary placeholder-muted rounded-[8px] w-full px-4 py-3 text-[15px] h-12 md:h-14 md:flex-1 outline-none focus:border-accent transition-colors"
                    />

                    {/* File Upload */}
                    <input
                      required
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) =>
                        setNewPortfolio({ ...newPortfolio, image: e.target.files[0] })
                      }
                      className="border border-border bg-surface-2 text-primary rounded-[8px] w-full px-4 py-2 text-[15px] h-12 md:h-14 md:flex-1 file:mr-4 file:py-2 file:px-4 file:rounded-[20px] file:border-0 file:text-[13px] file:font-[600] file:bg-accent file:text-primary hover:file:bg-accent-dark file:cursor-pointer file:transition-colors"
                    />

                    {/* Add Button */}
                    <button
                      type="submit"
                      className="bg-accent hover:bg-accent-dark text-primary rounded-[8px] px-6 py-3 h-12 md:h-14 font-[600] flex items-center justify-center gap-2 transition-colors"
                    >
                      <Plus size={18} />
                      <span>Add</span>
                    </button>
                  </form>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
                    {worker?.portfolio && worker.portfolio.length > 0 ? (
                      worker.portfolio.map((job, index) => (
                        <div
                          key={index}
                          className="rounded-[12px] overflow-hidden border border-border bg-surface relative group hover:border-accent transition-colors"
                        >
                          <div className="relative w-full h-48">
                            <Image
                              src={job.image || "/placeholder-image.jpg"}
                              alt={job.title || "Portfolio item"}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-4 border-t border-border">
                            <h3 className="font-[600] text-primary truncate text-[16px]">{job.title}</h3>
                            <button
                              onClick={() => deletePortfolio(job._id)}
                              className="absolute top-3 right-3 bg-surface/90 text-[#ef4444] rounded-[8px] p-2 hover:bg-[#ef4444] hover:text-white transition-colors border border-border shadow-sm"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12 bg-surface-2 border border-border rounded-[12px]">
                        <div className="text-muted mb-4">
                          <ImageIcon size={48} className="mx-auto" />
                        </div>
                        <p className="text-primary font-[500] text-[16px]">No portfolio added yet</p>
                        <p className="text-secondary text-[14px] mt-2">Add your work samples above</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Settings Section */}
              {section === "settings" && (
                <div className="bg-surface border border-border rounded-[16px] p-6 md:p-8">
                  <Setting id={slug} />
                </div>
              )}
            </main>
          </div>
          <Footer />
        </>
      ) : (
        <DashboardSkeleton />
      )}
    </>
  );
}