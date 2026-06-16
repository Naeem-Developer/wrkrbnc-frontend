"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  User,
  MapPin,
  Heart,
  Briefcase,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Footer from "@/component/Footer";
import { handleError, handleSuccess } from "@/frontend_utalties/notfication_control";
import WrkrBnCLoader from "@/component/loader";
import Setting from "@/component/Setting";
import Cookies from "js-cookie";
import API_BASE_URL from '@/config/api';

export default function ClientDashboard() {
  const router = useRouter();
  const { slug } = useParams();
  const [section, setSection] = useState("profile");
  const [client, setClient] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      setError(null);
      try {
        const res = await axios.get(`${API_BASE_URL}/getClientDetails/${slug}`);
        if (res.data.success) {
          setClient(res.data.data);
        } else {
          setError("Client details not found.");
        }
      } catch (err) {
        setError("Unable to load client details");
        console.error("error fetching client:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchClient();
  }, [slug]);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      const resp = await axios.get(`${API_BASE_URL}/logout`);
      if (resp.data.success) {
        handleSuccess("Logged out successfully");
        Cookies.remove("token");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (error) {
      console.log("Backend logout unavailable, doing client-side cleanup");
    handleSuccess("Logged out successfully");
    Cookies.remove("token");
    localStorage.clear(); // Add this to clear localStorage
    sessionStorage.clear(); // Add this to clear sessionStorage
     Cookies.remove("token");
    setTimeout(() => router.push("/login"), 1500);
    }
  };

  

  if (isLoading) return <WrkrBnCLoader />;

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

  return (
    <>
      <div className="min-h-screen bg-bg flex flex-col md:flex-row">
        {/* Mobile Top Navbar */}
        <div className="md:hidden bg-primary text-white flex items-center justify-between px-5 py-4">
          <h1 className="text-[18px] text-accent font-[600]">Client Panel</h1>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={26} />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary-dark text-white/70 px-4 py-3 space-y-2 animate-slideDown">
            <button onClick={() => { setSection("profile"); setIsMenuOpen(false); }} className="flex w-full items-center gap-2 py-2 hover:text-white transition-colors">
              <User size={18} /> Profile
            </button>
            <button onClick={() => { setSection("bookings"); setIsMenuOpen(false); }} className="flex w-full items-center gap-2 py-2 hover:text-white transition-colors">
              <Briefcase size={18} /> Bookings
            </button>
            <button onClick={() => { setSection("favorites"); setIsMenuOpen(false); }} className="flex w-full items-center gap-2 py-2 hover:text-white transition-colors">
              <Heart size={18} /> Favorites
            </button>
            <button onClick={() => { setSection("settings"); setIsMenuOpen(false); }} className="flex w-full items-center gap-2 py-2 hover:text-white transition-colors">
              <Settings size={18} /> Settings
            </button>
            <button onClick={handleLogout} className="flex w-full items-center gap-2 py-2 text-[#ef4444] hover:text-[#dc2626] transition-colors">
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-[260px] bg-primary text-white/70 flex-col">
          <div className="text-[22px] font-[700] text-accent p-6 border-b border-white/10">Client Panel</div>

          <nav className="flex-1 px-4 space-y-3 py-6">
            <button
              onClick={() => setSection("profile")}
              className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg font-[500] transition-colors ${section === "profile" ? "bg-accent text-primary" : "hover:bg-primary-mid hover:text-white"}`}
            >
              <User size={18} /> Profile
            </button>

            <button
              onClick={() => setSection("bookings")}
              className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg font-[500] transition-colors ${section === "bookings" ? "bg-accent text-primary" : "hover:bg-primary-mid hover:text-white"}`}
            >
              <Briefcase size={18} /> Bookings
            </button>

            <button
              onClick={() => setSection("favorites")}
              className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg font-[500] transition-colors ${section === "favorites" ? "bg-accent text-primary" : "hover:bg-primary-mid hover:text-white"}`}
            >
              <Heart size={18} /> Favorites
            </button>

            <button
              onClick={() => setSection("settings")}
              className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg font-[500] transition-colors ${section === "settings" ? "bg-accent text-primary" : "hover:bg-primary-mid hover:text-white"}`}
            >
              <Settings size={18} /> Settings
            </button>
          </nav>

          <div className="p-4 border-t border-white/10">
            <button onClick={handleLogout} className="flex items-center gap-3 text-[#ef4444] hover:text-[#dc2626] hover:bg-[#ef4444]/10 w-full px-4 py-3 rounded-lg transition-colors font-[500]">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {section === "profile" && (
            <div className="bg-surface rounded-[16px] p-8 shadow-sm border border-border">
              <h2 className="text-[20px] font-[700] text-primary mb-6 flex items-center gap-3 border-b border-border pb-4">
                <User size={24} className="text-accent" />
                My Profile
              </h2>

              <div className="space-y-4">
                <p className="text-[24px] font-[600] text-primary">{client.Name}</p>
                <p className="text-secondary flex items-center gap-2 text-[15px]">
                  <MapPin size={18} className="text-accent" /> {client.City}
                </p>
                <p className="text-success font-[500] flex items-center gap-2 bg-success/10 w-fit px-3 py-1 rounded-[20px] text-[13px]">
                  <span className="h-2 w-2 bg-success rounded-full"></span> Verified Client
                </p>
              </div>
            </div>
          )}

          {section === "bookings" && (
            <div className="bg-surface rounded-[16px] p-8 shadow-sm border border-border">
              <h2 className="text-[20px] font-[700] text-primary mb-6 flex items-center gap-3 border-b border-border pb-4">
                <Briefcase size={24} className="text-accent" />
                My Bookings
              </h2>
              {client.bookings?.length ? (
                <div className="space-y-4">
                  {client.bookings.map((job, idx) => (
                    <div key={idx} className="p-5 bg-surface-2 rounded-[12px] border border-border flex justify-between items-center hover:border-accent transition-colors">
                      <div>
                        <p className="font-[600] text-primary text-[16px]">{job.workerName}</p>
                        <p className="text-secondary text-[14px] mt-1">{job.service}</p>
                      </div>
                      <p className="text-primary font-[700] text-[16px] bg-accent-light px-3 py-1 rounded-[8px]">Rs. {job.price}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-[15px] italic">No bookings yet</p>
              )}
            </div>
          )}

          {section === "favorites" && (
            <div className="bg-surface rounded-[16px] p-8 shadow-sm border border-border">
              <h2 className="text-[20px] font-[700] text-primary mb-6 flex items-center gap-3 border-b border-border pb-4">
                <Heart size={24} className="text-accent" />
                Favorite Workers
              </h2>
              {client.favorites?.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {client.favorites.map((worker, idx) => (
                    <div key={idx} className="bg-surface-2 rounded-[12px] border border-border p-4 hover:shadow-md transition-shadow">
                      <div className="flex gap-4 items-center">
                        <div className="w-[56px] h-[56px] relative rounded-full overflow-hidden border border-border">
                          <Image
                            src={`${API_BASE_URL}/uploads/${worker.Profile_Pic}`}
                            alt={`${worker.First_Name || 'Worker'}`}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-[600] text-primary text-[15px]">{worker.First_Name}</p>
                          <p className="text-accent font-[500] text-[13px]">{worker.Profession}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-[15px] italic">No favorite workers</p>
              )}
            </div>
          )}

          {section === "settings" && (
            <div className="bg-surface rounded-[16px] p-8 shadow-sm border border-border">
                <Setting id={slug} />
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}
