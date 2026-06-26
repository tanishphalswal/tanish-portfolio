import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import BuildWorkflow from "@/components/BuildWorkflow";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative z-10 flex-1">
        <Hero />
        <Stack />
        <BuildWorkflow />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
