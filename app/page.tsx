import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import BuildWorkflow from "@/components/BuildWorkflow";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { loadWorkMedia } from "@/lib/work-media";

export default async function Home() {
  const media = await loadWorkMedia();
  return (
    <>
      <Nav />
      <main className="relative z-10 flex-1">
        <Hero />
        <Work {...media} />
        <Stack />
        <BuildWorkflow />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
