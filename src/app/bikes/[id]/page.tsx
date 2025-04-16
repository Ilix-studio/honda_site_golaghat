import { BikeDetail } from "@/app/main/bike-detail";
import { Footer } from "@/app/main/footer";
import { Header } from "@/app/main/header";

export default function BikeDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className='min-h-screen'>
      <Header />
      <div className='pt-16'>
        <BikeDetail bikeId={params.id} />
      </div>
      <Footer />
    </main>
  );
}
