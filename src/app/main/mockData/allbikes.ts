import activa6G from "../../../assets/scooty/activa6G.webp";
import acttivaDontknow from "../../../assets/scooty/activaaa.avif";

// Define the bike interface
export interface Bike {
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

export const allBikes: Bike[] = [
  // Scooty/Scooters
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
    image: activa6G.src,
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
    image: activa6G.src,
    year: 2023,
  },
  {
    id: "pcx160",
    name: "PCX160",
    category: "scooty",
    price: 179900,
    engineSize: 160,
    power: 16,
    weight: 129,
    mileage: 48,
    features: [
      "LED Lights",
      "Smart Key",
      "Storage Compartment",
      "USB Charging",
    ],
    image: acttivaDontknow.src,
    year: 2023,
    isNew: true,
  },
  {
    id: "activa125",
    name: "Activa 125",
    category: "scooty",
    price: 97500,
    engineSize: 125,
    power: 8,
    weight: 111,
    mileage: 55,
    features: ["Smart Power (eSP)", "LED Headlamp", "Mobile Charging Socket"],
    image: activa6G.src,
    year: 2023,
  },
  {
    id: "dio125",
    name: "Dio 125",
    category: "scooty",
    price: 90900,
    engineSize: 125,
    power: 8,
    weight: 107,
    mileage: 52,
    features: ["Fully Digital Meter", "LED Lights", "USB Charging"],
    image: activa6G.src,
    year: 2023,
  },
];
