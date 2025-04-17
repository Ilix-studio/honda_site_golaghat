"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Heart,
  Share2,
  Download,
  Check,
  Info,
  ArrowRight,
  FuelIcon as Engine,
  Gauge,
  Scale,
  Clock,
  BikeIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmiCalculator } from "./emi-calculator";

// Types for bike data
interface BikeColor {
  name: string;
  hex: string;
  image: string;
}

interface BikeFeature {
  name: string;
  description: string;
  icon?: React.ReactNode;
}

interface BikeSpecification {
  engine: {
    type: string;
    displacement: string;
    power: string;
    torque: string;
    compression: string;
    bore: string;
    stroke: string;
    fuelSystem: string;
    transmission: string;
    startingSystem: string;
  };
  chassis: {
    frame: string;
    frontSuspension: string;
    rearSuspension: string;
    frontBrake: string;
    rearBrake: string;
    frontTire: string;
    rearTire: string;
  };
  dimensions: {
    length: string;
    width: string;
    height: string;
    seatHeight: string;
    wheelbase: string;
    groundClearance: string;
    fuelCapacity: string;
    curb: string;
  };
}

interface BikeDetail {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  year: number;
  isNew: boolean;
  colors: BikeColor[];
  features: BikeFeature[];
  specifications: BikeSpecification;
  highlights: string[];
  gallery: string[];
  relatedBikes: RelatedBike[];
}

