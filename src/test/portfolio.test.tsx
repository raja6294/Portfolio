import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import App from "@/App";
import Index from "@/pages/Index";

describe("Navbar Component", () => {
  it("renders location Kolkata, India", () => {
    render(<Navbar />);
    expect(screen.getByText(/Kolkata, India/i)).toBeInTheDocument();
  });

  it("renders main desktop navigation items", () => {
    render(<Navbar />);
    expect(screen.getAllByText("Home")[0]).toBeInTheDocument();
    expect(screen.getAllByText("About")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Projects")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Achievements")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Contact")[0]).toBeInTheDocument();
  });

  it("toggles mobile menu when clicked", () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText("Toggle navigation menu");
    fireEvent.click(menuButton);
    expect(screen.getAllByText("Home").length).toBeGreaterThan(1);
  });
});

describe("Hero Component", () => {
  it("renders Raja Banerjee heading and correct greeting", () => {
    render(<Hero />);
    expect(screen.getByText(/Hi, I'm Raja Banerjee/i)).toBeInTheDocument();
  });

  it("renders professional description", () => {
    render(<Hero />);
    expect(
      screen.getByText(
        /MERN Stack Developer building modern, scalable web applications, exploring AI-powered solutions and blockchain technology/i
      )
    ).toBeInTheDocument();
  });

  it("renders circular profile image with alt text", () => {
    render(<Hero />);
    const img = screen.getByAltText("Raja Banerjee");
    expect(img).toBeInTheDocument();
  });

  it("renders primary and secondary CTA buttons", () => {
    render(<Hero />);
    expect(screen.getByText("View My Work")).toBeInTheDocument();
    expect(screen.getByText("View Resume")).toBeInTheDocument();
  });

  it("renders social links with appropriate titles/aria-labels", () => {
    render(<Hero />);
    expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });
});

describe("About Component", () => {
  it("renders about heading and education information", () => {
    render(<About />);
    expect(screen.getByText(/Engineering scalable web apps with precision & purpose/i)).toBeInTheDocument();
    expect(screen.getAllByText(/JIS College of Engineering/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/GPA: 8.56\/10/i)).toBeInTheDocument();
  });
});

describe("Skills Component", () => {
  it("renders skill categories", () => {
    render(<Skills />);
    expect(screen.getByText("Tech Stack & Expertise")).toBeInTheDocument();
    expect(screen.getByText("Frontend Engineering")).toBeInTheDocument();
    expect(screen.getByText("Backend & Databases")).toBeInTheDocument();
    expect(screen.getByText("Programming Languages")).toBeInTheDocument();
    expect(screen.getByText("AI & Emerging Tech")).toBeInTheDocument();
  });
});

describe("Projects Component", () => {
  it("renders featured projects including QueryAI, RakshaNetra, JourneyPal", () => {
    render(<Projects />);
    expect(screen.getByText(/Featured Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/QueryAI – Business Intelligence Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/RakshaNetra – Smart Surveillance System/i)).toBeInTheDocument();
    expect(screen.getByText(/JourneyPal – AI Travel Planner/i)).toBeInTheDocument();
  });
});

describe("Achievements Component", () => {
  it("renders hackathon achievements and education timeline", () => {
    render(<Achievements />);
    expect(screen.getByText("Achievements & Education")).toBeInTheDocument();
    expect(screen.getByText(/1st Position – CRAZY BUILD Hackathon/i)).toBeInTheDocument();
    expect(screen.getByText(/Selected for Smart India Hackathon/i)).toBeInTheDocument();
    expect(screen.getByText(/NPTEL Elite Certification/i)).toBeInTheDocument();
    expect(screen.getByText("B.Tech in Information Technology")).toBeInTheDocument();
  });
});

describe("Contact Component", () => {
  it("renders contact form and information", () => {
    render(<Contact />);
    expect(screen.getByText(/Let's build something together/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your.email@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tell me about your project, idea, or role...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send Message/i })).toBeInTheDocument();
  });
});

describe("Footer Component", () => {
  it("renders copyright and location", () => {
    render(<Footer />);
    expect(screen.getByText(/Raja Banerjee · Kolkata, India/i)).toBeInTheDocument();
  });
});

describe("Index Page Complete Mount", () => {
  it("renders the entire portfolio page without throwing errors", () => {
    render(<Index />);
    expect(screen.getByText(/Hi, I'm Raja Banerjee/i)).toBeInTheDocument();
  });
});

describe("App notification surfaces", () => {
  it("does not mount floating toast viewports", () => {
    render(<App />);

    expect(document.querySelector(".toaster")).toBeNull();
    expect(document.querySelector("[data-radix-toast-viewport]")).toBeNull();
  });
});
