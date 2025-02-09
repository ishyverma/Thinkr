import FAQ from '@/components/main/faq';
import Features from '@/components/main/features';
import Footer from '@/components/main/footer';
import { GridBackgroundDemo } from '@/components/main/grid-background';
import Information from '@/components/main/information';
import Navbar from '@/components/main/navbar';

export default function Chat() {

  return (
    <div className='relative'>
      <Navbar />
      <GridBackgroundDemo />
      <Information />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
}