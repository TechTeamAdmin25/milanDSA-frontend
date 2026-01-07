"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const people = [
  {
    name: "Dr. Prince Kalyanasundaram",
    role: "Deputy Director",
    subRole: "Directorate of Student Affairs",
    image: "/Directors_Images/PrinceKalyanasundaram.png",
    type: "director"
  },
  {
    name: "Dr. Nisha Ashokan",
    role: "Director",
    subRole: "Directorate of Student Affairs",
    image: "/Directors_Images/NishaAshokan.png",
    type: "director",
    featured: true
  },
  {
    name: "Dr. S. Pradeep",
    role: "Assistant Director",
    subRole: "Directorate of Student Affairs",
    image: "/Directors_Images/SPradeep.png",
    type: "director"
  },
  {
    name: "Dhandayuthapani B",
    role: "Event Manager",
    image: "/Managers_Images/Dhandayuthapani.png",
    type: "manager"
  },
  {
    name: "Rajiv D",
    role: "Event Manager",
    image: "/Managers_Images/RajivD.png",
    type: "manager"
  }
];

export function DirectorsManagersSection() {
  const directors = people.filter(p => p.type === "director");
  const managers = people.filter(p => p.type === "manager");

  return (
    <section className="relative w-full py-24 bg-white dark:bg-neutral-950 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/30 dark:bg-purple-900/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 dark:bg-blue-900/10 rounded-full blur-[100px]" />
        </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Directors Section */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400">
              The Visionaries
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">Guiding the spirit of Milan</p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
             {/* Render Featured (Middle) Director First on Mobile if needed, but here we keep logical order or specific design */}
             {/* We can map them. The middle one in the array (Nisha) is featured. */}
             {/* Let's reorder for visual hierarchy: Prince, Nisha (Center/Largest), Pradeep */}
             
             {/* Re-arranging for display: Prince, Nisha, Pradeep. */}
             {directors.map((person, idx) => (
               <motion.div
                 key={person.name}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5, delay: idx * 0.1 }}
                 viewport={{ once: true }}
                 className={`flex flex-col items-center group ${person.featured ? 'order-first md:order-none' : ''}`}
               >
                 <div className={`relative ${person.featured ? 'w-56 h-56 md:w-72 md:h-72' : 'w-44 h-44 md:w-56 md:h-56'} mb-6`}>
                   <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                   <Image
                     src={person.image}
                     alt={person.name}
                     fill
                     className={`rounded-full object-cover border-4 border-white dark:border-neutral-800 shadow-xl transition-transform duration-500 group-hover:scale-105`}
                   />
                 </div>
                 <div className="text-center">
                   <h3 className={`font-bold text-neutral-900 dark:text-white ${person.featured ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>
                     {person.name}
                   </h3>
                   <p className="text-purple-600 dark:text-purple-400 font-medium mt-1">{person.role}</p>
                   {person.subRole && (
                     <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{person.subRole}</p>
                   )}
                 </div>
               </motion.div>
             ))}
          </div>
        </div>

        {/* Managers Section */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
             <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              Event Managers
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            {managers.map((person, idx) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center group"
              >
                <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6">
                   <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                   <Image
                     src={person.image}
                     alt={person.name}
                     fill
                     className="rounded-full object-cover border-4 border-white dark:border-neutral-800 shadow-lg transition-transform duration-500 group-hover:scale-105"
                   />
                </div>
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white">
                    {person.name}
                  </h3>
                  <p className="text-pink-600 dark:text-pink-400 font-medium mt-1">{person.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
