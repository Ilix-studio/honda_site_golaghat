import { Header } from "../main/header";
import { Footer } from "../main/footer";
import { TestRideForm } from "../main/test-ride-form";

export default function TestRidePage() {
  return (
    <main className='min-h-screen'>
      <Header />
      <div className='pt-24 pb-20 bg-gray-50'>
        <div className='container px-4 md:px-6'>
          <TestRideForm />
        </div>
      </div>
      <Footer />
    </main>
  );
}
