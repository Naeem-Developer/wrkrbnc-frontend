import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className='bg-primary text-white/70 pt-16'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-4xl font-bold mb-4 text-white">Wrkr<span className="text-accent">BnC.</span></h3>
              <p className="text-white/70 text-[14px] leading-relaxed">Connecting businesses with top talent since 2018.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-3">
                <Link href="/aboutUs"><li className="text-white/70 hover:text-accent transition-colors cursor-pointer">About Us</li></Link>
                <li><a href="#" className="text-white/70 hover:text-accent transition-colors">Careers</a></li>
                <li><a href="#" className="text-white/70 hover:text-accent transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/70 hover:text-accent transition-colors">Help Center</a></li>
                <li><a href="#" className="text-white/70 hover:text-accent transition-colors">Pricing</a></li>
                <li><a href="#" className="text-white/70 hover:text-accent transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-3">
                <li className="text-white/70">naeem01developer@gmail.com</li>
                <li className="text-white/70">+92 (345) 1242079</li>
                <li className="text-white/70">Faisalabad, Pakistan</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-primary-dark border-t border-white/10 py-6 text-center text-white/70 text-[14px]">
          <p>Copyright © {new Date().getFullYear()} WrkrBnC. All rights reserved.</p>
        </div>
    </footer>
      
    </>
  )
}

export default Footer
