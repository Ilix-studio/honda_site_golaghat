// Sample bike models
export const bikeModels = [
  { id: "cbr1000rr", name: "CBR1000RR Fireblade", category: "Sport" },
  { id: "cbr600rr", name: "CBR600RR", category: "Sport" },
  { id: "cbr500r", name: "CBR500R", category: "Sport" },
  { id: "africatwin", name: "Africa Twin", category: "Adventure" },
  { id: "nc750x", name: "NC750X", category: "Adventure" },
  { id: "cb500x", name: "CB500X", category: "Adventure" },
  { id: "rebel1100", name: "Rebel 1100", category: "Cruiser" },
  { id: "rebel500", name: "Rebel 500", category: "Cruiser" },
  { id: "rebel300", name: "Rebel 300", category: "Cruiser" },
  { id: "goldwing", name: "Gold Wing Tour", category: "Touring" },
  { id: "nt1100", name: "NT1100", category: "Touring" },
  { id: "cb1000r", name: "CB1000R", category: "Naked" },
  { id: "cb650r", name: "CB650R", category: "Naked" },
  { id: "cb300r", name: "CB300R", category: "Naked" },
];

// Available dealerships/service centers
export const serviceLocations = [
  {
    id: "service1",
    name: "Honda Service Center Downtown",
    address: "123 Main St, New York, NY 10001",
  },
  {
    id: "service2",
    name: "Honda Motorcycle Service",
    address: "456 Park Ave, Los Angeles, CA 90001",
  },
  {
    id: "service3",
    name: "City Honda Service",
    address: "789 Market St, Chicago, IL 60007",
  },
  {
    id: "service4",
    name: "Metro Honda Service Center",
    address: "321 Oak Rd, Houston, TX 77001",
  },
  {
    id: "service5",
    name: "Capital Honda Service",
    address: "555 Pine Blvd, Miami, FL 33101",
  },
];

// Available time slots
export const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

// Service types
export const serviceTypes = [
  {
    id: "regular",
    name: "Regular Maintenance",
    description: "Oil change, filter replacement, and basic inspection",
    estimatedTime: "1-2 hours",
    price: "$150-$250",
  },
  {
    id: "major",
    name: "Major Service",
    description:
      "Comprehensive service including valve clearance check, cooling system flush, and more",
    estimatedTime: "3-5 hours",
    price: "$350-$600",
  },
  {
    id: "tires",
    name: "Tire Replacement",
    description: "Removal and installation of new tires, including balancing",
    estimatedTime: "1-2 hours",
    price: "$250-$450 (plus tire cost)",
  },
  {
    id: "diagnostic",
    name: "Diagnostic Check",
    description:
      "Computer diagnostic to identify issues with electronic systems",
    estimatedTime: "1 hour",
    price: "$100-$150",
  },
  {
    id: "repair",
    name: "Repair Service",
    description: "General repairs for specific issues with your motorcycle",
    estimatedTime: "Varies",
    price: "Varies based on issue",
  },
];

// Additional services
export const additionalServices = [
  { id: "wash", name: "Motorcycle Wash & Detail", price: "$50" },
  { id: "brake", name: "Brake Fluid Change", price: "$80" },
  { id: "chain", name: "Chain Adjustment & Lubrication", price: "$45" },
  {
    id: "battery",
    name: "Battery Check & Replacement",
    price: "$25 (check) / $120+ (replacement)",
  },
  { id: "suspension", name: "Suspension Check & Adjustment", price: "$75" },
];
