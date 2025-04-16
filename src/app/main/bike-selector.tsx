"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { bikeCategories } from "./mockData/bikeCategories";

export function BikeSelector() {
  const [selectedBike, setSelectedBike] = useState(bikeCategories[0].bikes[0]);

  return (
    <section id='models' className='py-20 bg-gray-50'>
      <div className='container px-4 md:px-6'>
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-3xl font-bold tracking-tight'>
            Explore Our Models
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            Find the perfect Honda motorcycle that matches your riding style
          </p>
        </motion.div>

        <Tabs defaultValue='sport' className='w-full'>
          <TabsList className='grid grid-cols-3 max-w-md mx-auto mb-8'>
            {bikeCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {bikeCategories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className='space-y-8'
            >
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {category.bikes.map((bike) => (
                  <motion.div
                    key={bike.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -10 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all ${
                        selectedBike.id === bike.id ? "border-primary" : ""
                      }`}
                      onClick={() => setSelectedBike(bike)}
                    >
                      <CardContent className='p-4'>
                        <div className='aspect-[4/3] relative mb-4 overflow-hidden rounded-lg'>
                          <Image
                            src={bike.image || "/placeholder.svg"}
                            alt={bike.name}
                            fill
                            className='object-cover'
                          />
                        </div>
                        <h3 className='font-bold text-lg'>{bike.name}</h3>
                        <p className='text-red-600 font-semibold'>
                          {bike.price}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className='flex justify-center'>
                <Link href='/view-all'>
                  <Button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium'>
                    View All {category.name} Models
                  </Button>
                </Link>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
