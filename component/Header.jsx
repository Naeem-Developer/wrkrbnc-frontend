import React from 'react'
import SequentialVideoPlayer from './Vediocontrol'
import Link from 'next/link'

const Header = () => {
    return (
        <>
            <header className="relative flex flex-col justify-center items-center w-full min-h-[600px] h-screen bg-gradient-to-b from-primary to-primary-mid">
                {/* Background Video */}
                <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
                    <SequentialVideoPlayer />
                </div>
                

                {/* Overlay Content */}
                <div className="relative flex flex-col items-center justify-center text-center px-6 sm:px-10 z-10 w-full h-full pt-16 pb-24">
                    {/* Heading */}
                    <h1 className="text-[36px] sm:text-[48px] font-[700] mb-4 text-white leading-[1.1] animate-fade-in drop-shadow-lg">
                        Find Skilled Workers
                    </h1>

                    <h2 className="text-[28px] sm:text-[36px] font-[700] text-accent animate-fade-in-up delay-300 drop-shadow-md">
                        When You Need Them
                    </h2>

                    {/* Subtext */}
                    <p className="mt-6 sm:mt-8 max-w-xl sm:max-w-2xl text-white/70 font-[400] text-[16px] sm:text-[18px] leading-[1.7] animate-fade-in-up delay-500">
                        Connect with verified professionals for all your service needs. From home repair to
                        cleaning, we’ve got you covered with reliable workers you can trust.
                    </p>

                    {/* Buttons */}
                    <div className="mt-10 sm:mt-14 flex flex-col sm:items-center sm:flex-row gap-4 sm:gap-6">
                        <Link href="/login">
                            <button className="px-[36px] py-[16px] rounded-[10px] font-[600] text-[16px] bg-accent text-primary shadow-lg hover:bg-accent-dark hover:scale-105 transition-all duration-200">
                                Hire Now
                            </button>
                        </Link>

                        <Link href="/sign-up">
                            <button className="px-[34px] py-[14px] rounded-[10px] font-[600] text-[16px] border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-200 backdrop-blur-sm">
                                Join WrkrBnC.
                            </button>
                        </Link>
                    </div>
                </div>
                
                {/* Stats Bar */}
                <div className="absolute bottom-0 w-full bg-primary-dark/90 backdrop-blur-md border-t border-white/10 z-20 py-6">
                    <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 sm:gap-16 text-center">
                        <div className="flex flex-col">
                            <span className="text-accent text-2xl sm:text-3xl font-bold">500+</span>
                            <span className="text-white text-sm sm:text-base font-medium">Verified Workers</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-accent text-2xl sm:text-3xl font-bold">10K+</span>
                            <span className="text-white text-sm sm:text-base font-medium">Jobs Completed</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-accent text-2xl sm:text-3xl font-bold">4.9★</span>
                            <span className="text-white text-sm sm:text-base font-medium">Average Rating</span>
                        </div>
                    </div>
                </div>

            </header>
        </>
    )
}

export default Header