interface RelatedBike {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

// Sample bike data
const bikeData: BikeDetail = {
  id: "cbr1000rr",
  name: "CBR1000RR Fireblade",
  category: "Sport",
  tagline: "Total Control",
  description:
    "The Honda CBR1000RR Fireblade is the ultimate expression of Honda's racing DNA. With cutting-edge technology derived from MotoGP, it delivers unparalleled performance on both road and track. The Fireblade's advanced electronics package, including Honda Selectable Torque Control (HSTC), Wheelie Control, and multiple riding modes, ensures that riders of all skill levels can experience the thrill of this superbike with confidence.",
  price: 16499,
  year: 2023,
  isNew: true,
  colors: [
    {
      name: "Grand Prix Red",
      hex: "#FF0000",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      name: "Matte Black Metallic",
      hex: "#222222",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      name: "Pearl Blue",
      hex: "#0055FF",
      image: "/placeholder.svg?height=600&width=800",
    },
  ],
  features: [
    {
      name: "Powerful Engine",
      description:
        "999cc liquid-cooled inline four-cylinder engine delivers exceptional power and torque throughout the rev range.",
      icon: <Engine className='h-5 w-5' />,
    },
    {
      name: "Advanced Electronics",
      description:
        "Sophisticated electronics package includes Honda Selectable Torque Control, Wheelie Control, and multiple riding modes.",
      icon: <Gauge className='h-5 w-5' />,
    },
    {
      name: "Lightweight Design",
      description:
        "Titanium fuel tank and carbon fiber components reduce weight for improved handling and performance.",
      icon: <Scale className='h-5 w-5' />,
    },
    {
      name: "Aerodynamic Bodywork",
      description:
        "Wind tunnel-tested bodywork reduces drag and improves stability at high speeds.",
      icon: <BikeIcon className='h-5 w-5' />,
    },
    {
      name: "Brembo Brakes",
      description:
        "High-performance Brembo brakes provide exceptional stopping power and precise control.",
      icon: <Info className='h-5 w-5' />,
    },
    {
      name: "Öhlins Suspension",
      description:
        "Fully adjustable Öhlins suspension offers superior handling and ride quality.",
      icon: <Info className='h-5 w-5' />,
    },
  ],
  specifications: {
    engine: {
      type: "Liquid-cooled 4-stroke 16-valve DOHC Inline-4",
      displacement: "999cc",
      power: "214 HP @ 14,500 rpm",
      torque: "113 Nm @ 12,500 rpm",
      compression: "13.0:1",
      bore: "76mm",
      stroke: "55mm",
      fuelSystem: "PGM-FI electronic fuel injection",
      transmission: "6-speed with quickshifter",
      startingSystem: "Electric",
    },
    chassis: {
      frame: "Aluminum composite twin spar",
      frontSuspension:
        "Öhlins NPX 43mm telescopic fork with preload, compression and rebound adjustment",
      rearSuspension:
        "Öhlins TTX36 Pro shock with preload, compression and rebound adjustment",
      frontBrake:
        "Brembo 330mm dual hydraulic disc with 4-piston calipers and sintered metal pads",
      rearBrake:
        "220mm hydraulic disc with single-piston caliper and sintered metal pads",
      frontTire: "120/70ZR17",
      rearTire: "200/55ZR17",
    },
    dimensions: {
      length: "2,065mm",
      width: "720mm",
      height: "1,125mm",
      seatHeight: "830mm",
      wheelbase: "1,455mm",
      groundClearance: "130mm",
      fuelCapacity: "16.1 liters",
      curb: "201kg",
    },
  },
  highlights: [
    "MotoGP-derived aerodynamic winglets",
    "TFT instrument display",
    "Selectable power modes",
    "Titanium exhaust system",
    "LED lighting",
    "Cornering ABS",
  ],
  gallery: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  relatedBikes: [
    {
      id: "cbr600rr",
      name: "CBR600RR",
      category: "Sport",
      price: 11999,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "cbr500r",
      name: "CBR500R",
      category: "Sport",
      price: 6999,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "cb1000r",
      name: "CB1000R",
      category: "Naked",
      price: 12999,
      image: "/placeholder.svg?height=300&width=400",
    },
  ],
};

// export function BikeDetail({ bikeId = "cbr1000rr" }) {
export function BikeDetail() {
  // In a real app, we would fetch the bike data based on the bikeId
  // In a real app, we would fetch the bike data based on the bikeId
  // For this example, we'll use the sample data
  const bike = bikeData;

  const [selectedColor, setSelectedColor] = useState(bike.colors[0]);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(
    bike.gallery[0]
  );
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className='py-8'>
      {/* Breadcrumb */}
      <div className='container px-4 md:px-6 mb-6'>
        <div className='flex items-center text-sm text-muted-foreground'>
          <Link href='/' className='hover:text-foreground transition-colors'>
            Home
          </Link>
          <ChevronRight className='h-4 w-4 mx-1' />
          <Link
            href='/view-all'
            className='hover:text-foreground transition-colors'
          >
            Motorcycles
          </Link>
          <ChevronRight className='h-4 w-4 mx-1' />
          <Link
            href={`/bikes/${bike.category.toLowerCase()}`}
            className='hover:text-foreground transition-colors'
          >
            {bike.category}
          </Link>
          <ChevronRight className='h-4 w-4 mx-1' />
          <span className='font-medium text-foreground'>{bike.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className='container px-4 md:px-6 mb-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <motion.div
            className='relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden'
            initial='hidden'
            animate='visible'
            variants={fadeIn}
          >
            <Image
              src={selectedColor.image || "/placeholder.svg"}
              alt={`${bike.name} in ${selectedColor.name}`}
              fill
              className='object-contain'
              priority
            />
            {bike.isNew && (
              <Badge className='absolute top-4 left-4 bg-red-600'>New</Badge>
            )}
          </motion.div>

          <motion.div
            className='space-y-6'
            initial='hidden'
            animate='visible'
            variants={fadeInUp}
          >
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <Badge variant='outline' className='text-xs'>
                  {bike.category}
                </Badge>
                <Badge variant='outline' className='text-xs'>
                  {bike.year}
                </Badge>
              </div>
              <h1 className='text-3xl md:text-4xl font-bold'>{bike.name}</h1>
              <p className='text-xl text-muted-foreground mt-1'>
                {bike.tagline}
              </p>
            </div>

            <div className='flex items-baseline gap-2'>
              <span className='text-3xl font-bold text-red-600'>
                {formatCurrency(bike.price)}
              </span>
              <span className='text-sm text-muted-foreground'>MSRP</span>
            </div>

            <div className='space-y-2'>
              <h3 className='font-medium'>Key Specifications</h3>
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex items-center gap-2'>
                  <Engine className='h-5 w-5 text-red-600' />
                  <div>
                    <p className='text-sm text-muted-foreground'>Engine</p>
                    <p className='font-medium'>
                      {bike.specifications.engine.displacement}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Gauge className='h-5 w-5 text-red-600' />
                  <div>
                    <p className='text-sm text-muted-foreground'>Power</p>
                    <p className='font-medium'>
                      {bike.specifications.engine.power.split("@")[0].trim()}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='h-5 w-5 text-red-600' />
                  <div>
                    <p className='text-sm text-muted-foreground'>Torque</p>
                    <p className='font-medium'>
                      {bike.specifications.engine.torque.split("@")[0].trim()}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Scale className='h-5 w-5 text-red-600' />
                  <div>
                    <p className='text-sm text-muted-foreground'>Weight</p>
                    <p className='font-medium'>
                      {bike.specifications.dimensions.curb}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-2'>
              <h3 className='font-medium'>Colors</h3>
              <div className='flex space-x-3'>
                {bike.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor.name === color.name
                        ? "border-red-600"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                  />
                ))}
              </div>
              <p className='text-sm'>{selectedColor.name}</p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 pt-4'>
              <Button className='bg-red-600 hover:bg-red-700'>
                Build Your Bike
              </Button>
              <Link href='/test-ride' className='w-full sm:w-auto'>
                <Button variant='outline' className='w-full'>
                  Schedule Test Ride
                </Button>
              </Link>
              <Button variant='ghost' size='icon'>
                <Heart className='h-5 w-5' />
              </Button>
              <Button variant='ghost' size='icon'>
                <Share2 className='h-5 w-5' />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className='container px-4 md:px-6 mb-12'>
        <div className='max-w-3xl'>
          <h2 className='text-2xl font-bold mb-4'>Overview</h2>
          <div className='prose prose-gray max-w-none'>
            <p>
              {showFullDescription
                ? bike.description
                : `${bike.description.substring(0, 200)}...`}
            </p>
            {bike.description.length > 200 && (
              <Button
                variant='link'
                className='p-0 h-auto text-red-600'
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Specifications Tabs */}
      <section className='container px-4 md:px-6 mb-12'>
        <h2 className='text-2xl font-bold mb-6'>Specifications</h2>
        <Tabs defaultValue='engine' className='w-full'>
          <TabsList className='grid grid-cols-3 max-w-md mb-6'>
            <TabsTrigger value='engine'>Engine</TabsTrigger>
            <TabsTrigger value='chassis'>Chassis</TabsTrigger>
            <TabsTrigger value='dimensions'>Dimensions</TabsTrigger>
          </TabsList>

          <TabsContent value='engine' className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Engine Type</p>
                <p>{bike.specifications.engine.type}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Displacement</p>
                <p>{bike.specifications.engine.displacement}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Maximum Power</p>
                <p>{bike.specifications.engine.power}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Maximum Torque</p>
                <p>{bike.specifications.engine.torque}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>
                  Compression Ratio
                </p>
                <p>{bike.specifications.engine.compression}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Bore × Stroke</p>
                <p>
                  {bike.specifications.engine.bore} ×{" "}
                  {bike.specifications.engine.stroke}
                </p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Fuel System</p>
                <p>{bike.specifications.engine.fuelSystem}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Transmission</p>
                <p>{bike.specifications.engine.transmission}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Starting System</p>
                <p>{bike.specifications.engine.startingSystem}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='chassis' className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Frame Type</p>
                <p>{bike.specifications.chassis.frame}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>
                  Front Suspension
                </p>
                <p>{bike.specifications.chassis.frontSuspension}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Rear Suspension</p>
                <p>{bike.specifications.chassis.rearSuspension}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Front Brake</p>
                <p>{bike.specifications.chassis.frontBrake}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Rear Brake</p>
                <p>{bike.specifications.chassis.rearBrake}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Front Tire</p>
                <p>{bike.specifications.chassis.frontTire}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Rear Tire</p>
                <p>{bike.specifications.chassis.rearTire}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='dimensions' className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Length</p>
                <p>{bike.specifications.dimensions.length}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Width</p>
                <p>{bike.specifications.dimensions.width}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Height</p>
                <p>{bike.specifications.dimensions.height}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Seat Height</p>
                <p>{bike.specifications.dimensions.seatHeight}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Wheelbase</p>
                <p>{bike.specifications.dimensions.wheelbase}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>
                  Ground Clearance
                </p>
                <p>{bike.specifications.dimensions.groundClearance}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Fuel Capacity</p>
                <p>{bike.specifications.dimensions.fuelCapacity}</p>
              </div>
              <div className='py-2 border-b'>
                <p className='text-sm text-muted-foreground'>Curb Weight</p>
                <p>{bike.specifications.dimensions.curb}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className='flex justify-center mt-6'>
          <Button variant='outline' className='flex items-center gap-2'>
            <Download className='h-4 w-4' />
            Download Full Specifications
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className='bg-gray-50 py-12 mb-12'>
        <div className='container px-4 md:px-6'>
          <h2 className='text-2xl font-bold mb-6'>Features & Technology</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {bike.features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className='bg-white p-6 rounded-lg shadow-sm'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className='flex items-center gap-3 mb-3'>
                  <div className='p-2 bg-red-50 text-red-600 rounded-full'>
                    {feature.icon || <Check className='h-5 w-5' />}
                  </div>
                  <h3 className='font-bold'>{feature.name}</h3>
                </div>
                <p className='text-muted-foreground text-sm'>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='bg-white p-6 rounded-lg shadow-sm'>
              <h3 className='font-bold mb-4'>Key Highlights</h3>
              <ul className='space-y-2'>
                {bike.highlights.map((highlight, index) => (
                  <li key={index} className='flex items-center gap-2'>
                    <Check className='h-4 w-4 text-green-500 flex-shrink-0' />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-sm'>
              <h3 className='font-bold mb-4'>Safety Features</h3>
              <ul className='space-y-2'>
                <li className='flex items-center gap-2'>
                  <Check className='h-4 w-4 text-green-500 flex-shrink-0' />
                  <span>Honda Selectable Torque Control (HSTC)</span>
                </li>
                <li className='flex items-center gap-2'>
                  <Check className='h-4 w-4 text-green-500 flex-shrink-0' />
                  <span>Wheelie Control</span>
                </li>
                <li className='flex items-center gap-2'>
                  <Check className='h-4 w-4 text-green-500 flex-shrink-0' />
                  <span>Cornering ABS</span>
                </li>
                <li className='flex items-center gap-2'>
                  <Check className='h-4 w-4 text-green-500 flex-shrink-0' />
                  <span>Selectable Engine Brake</span>
                </li>
                <li className='flex items-center gap-2'>
                  <Check className='h-4 w-4 text-green-500 flex-shrink-0' />
                  <span>Emergency Stop Signal</span>
                </li>
                <li className='flex items-center gap-2'>
                  <Check className='h-4 w-4 text-green-500 flex-shrink-0' />
                  <span>Riding Modes (Street, Sport, Race, User)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className='container px-4 md:px-6 mb-12'>
        <h2 className='text-2xl font-bold mb-6'>Gallery</h2>
        <div className='grid grid-cols-1 gap-6'>
          <div className='aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden'>
            <Image
              src={selectedGalleryImage || "/placeholder.svg"}
              alt={bike.name}
              width={1200}
              height={675}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='grid grid-cols-4 gap-4'>
            {bike.gallery.map((image, index) => (
              <button
                key={index}
                className={`aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden ${
                  selectedGalleryImage === image ? "ring-2 ring-red-600" : ""
                }`}
                onClick={() => setSelectedGalleryImage(image)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${bike.name} gallery image ${index + 1}`}
                  width={300}
                  height={225}
                  className='w-full h-full object-cover'
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className='container px-4 md:px-6 mb-12'>
        <h2 className='text-2xl font-bold mb-6'>Finance Calculator</h2>
        <EmiCalculator selectedBikePrice={bike.price} />
      </section>

      {/* Related Bikes */}
      <section className='container px-4 md:px-6 mb-12'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>Related Bikes</h2>
          <Link
            href='/view-all'
            className='text-red-600 flex items-center hover:underline'
          >
            View All <ArrowRight className='h-4 w-4 ml-1' />
          </Link>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {bike.relatedBikes.map((relatedBike) => (
            <Link key={relatedBike.id} href={`/bikes/${relatedBike.id}`}>
              <Card className='h-full overflow-hidden hover:shadow-md transition-shadow'>
                <div className='aspect-[4/3] relative'>
                  <Image
                    src={relatedBike.image || "/placeholder.svg"}
                    alt={relatedBike.name}
                    fill
                    className='object-cover'
                  />
                </div>
                <CardContent className='p-4'>
                  <h3 className='font-bold'>{relatedBike.name}</h3>
                  <div className='flex justify-between items-center mt-2'>
                    <Badge variant='outline'>{relatedBike.category}</Badge>
                    <span className='font-semibold text-red-600'>
                      {formatCurrency(relatedBike.price)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className='bg-red-600 text-white py-12'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div>
              <h2 className='text-2xl font-bold'>
                Ready to Experience the {bike.name}?
              </h2>
              <p className='mt-2'>
                Schedule a test ride today or visit your nearest Honda
                dealership.
              </p>
            </div>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link href='/test-ride'>
                <Button className='bg-white text-red-600 hover:bg-gray-100'>
                  Schedule Test Ride
                </Button>
              </Link>
              <Link href='/book-service'>
                <Button
                  variant='outline'
                  className='border-white text-white hover:bg-red-700'
                >
                  Find a Dealer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
