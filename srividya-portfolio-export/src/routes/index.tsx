import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Srividya Kambhampati — MERN Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Srividya Kambhampati, a MERN Stack Developer building fast, accessible, production-grade web applications with React, Node.js, Express and MongoDB.",
      },
      { property: "og:title", content: "Srividya Kambhampati — MERN Stack Developer" },
      {
        property: "og:description",
        content:
          "Full-stack engineer crafting elegant web experiences with the MERN stack. Explore projects, skills, and experience.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: Portfolio,
});
