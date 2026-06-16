"use client"
import Image from 'next/image'
import Client_Navbar from '@/component/Client_Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { User, MapPin, Star, BadgeCheck, Filter } from "lucide-react";
import Footer from '@/component/Footer';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import WrkrBnCLoader from '@/component/loader';
import API_BASE_URL from '@/config/api';


const Page = () => {
  const [worker, setWorker] = useState([]);
  const seachparam = useSearchParams();
  const query = seachparam.get("query");
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get-all-workers`)
        if (response.data.success) {
          setWorker(response.data.data);
          setIsLoading(false);
        }else{
          setWorker([]);
          setIsLoading(false);
        }
        
      } catch (error) {
        console.error("error fetching all workers:", error);
        setWorker([]);
        setIsLoading(false);
      }
    }

    fetchWorkers();
    
  }, []);

  useEffect(() => {
  if (!query) return;

  const searchworker = async () => {
    try {
      const resp = await axios.get(`${API_BASE_URL}/searchworker/search?query=${query}`);
      
      if (resp.data.success && resp.data.data.length > 0) {
        setWorker(resp.data.data);
      }else {

        setWorker([])
      }
    } catch (error) {
      console.error("something went wrong during search", error);
      setWorker([]);
    }
  };

  searchworker(); 
}, [query]);

 

  


if(isLoading){
  return <WrkrBnCLoader />
}

  return (
    <>
      <Client_Navbar />
      <div className='bg-bg min-h-screen'>
        
        {/* Main Content Area */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row gap-8">
          
          {/* Mock Sidebar (Desktop) */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-surface rounded-[12px] border border-border p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-primary border-b border-border pb-4">
                <Filter size={20} />
                <h3 className="font-[600] text-[18px]">Filters</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-[14px] font-[600] text-primary mb-3">Category</h4>
                  <div className="space-y-2">
                    {["All", "Plumbing", "AC Repairing", "Electrician", "Cleaning", "Carpenter"].map((cat) => (
                      <label key={cat} className="flex items-center gap-2 text-[14px] text-secondary cursor-pointer">
                        <input type="checkbox" className="rounded border-border text-accent focus:ring-accent" />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[14px] font-[600] text-primary mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2].map((stars) => (
                      <label key={stars} className="flex items-center gap-2 text-[14px] text-secondary cursor-pointer">
                        <input type="checkbox" className="rounded border-border text-accent focus:ring-accent" />
                        {stars} Stars & up
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Workers Grid */}
          <div className="flex-1">
            {worker.length === 0 && !isLoading && (
              <div className="text-muted font-[600] text-3xl w-full p-12 text-center bg-surface rounded-[16px] border border-border">
                No workers found.
              </div>
            )}
            
            <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {worker && worker.map((worker) => (
                <div
                  key={worker._id}
                  className="bg-surface relative group rounded-[16px] border border-border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-accent"
                >
                  {/* Top Accent Strip */}
                  <div className="h-[6px] bg-accent w-full"></div>

                  <div className="p-5">
                    {/* Header: Avatar + Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-[56px] h-[56px] relative rounded-full overflow-hidden border border-border flex-shrink-0">
                        <Image
                          className="object-cover"
                          src={worker.Profile_Pic || "/user.png"}
                          fill
                          sizes="56px"
                          alt={`${worker.First_Name || 'Worker'} profile`}
                        />
                      </div>
                      <div>
                        <h1 className="font-[600] text-[16px] text-primary flex items-center gap-1">
                          {worker.First_Name} {worker.Last_Name?.charAt(0)}.
                        </h1>
                        <span className="inline-block mt-1 bg-[#EFF6FF] text-[#1D4ED8] px-[10px] py-[2px] rounded-[20px] text-[12px] font-[500]">
                          {worker.Profession}
                        </span>
                      </div>
                    </div>

                    {/* Stats & Meta */}
                    <div className="space-y-2 mb-5">
                      <div className="flex items-center gap-1">
                        <div className="flex text-accent">
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                        </div>
                        <span className="text-[13px] text-muted ml-1">(124 reviews)</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-[13px] text-secondary">
                        <MapPin size={14} />
                        {worker.City}
                      </div>

                      <div className="mt-3">
                        <span className="text-[18px] font-[700] text-primary">Rs. 500</span>
                        <span className="text-[13px] text-secondary">/hr</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <Link href={`/worker/${worker._id}`} className="block">
                        <button className="w-full bg-accent text-primary py-2 rounded-[8px] font-[600] text-[14px] hover:bg-accent-dark transition-colors">
                          Hire Now
                        </button>
                      </Link>
                      <div className="text-center">
                        <Link href={`/worker/${worker._id}`} className="text-[13px] text-primary hover:underline font-medium">
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Verified Badge */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-accent-light text-[#92400E] px-[10px] py-[3px] rounded-[20px] text-[11px] font-[600]">
                    <BadgeCheck size={12} /> Verified
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Page
