import { Header } from "./main/header";
import { HeroSection } from "./main/hero-section";
import { BikeSelector } from "./main/bike-selector";
import { EmiCalculator } from "./main/emi-calculator";

import { Footer } from "./main/footer";
import { FeaturesSection } from "./main/bike-features";

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col'>
      <Header />
      <HeroSection />
      <BikeSelector />
      <EmiCalculator />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
// promoting bank offers on my website
// applying for financing offered by banks on website
