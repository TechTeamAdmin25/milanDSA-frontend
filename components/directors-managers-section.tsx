"use client";

import React from 'react';
import Image from 'next/image';

export function DirectorsManagersSection() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center py-20 px-4">
     
      {/* Main content container */}
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Directors Section */}
        <div className="relative flex flex-col items-center mb-16">
          {/* Directors Text */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center">
              Directors
            </h2>
          </div>

          {/* Directors Images Container - simple flex layout */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
            {/* Prince - Left */}
            <div className="flex flex-col items-center">
              <Image
                src="/Directors_Images/PrinceKalyanasundaram.png"
                alt="Prince Kalyanasundaram"
                width={256}
                height={256}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover shadow-2xl border-2 md:border-4 border-white"
              />
              <div className="mt-3 text-center px-2">
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">Dr. Prince Kalyanasundaram</p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700">Deputy Director<br/>Directorate of Student Affairs</p>
              </div>
            </div>

            {/* Nisha - Center */}
            <div className="flex flex-col items-center">
              <Image
                src="/Directors_Images/NishaAshokan.png"
                alt="Nisha Ashokan"
                width={288}
                height={288}
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full object-cover shadow-2xl border-2 md:border-4 border-white"
              />
              <div className="mt-3 text-center px-2">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900">Dr. Nisha Ashokan</p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700">Director<br/>Directorate of Student Affairs</p>
              </div>
            </div>

            {/* Pradeep - Right */}
            <div className="flex flex-col items-center">
              <Image
                src="/Directors_Images/SPradeep.png"
                alt="S Pradeep"
                width={256}
                height={256}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover shadow-2xl border-2 md:border-4 border-white"
              />
              <div className="mt-3 text-center px-2">
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">Dr. S. Pradeep</p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700">Assistant Director<br/>Directorate of Student Affairs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Managers Section */}
        <div className="relative flex flex-col items-center">
          {/* Managers Text */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center">
              Managers
            </h2>
          </div>

          {/* Managers Images */}
          <div className="flex gap-8 sm:gap-12 md:gap-16 lg:gap-20">
            <div className="flex flex-col items-center">
              <Image
                src="/Managers_Images/Dhandayuthapani.png"
                alt="Dhandayuthapani"
                width={224}
                height={224}
                className="w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full object-cover shadow-2xl border-2 md:border-4 border-white"
              />
              <div className="mt-3 text-center px-2">
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">Dhandayuthapani B</p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700">Event Manager</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/Managers_Images/RajivD.png"
                alt="Rajiv D"
                width={224}
                height={224}
                className="w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full object-cover shadow-2xl border-2 md:border-4 border-white"
              />
              <div className="mt-3 text-center px-2">
                <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">Rajiv D</p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700">Event Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
