"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Define the bike interface
interface Bike {
  id: string;
  name: string;
  category: string;
  price: number;
  engineSize: number;
  power: number;
  mileage?: number; // Optional mileage field
  weight: number;
  features: string[];
  image: string;
  year: number;
  isNew?: boolean;
}

// Add scooter data
const scootyData: Bike[] = [
  {
    id: "activa6g",
    name: "Activa 6G",
    category: "scooty",
    price: 74500,
    engineSize: 110,
    power: 8,
    weight: 107,
    mileage: 60,
    features: [
      "LED Lights",
      "Electric Start",
      "USB Charging",
      "Storage Compartment",
    ],
    image: "/placeholder.svg",
    year: 2023,
  },
  {
    id: "dio",
    name: "Dio",
    category: "scooty",
    price: 69900,
    engineSize: 110,
    power: 8,
    weight: 105,
    mileage: 55,
    features: ["LED Lights", "Electric Start", "Storage Compartment"],
    image: "/placeholder.svg",
    year: 2023,
  },
  {
    id: "activa125",
    name: "Activa 125",
    category: "scooty",
    price: 85900,
    engineSize: 125,
    power: 8.3,
    weight: 111,
    mileage: 55,
    features: ["LED Headlamp", "Digital-Analog Meter", "External Fuel Lid"],
    image: "/placeholder.svg",
    year: 2023,
  },
];

// Available features for filtering
const availableFeatures = [
  "Quick Shifter",
  "Riding Modes",
  "Traction Control",
  "ABS",
  "LED Lights",
  "DCT",
  "Cruise Control",
  "Tubeless Tires",
  "Storage Compartment",
  "Navigation",
  "Electric Start",
  "USB Charging",
  "Digital Meter",
];

// Import bike data - we'll combine it with scooter data
import { allBikes as importedBikes } from "./mockData/allbikes";

// Combine original bike data with scooter data
const allBikes: Bike[] = [...importedBikes, ...scootyData];

