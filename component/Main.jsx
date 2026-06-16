import React from "react";
import Services from "./Services";
import ProcessChart from "./ProcessChart";
import Footer from "./Footer";

const Main = () => {
  return (
    <>
     <div className="bg-bg text-primary pb-20">
      
      {/* Search Bar Section */}
      <div className="max-w-[720px] mx-auto -mt-[36px] relative z-30 px-4 sm:px-6 mb-16">
        <div className="bg-surface rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.15)] flex items-center p-2">
           <select className="bg-transparent text-secondary outline-none px-4 py-2 border-r border-border text-[14px]">
             <option>All Services</option>
             <option>Plumbing</option>
             <option>AC Repairing</option>
             <option>Electrician</option>
             <option>Cleaning</option>
             <option>Carpenter</option>
           </select>
           <input 
             type="text" 
             placeholder="Location (e.g., Lahore)"
             className="flex-1 bg-transparent px-4 py-2 outline-none text-primary placeholder-muted text-[14px] sm:text-[16px]"
           />
           <button className="bg-accent text-primary px-[32px] py-[12px] rounded-r-[10px] rounded-l-none font-[600] hover:bg-accent-dark transition-colors">
             Search
           </button>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-[1200px] mx-auto px-[24px]">
        <h2
          id="services"
          className="text-[36px] text-center font-[700] mb-4 text-primary"
        >
          We <span className="text-accent">Offer</span>
        </h2>

        <p className="text-center max-w-2xl mx-auto mb-12 text-secondary text-[16px]">
          WrkrBnC connects you with verified local professionals for home and
          commercial services — book skilled workers instantly with secure
          payments and real-time tracking.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
        <Services
          title="AC Repairing"
          dis="Expert AC mechanic services for quick repairs, maintenance, and installations. Reliable, affordable, and efficient solutions to keep you cool and comfortable. Book now for fast, professional service at your doorstep."
          pic="smart-ac.png"
        />
        <Services
          title="Fast Plumbing"
          dis="Certified plumber available for emergency repair, pipe installation, bathroom fittings, and leak detection. Affordable, trusted services near you. Hire expert local plumbers now on WrkrBnc—fast and reliable."
          pic="repair-worker.png"
        />
        <Services
          title="Labor Near You"
          dis="Hire skilled and unskilled labor workers for construction, loading, shifting, and general tasks. Fast, affordable, and reliable labor services near you. Book trusted workers today on WrkrBnc with ease."
          pic="labor.png"
        />
        <Services
          title="Gardening Crew"
          dis="Hire professional gardeners for lawn care, landscaping, and garden cleanup. Affordable, skilled gardening services near you. Book trusted local gardeners now on WrkrBnc for a greener space."
          pic="gardener.png"
        />
        <Services
          title="Power Fix"
          dis="Hire certified electricians for wiring, lighting, fan installation, and electrical repairs. Fast, safe, and affordable service near you. Book expert electricians today on WrkrBnc for reliable power solutions."
          pic="electrician.png"
        />
        <Services
          title="Quick Clean"
          dis="Hire professional cleaners for home, office, and deep cleaning services. Affordable, hygienic, and fast cleaning near you. Book trusted cleaning experts today on WrkrBnc for a spotless space."
          pic="cleaning.png"
        />
        <Services
          title="Wood Experts"
          dis="Hire skilled carpenters for furniture repair, custom woodwork, door fitting, and cabinet installation. Affordable, reliable services near you. Book professional today on WrkrBnc for quality craftsmanship."
          pic="carpenter.png"
        />
      </div>
      </div>
      </div>

      <ProcessChart />
      <Footer/>
    </>
  );
};

export default Main;
