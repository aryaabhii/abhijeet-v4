import Hero from "@/components/home/Hero";
import Quote from "@/components/home/Quote";
import Projects from "@/components/home/Project";
import Skills from "@/components/home/Skills";
import About from "@/components/home/About";
import Contact from "@/components/home/HireMe";
import Journey from "@/components/home/Journey"; 
import VideoGallery from "@/components/home/VideoList";

export default function Home( ) {
  return (
    <main className="pb-20">
      <Hero />
      <Quote />
      <Journey />
      <Projects />
      <Skills />
      <About />
      <Contact /> 
      <VideoGallery />
    </main>
  );
}
