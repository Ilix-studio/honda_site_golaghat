"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "../../assets/logo.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='container flex items-center justify-between h-16 px-4 md:px-6'>
        <Link href='/' className='flex items-center gap-2'>
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={Logo}
              alt='Honda Logo'
              width={60}
              height={40}
              priority
            />
          </motion.div>
          <motion.span
            className='text-xl font-bold'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Tsangpool Honda Motorcycles
          </motion.span>
        </Link>

        <div className='hidden md:flex md:items-center md:gap-4'>
          <nav className='flex items-center gap-6'>
            <Link
              href='#models'
              className='text-sm font-medium hover:text-primary transition-colors'
            >
              Models
            </Link>

            {/* Branches Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <button className='flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors'>
                  Branches <ChevronDown className='h-4 w-4' />
                </button>
              </PopoverTrigger>
              <PopoverContent className='w-48 p-0'>
                <div className='rounded-md border bg-popover text-popover-foreground shadow-md'>
                  <div className='flex flex-col'>
                    <Link
                      href='#branches/main'
                      className='px-4 py-2 text-sm hover:bg-muted transition-colors'
                    >
                      Golaghat
                    </Link>
                    <Link
                      href='#branches/downtown'
                      className='px-4 py-2 text-sm hover:bg-muted transition-colors'
                    >
                      Sarupathar
                    </Link>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Link
              href='#contact'
              className='text-sm font-medium hover:text-primary transition-colors'
            >
              Finance
            </Link>
          </nav>
          <div className='flex items-center gap-2'>
            <Link href='/test-ride'>
              <Button variant='outline'>Test Ride</Button>
            </Link>
            <Link href='/book-service'>
              <Button>Book Service</Button>
            </Link>
          </div>
        </div>

        <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          className='md:hidden'
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className='flex flex-col p-4 space-y-4 border-t'>
            <Link
              href='#models'
              className='text-sm font-medium hover:text-primary transition-colors'
              onClick={() => setIsOpen(false)}
            >
              Models
            </Link>

            {/* Mobile Branches (expanded instead of dropdown) */}
            <div className='space-y-2'>
              <div className='text-sm font-medium'>Branches</div>
              <div className='pl-4 space-y-2'>
                <Link
                  href='#branches/main'
                  className='block text-sm text-muted-foreground hover:text-primary transition-colors'
                  onClick={() => setIsOpen(false)}
                >
                  Main Branch
                </Link>
                <Link
                  href='#branches/downtown'
                  className='block text-sm text-muted-foreground hover:text-primary transition-colors'
                  onClick={() => setIsOpen(false)}
                >
                  Downtown Branch
                </Link>
              </div>
            </div>

            <Link
              href='#technology'
              className='text-sm font-medium hover:text-primary transition-colors'
              onClick={() => setIsOpen(false)}
            >
              Technology
            </Link>
            <Link
              href='#contact'
              className='text-sm font-medium hover:text-primary transition-colors'
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className='flex flex-col gap-2'>
              <Link href='/test-ride' onClick={() => setIsOpen(false)}>
                <Button variant='outline' className='w-full'>
                  Test Ride
                </Button>
              </Link>
              <Link href='/book-service' onClick={() => setIsOpen(false)}>
                <Button className='w-full'>Book Service</Button>
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
