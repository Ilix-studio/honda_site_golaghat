import { Footer } from "../main/footer";
import { Header } from "../main/header";

import { ViewAllBikes } from "../main/view-all-bikes";

export default function ViewAllPage() {
  return (
    <main className='min-h-screen'>
      <Header />
      <div className='pt-16'>
        <ViewAllBikes />
      </div>
      <Footer />
    </main>
  );
}
