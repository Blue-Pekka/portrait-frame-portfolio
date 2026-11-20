import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Loader } from "@/components/site/Loader";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Work } from "@/components/site/Work";
import { Initiatives } from "@/components/site/Initiatives";
import { Research } from "@/components/site/Research";
import { Achievements } from "@/components/site/Achievements";
import { Skills } from "@/components/site/Skills";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammad Abdul Raqeeb — Building Ideas. Engineering Possibilities." },
      {
        name: "description",
        content:
          "Aspiring engineer and researcher from Hyderabad exploring robotics, AI, computer vision and technology for meaningful impact.",
      },
      { property: "og:title", content: "Mohammad Abdul Raqeeb — Engineer, Researcher & Innovator" },
      {
        property: "og:description",
        content: "ESP32 rover, gesture-controlled robotics, suspension energy research and accessibility initiatives.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const mainRef = useRef<HTMLElement>(null);
  useReveal(mainRef);

  return (
    <>
      <Loader />
      <Nav variant="home" />
      <main id="main" ref={mainRef}>
        <Hero />
        <About />
        <Work />
        <Initiatives />
        <Research />
        <Achievements />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
