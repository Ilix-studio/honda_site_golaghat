import cbr1000rrImage from "../../../assets/cbr-1000-rrr.jpg";
import cbr600 from "../../../assets/cbr600,.jpg";
import cbr500 from "../../../assets/cbr500.jpeg";

export const bikeCategories = [
  {
    id: "sport",
    name: "Sport",
    bikes: [
      {
        id: "cbr1000rr",
        name: "CBR1000RR Fireblade",
        image: cbr1000rrImage.src,
        price: "₹18,00,000",
      },
      {
        id: "cbr600rr",
        name: "CBR600RR",
        image: cbr600.src,
        price: "₹12,00,000",
      },
      {
        id: "cbr500r",
        name: "CBR500R",
        image: cbr500.src,
        price: "₹4,99,000",
      },
    ],
  },
  {
    id: "adventure",
    name: "Adventure",
    bikes: [
      {
        id: "africatwin",
        name: "Africa Twin",
        image: "/placeholder.svg?height=400&width=600",
        price: "₹14,399",
      },
      {
        id: "nc750x",
        name: "NC750X",
        image: "/placeholder.svg?height=400&width=600",
        price: "₹8,499",
      },
      {
        id: "cb500x",
        name: "CB500X",
        image: "/placeholder.svg?height=400&width=600",
        price: "₹6,999",
      },
    ],
  },
  {
    id: "cruiser",
    name: "Cruiser",
    bikes: [
      {
        id: "rebel1100",
        name: "Rebel 1100",
        image: "/placeholder.svg?height=400&width=600",
        price: "₹9,299",
      },
      {
        id: "rebel500",
        name: "Rebel 500",
        image: "/placeholder.svg?height=400&width=600",
        price: "₹6,299",
      },
      {
        id: "rebel300",
        name: "Rebel 300",
        image: "/placeholder.svg?height=400&width=600",
        price: "₹4,599",
      },
    ],
  },
];
