import { BookServiceForm } from "../main/book-service-form";
import { Footer } from "../main/footer";
import { Header } from "../main/header";

export default function BookServicePage() {
  return (
    <main className='min-h-screen'>
      <Header />
      <div className='pt-24 pb-20 bg-gray-50'>
        <div className='container px-4 md:px-6'>
          <BookServiceForm />
        </div>
      </div>
      <Footer />
    </main>
  );
}
