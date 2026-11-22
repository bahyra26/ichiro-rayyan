import { DetailedReport } from './components/DetailedReport';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { PerformanceResults } from './components/PerformanceResults';
import { RegionVideoGrid } from './components/RegionVideoGrid';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0E27] text-[#F4F2F6]">
      <Navbar />
      <main>
        <Hero />
        <RegionVideoGrid />
        <PerformanceResults />
        <DetailedReport />
      </main>
      <Footer />
    </div>
  );
}