export function ViewAllBikes() {
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 3000000]);
  const [engineSizeRange, setEngineSizeRange] = useState<number[]>([0, 2000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // State for filtered bikes
  const [filteredBikes, setFilteredBikes] = useState<Bike[]>(allBikes);

  // Apply filters
  useEffect(() => {
    let result = [...allBikes];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((bike) => bike.category === selectedCategory);
    }

    // Filter by price range
    result = result.filter(
      (bike) => bike.price >= priceRange[0] && bike.price <= priceRange[1]
    );

    // Filter by engine size
    result = result.filter(
      (bike) =>
        bike.engineSize >= engineSizeRange[0] &&
        bike.engineSize <= engineSizeRange[1]
    );

    // Filter by features
    if (selectedFeatures.length > 0) {
      result = result.filter((bike) =>
        selectedFeatures.every((feature) => bike.features.includes(feature))
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (bike) =>
          bike.name.toLowerCase().includes(query) ||
          bike.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => b.year - a.year);
        break;
      case "engine-size":
        result.sort((a, b) => b.engineSize - a.engineSize);
        break;
      case "power":
        result.sort((a, b) => b.power - a.power);
        break;
      case "mileage":
        result.sort((a, b) => (b.mileage || 0) - (a.mileage || 0));
        break;
      default:
        // Featured sorting (new bikes first, then by price)
        result.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.price - a.price;
        });
    }

    setFilteredBikes(result);
  }, [
    selectedCategory,
    priceRange,
    engineSizeRange,
    selectedFeatures,
    searchQuery,
    sortBy,
  ]);

  // Toggle feature selection
  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Categories for tabs
  const categories = [
    { id: "all", name: "All Motorcycles" },
    { id: "scooty", name: "Scooty" },
    { id: "sport", name: "Sport" },
    { id: "adventure", name: "Adventure" },
    { id: "cruiser", name: "Cruiser" },
    { id: "touring", name: "Touring" },
    { id: "naked", name: "Naked" },
  ];

  // Reset all filters
  const resetAllFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, 3000000]);
    setEngineSizeRange([0, 2000]);
    setSelectedFeatures([]);
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <section className='py-20'>
      <div className='container px-4 md:px-6'>
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-3xl font-bold tracking-tight'>
            All Honda Motorcycles
          </h2>
          <p className='mt-4 text-lg text-muted-foreground max-w-2xl mx-auto'>
            Explore our complete lineup of motorcycles and find the perfect ride
            for your style
          </p>
        </motion.div>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Mobile filter toggle */}
          <div className='lg:hidden flex justify-between items-center mb-4'>
            <Button
              variant='outline'
              onClick={() => setShowFilters(!showFilters)}
              className='flex items-center gap-2'
            >
              <SlidersHorizontal className='h-4 w-4' />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='featured'>Featured</SelectItem>
                <SelectItem value='price-low'>Price: Low to High</SelectItem>
                <SelectItem value='price-high'>Price: High to Low</SelectItem>
                <SelectItem value='newest'>Newest</SelectItem>
                <SelectItem value='engine-size'>Engine Size</SelectItem>
                <SelectItem value='power'>Power</SelectItem>
                <SelectItem value='mileage'>Mileage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filters sidebar */}
          <AnimatePresence>
            {(showFilters ||
              (!showFilters &&
                typeof window !== "undefined" &&
                window.innerWidth >= 1024)) && (
              <motion.div
                className={`lg:w-1/4 bg-white p-6 rounded-lg border ${
                  showFilters ? "block" : "hidden lg:block"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className='flex justify-between items-center mb-6'>
                  <h3 className='text-lg font-bold'>Filters</h3>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={resetAllFilters}
                    className='text-sm'
                  >
                    Reset All
                  </Button>
                </div>

                <div className='space-y-6'>
                  {/* Search */}
                  <div>
                    <Label
                      htmlFor='search'
                      className='text-sm font-medium mb-2 block'
                    >
                      Search
                    </Label>
                    <div className='relative'>
                      <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                      <Input
                        id='search'
                        placeholder='Search bikes or scooty'
                        className='pl-9'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {searchQuery && (
                        <button
                          className='absolute right-2.5 top-2.5'
                          onClick={() => setSearchQuery("")}
                        >
                          <X className='h-4 w-4 text-muted-foreground' />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <div className='flex justify-between mb-2'>
                      <Label
                        htmlFor='price-range'
                        className='text-sm font-medium'
                      >
                        Price Range
                      </Label>
                      <span className='text-sm text-muted-foreground'>
                        {formatCurrency(priceRange[0])} -{" "}
                        {formatCurrency(priceRange[1])}
                      </span>
                    </div>
                    <Slider
                      id='price-range'
                      min={0}
                      max={3000000}
                      step={50000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>

                  {/* Engine Size */}
                  <div>
                    <div className='flex justify-between mb-2'>
                      <Label
                        htmlFor='engine-size'
                        className='text-sm font-medium'
                      >
                        Engine Size (cc)
                      </Label>
                      <span className='text-sm text-muted-foreground'>
                        {engineSizeRange[0]} - {engineSizeRange[1]}cc
                      </span>
                    </div>
                    <Slider
                      id='engine-size'
                      min={0}
                      max={2000}
                      step={100}
                      value={engineSizeRange}
                      onValueChange={setEngineSizeRange}
                    />
                  </div>

                  {/* Features */}
                  <div>
                    <Label className='text-sm font-medium mb-2 block'>
                      Features
                    </Label>
                    <div className='space-y-2 max-h-[200px] overflow-y-auto pr-2'>
                      {availableFeatures.map((feature) => (
                        <div
                          key={feature}
                          className='flex items-center space-x-2'
                        >
                          <Checkbox
                            id={`feature-${feature}`}
                            checked={selectedFeatures.includes(feature)}
                            onCheckedChange={() => toggleFeature(feature)}
                          />
                          <label
                            htmlFor={`feature-${feature}`}
                            className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                          >
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main content */}
          <div className='lg:w-3/4'>
            {/* Desktop category tabs and sort */}
            <div className='hidden lg:flex justify-between items-center mb-6'>
              <Tabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className='w-auto'
              >
                <TabsList>
                  {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Sort by' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='featured'>Featured</SelectItem>
                  <SelectItem value='price-low'>Price: Low to High</SelectItem>
                  <SelectItem value='price-high'>Price: High to Low</SelectItem>
                  <SelectItem value='newest'>Newest</SelectItem>
                  <SelectItem value='engine-size'>Engine Size</SelectItem>
                  <SelectItem value='power'>Power</SelectItem>
                  <SelectItem value='mileage'>Mileage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile category tabs */}
            <div className='lg:hidden mb-6'>
              <Tabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className='w-full'
              >
                <TabsList className='grid grid-cols-3 h-auto'>
                  {categories.slice(0, 6).map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className='py-2'
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Results count */}
            <div className='mb-6 text-sm text-muted-foreground'>
              Showing {filteredBikes.length}{" "}
              {filteredBikes.length === 1 ? "bike" : "bikes"}
              {/* Active filters */}
              {(selectedCategory !== "all" ||
                priceRange[0] > 0 ||
                priceRange[1] < 3000000 ||
                engineSizeRange[0] > 0 ||
                engineSizeRange[1] < 2000 ||
                selectedFeatures.length > 0 ||
                searchQuery) && (
                <div className='flex flex-wrap gap-2 mt-2'>
                  {selectedCategory !== "all" && (
                    <Badge
                      variant='outline'
                      className='flex items-center gap-1'
                    >
                      Category:{" "}
                      {categories.find((c) => c.id === selectedCategory)?.name}
                      <button onClick={() => setSelectedCategory("all")}>
                        <X className='h-3 w-3' />
                      </button>
                    </Badge>
                  )}

                  {(priceRange[0] > 0 || priceRange[1] < 3000000) && (
                    <Badge
                      variant='outline'
                      className='flex items-center gap-1'
                    >
                      Price: {formatCurrency(priceRange[0])} -{" "}
                      {formatCurrency(priceRange[1])}
                      <button onClick={() => setPriceRange([0, 3000000])}>
                        <X className='h-3 w-3' />
                      </button>
                    </Badge>
                  )}

                  {(engineSizeRange[0] > 0 || engineSizeRange[1] < 2000) && (
                    <Badge
                      variant='outline'
                      className='flex items-center gap-1'
                    >
                      Engine: {engineSizeRange[0]}cc - {engineSizeRange[1]}cc
                      <button onClick={() => setEngineSizeRange([0, 2000])}>
                        <X className='h-3 w-3' />
                      </button>
                    </Badge>
                  )}

                  {selectedFeatures.map((feature) => (
                    <Badge
                      key={feature}
                      variant='outline'
                      className='flex items-center gap-1'
                    >
                      {feature}
                      <button onClick={() => toggleFeature(feature)}>
                        <X className='h-3 w-3' />
                      </button>
                    </Badge>
                  ))}

                  {searchQuery && (
                    <Badge
                      variant='outline'
                      className='flex items-center gap-1'
                    >
                      Search: {searchQuery}
                      <button onClick={() => setSearchQuery("")}>
                        <X className='h-3 w-3' />
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Bikes grid */}
            {filteredBikes.length > 0 ? (
              <motion.div
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                layout
              >
                <AnimatePresence>
                  {filteredBikes.map((bike) => (
                    <motion.div
                      key={bike.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                      className='h-full'
                    >
                      <Card
                        className='overflow-hidden h-full flex flex-col cursor-pointer'
                        onClick={() =>
                          (window.location.href = `/bikes/${bike.id}`)
                        }
                      >
                        <div className='relative'>
                          <div className='aspect-[4/3] relative overflow-hidden'>
                            <Image
                              src={bike.image || "/placeholder.svg"}
                              alt={bike.name}
                              fill
                              className='object-cover transition-transform duration-300 hover:scale-105'
                            />
                          </div>
                          {bike.isNew && (
                            <Badge className='absolute top-2 right-2 bg-red-600'>
                              New
                            </Badge>
                          )}
                        </div>

                        <CardContent className='p-4 flex flex-col flex-grow'>
                          <div className='mb-2'>
                            <div className='flex justify-between items-start'>
                              <h3 className='font-bold text-lg'>{bike.name}</h3>
                              <span className='text-red-600 font-semibold'>
                                {formatCurrency(bike.price)}
                              </span>
                            </div>
                            <p className='text-sm text-muted-foreground capitalize'>
                              {bike.category}
                            </p>
                          </div>

                          <div className='grid grid-cols-2 gap-2 text-sm mb-4'>
                            <div className='flex flex-col'>
                              <span className='text-muted-foreground'>
                                Engine
                              </span>
                              <span>{bike.engineSize}cc</span>
                            </div>
                            <div className='flex flex-col'>
                              <span className='text-muted-foreground'>
                                Power
                              </span>
                              <span>{bike.power} HP</span>
                            </div>
                            {bike.mileage && (
                              <div className='flex flex-col'>
                                <span className='text-muted-foreground'>
                                  Mileage
                                </span>
                                <span>{bike.mileage} KMPL</span>
                              </div>
                            )}
                            <div className='flex flex-col'>
                              <span className='text-muted-foreground'>
                                Weight
                              </span>
                              <span>{bike.weight} kg</span>
                            </div>
                          </div>

                          <div className='flex flex-wrap gap-1 mb-4'>
                            {bike.features.slice(0, 3).map((feature) => (
                              <Badge
                                key={feature}
                                variant='secondary'
                                className='text-xs'
                              >
                                {feature}
                              </Badge>
                            ))}
                            {bike.features.length > 3 && (
                              <Badge variant='outline' className='text-xs'>
                                +{bike.features.length - 3} more
                              </Badge>
                            )}
                          </div>

                          <div className='mt-auto flex gap-2'>
                            <Link href={`/bikes/${bike.id}`} className='flex-1'>
                              <Button className='w-full bg-red-600 hover:bg-red-700'>
                                Details
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className='text-center py-12 border rounded-lg'>
                <h3 className='text-lg font-medium mb-2'>No bikes found</h3>
                <p className='text-muted-foreground mb-4'>
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button variant='outline' onClick={resetAllFilters}>
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
