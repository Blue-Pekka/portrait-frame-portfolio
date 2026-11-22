import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Academics } from "@/components/site/Academics";
import { Activities } from "@/components/site/Activities";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammad Abdul Raqeeb — Academics, Activities & Contact" },
      {
        name: "description",
        content:
          "Class XII MPC student from Hyderabad: academic record, a published research paper, robotics projects, competitions and leadership.",
      },
      { property: "og:title", content: "Mohammad Abdul Raqeeb — Student portfolio" },
      {
        property: "og:description",
        content: "96% in Class X, 98% in Class XI, a research paper on suspension energy harvesting, and robotics projects.",
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
      <Nav variant="home" />
      <main id="main" ref={mainRef}>
        <Hero />
        <Academics />
        <Activities />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
