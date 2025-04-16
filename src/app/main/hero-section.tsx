"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to search results page with the query
      router.push(`/view-all?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className='relative min-h-[600px] md:h-screen flex items-center overflow-hidden'>
      {/* Background with overlay */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/images/hondabobber.jpg'
          alt='Honda motorcycle'
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* Gradient overlay for better text visibility */}
      <div className='absolute inset-0 z-1 bg-gradient-to-r from-black/80 to-black/50' />

      <div className='container relative z-10 px-4 md:px-6 py-16 md:py-0'>
        <div className='max-w-xl md:max-w-3xl space-y-6'>
          <motion.h1
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Experience the Thrill of Honda Engineering
          </motion.h1>

          <motion.p
            className='text-base sm:text-lg md:text-xl text-gray-200'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover our latest lineup of motorcycles designed for performance,
            reliability, and the pure joy of riding.
          </motion.p>

          <motion.div
            className='flex flex-col sm:flex-row gap-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href='/view-all'>
              <Button
                size='lg'
                className='w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white'
              >
                Explore Models
              </Button>
            </Link>

            {/* Search Component */}
            <form onSubmit={handleSearch} className='flex w-full sm:w-auto'>
              <div className='relative flex-1'>
                <Input
                  type='text'
                  placeholder='Search bikes or scooters...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-4 pr-10 py-2 border-2 border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-l-md h-11'
                />
                <Button
                  type='submit'
                  size='icon'
                  className='absolute right-0 top-0 h-full bg-white text-black hover:bg-gray-200 rounded-none rounded-r-md'
                >
                  <Search className='h-5 w-5' />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
