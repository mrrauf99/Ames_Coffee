import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { Menu } from "@/components/sections/Menu";
import { Story } from "@/components/sections/Story";
import { Gallery } from "@/components/sections/Gallery";
import { Visit } from "@/components/sections/Visit";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Highlights />
        <Menu />
        <Story />
        <Gallery />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
