"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { handleError, handleSuccess } from "@/frontend_utalties/notfication_control";
import Link from "next/link";
import WrkrBnCLoader from "@/component/loader";
import API_BASE_URL from '@/config/api';
import Client_Navbar from "@/component/Client_Navbar";
import Footer from "@/component/Footer";
import { BadgeCheck, MapPin, Star } from "lucide-react";

export default function WorkerDetails() {
  const router = useRouter();
  const { slug } = useParams();
  const [worker, setWorker] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkerDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const resp = await axios.get(`${API_BASE_URL}/getworkerdata/${slug}`);
      if (resp.data.success) {
        setWorker({ ...resp.data.data, services: resp.data.data.services || [] });
      } else {
        setError("Worker not found.");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to load worker details.";
      setError(msg);
      handleError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchWorkerDetails();
  }, [slug]);

  if (isLoading) return <WrkrBnCLoader />;

  if (error) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="bg-surface rounded-[16px] border border-border p-8 text-center max-w-md">
          <p className="text-primary text-[18px] font-[600] mb-4">Something went wrong</p>
          <p className="text-secondary text-[15px] mb-6">{error}</p>
          <button onClick={fetchWorkerDetails} className="bg-accent text-primary px-6 py-3 rounded-[10px] font-[600] hover:bg-accent-dark transition-colors">Try Again</button>
        </div>
      </div>
    );
  }
  return (
    <>
    <Client_Navbar />
    <div className="min-h-screen bg-bg relative overflow-hidden pb-20">

      {/* Decorative background gradient */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary to-bg z-0"></div>

      <div className="pt-[100px] pb-20 px-4 sm:px-6 relative z-10">
        {/* TOP CARD */}
        <div className="max-w-[1000px] mx-auto bg-surface rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-border overflow-hidden">

          <div className="md:flex">
            {/* Image */}
            <div className="md:w-[40%] relative">
              <div className="aspect-square relative w-full h-full min-h-[300px]">
                <Image
                  src={worker.Profile_Pic || "/user.png"}
                  alt={`${worker.First_Name || 'Worker'} profile`}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Info */}
            <div className="md:w-[60%] p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-block bg-[#EFF6FF] text-[#1D4ED8] px-[12px] py-[4px] rounded-[20px] text-[14px] font-[600]">
                  {worker.Profession}
                </span>
                <div className="flex items-center gap-1 bg-accent-light text-[#92400E] px-[10px] py-[4px] rounded-[20px] text-[12px] font-[600]">
                  <BadgeCheck size={14} /> Verified
                </div>
              </div>
              
              <h1 className="text-[32px] md:text-[40px] font-[700] text-primary tracking-tight leading-tight">
                {worker.First_Name} {worker.Last_Name}
              </h1>
              
              <div className="flex items-center gap-4 mt-4 text-secondary">
                 <div className="flex items-center gap-1">
                    <MapPin size={16} /> {worker.City || "Unknown Location"}
                 </div>
                 <div className="flex items-center gap-1">
                    <div className="flex text-accent">
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                    </div>
                    <span className="text-[14px] ml-1 text-primary font-[500]">5.0</span>
                 </div>
              </div>



              {/* Buttons */}
              <div className="mt-10 flex gap-4 flex-wrap">
                <Link href={`/hireworker/${worker._id}`}>
                  <button className="bg-accent text-primary px-[32px] py-[14px] rounded-[10px] text-[16px] font-[600] shadow-md hover:bg-accent-dark transition-all">
                    Hire Worker
                  </button>
                </Link>

                <Link href={`/contactworker/${worker._id}`}>
                  <button className="border-2 border-border text-primary px-[32px] py-[14px] rounded-[10px] text-[16px] font-[600] hover:bg-surface-2 transition-all">
                    Contact
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* SERVICES */}
        <div className="max-w-[1000px] mx-auto mt-20">
            <h2 className="text-[32px] font-[700] text-primary mb-8 text-center">Services Offered</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {worker.services.length > 0 ? (
            worker.services.map((service, index) => (
              <div key={index} className="bg-surface p-6 rounded-[16px] border border-border shadow-sm hover:shadow-md hover:border-accent transition-all group">
                <h3 className="text-[20px] font-[600] text-primary group-hover:text-accent-dark transition-colors">{service.title}</h3>

                <p className="text-secondary mt-3 text-[15px] leading-relaxed line-clamp-3">
                  {service.details}
                </p>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-[24px] font-[700] text-primary">
                    <span className="text-[14px] text-secondary font-[500]">Rs.</span> {service.price}
                  </span>
                  <button className="bg-surface-2 text-primary px-[20px] py-[10px] rounded-[8px] font-[600] text-[14px] hover:bg-accent transition-colors">
                    Book
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-[16px] font-[500] text-muted col-span-full py-10 bg-surface rounded-[16px] border border-border">
              No services provided yet.
            </p>
          )}
        </div>
        </div>


        <div className="max-w-[1000px] mx-auto mt-20">
          <h2 className="text-[32px] font-[700] text-primary mb-8 text-center">
            Portfolio / Past Work
          </h2>

          {worker.portfolio && worker.portfolio.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {worker.portfolio.map((item, index) => (
                <div
                  key={index}
                  className="bg-surface rounded-[16px] border border-border shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={item.image}
                      alt={item.title || "Portfolio work"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[18px] font-[600] text-primary">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[16px] font-[500] text-muted bg-surface py-10 rounded-[16px] border border-border">
              No portfolio available yet.
            </p>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
