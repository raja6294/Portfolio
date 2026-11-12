import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Contact } from "@/components/Contact";
import * as api from "@/services/api";

// Helper component to inspect theme context
function ThemeTester() {
  const { theme, isDark, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-name">{theme}</span>
      <span data-testid="is-dark">{isDark ? "yes" : "no"}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

describe("Global Theme Switching", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("defaults to dark mode and applies dark class to root HTML element", () => {
    render(
      <ThemeProvider>
        <ThemeTester />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-name").textContent).toBe("dark");
    expect(screen.getByTestId("is-dark").textContent).toBe("yes");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("toggles from dark to light mode and updates root HTML and localStorage", () => {
    render(
      <ThemeProvider>
        <ThemeTester />
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggleBtn = screen.getByRole("button", { name: /Toggle theme/i });
    fireEvent.click(toggleBtn);

    expect(screen.getByTestId("theme-name").textContent).toBe("light");
    expect(screen.getByTestId("is-dark").textContent).toBe("no");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("toggles back from light to dark mode correctly", () => {
    render(
      <ThemeProvider>
        <ThemeTester />
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggleBtn = screen.getByRole("button", { name: /Toggle theme/i });
    // Click 1: dark -> light
    fireEvent.click(toggleBtn);
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    // Click 2: light -> dark
    fireEvent.click(toggleBtn);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("restores light theme from localStorage on initial load", () => {
    localStorage.setItem("theme", "light");

    render(
      <ThemeProvider>
        <ThemeTester />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-name").textContent).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});

describe("Contact Form Validation & Submission", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows validation error on empty submission without calling api", async () => {
    const submitSpy = vi.spyOn(api, "submitContactForm");

    render(
      <ThemeProvider>
        <Contact />
      </ThemeProvider>
    );

    const submitBtn = screen.getByRole("button", { name: /Send Message/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it("shows validation error on invalid email address", async () => {
    const submitSpy = vi.spyOn(api, "submitContactForm");

    render(
      <ThemeProvider>
        <Contact />
      </ThemeProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Your Name"), {
      target: { value: "Raja" },
    });
    fireEvent.change(screen.getByPlaceholderText("your.email@example.com"), {
      target: { value: "notanemail" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tell me about your project, idea, or role..."), {
      target: { value: "Hello world" },
    });

    const submitBtn = screen.getByRole("button", { name: /Send Message/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText("Please provide a valid email address")).toBeInTheDocument();
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it("submits successfully and resets form when EmailJS confirms delivery", async () => {
    const submitSpy = vi.spyOn(api, "submitContactForm").mockResolvedValue({
      success: true,
      message: "Message delivered successfully. I will get back to you soon.",
    });

    render(
      <ThemeProvider>
        <Contact />
      </ThemeProvider>
    );

    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("your.email@example.com");
    const messageInput = screen.getByPlaceholderText("Tell me about your project, idea, or role...");

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Valid message content" } });

    const submitBtn = screen.getByRole("button", { name: /Send Message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@example.com",
        message: "Valid message content",
      });
    });

    expect(
      await screen.findByText("Message delivered successfully. I will get back to you soon.")
    ).toBeInTheDocument();

    // Form inputs must be cleared on success
    expect((nameInput as HTMLInputElement).value).toBe("");
    expect((emailInput as HTMLInputElement).value).toBe("");
    expect((messageInput as HTMLTextAreaElement).value).toBe("");
  });

  it("displays meaningful error when EmailJS fails and does NOT show false success", async () => {
    const errorText = "Email delivery failed (Invalid Grant): The Gmail account connected to your EmailJS service needs to be reconnected.";
    const submitSpy = vi.spyOn(api, "submitContactForm").mockRejectedValue(new Error(errorText));

    render(
      <ThemeProvider>
        <Contact />
      </ThemeProvider>
    );

    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("your.email@example.com");
    const messageInput = screen.getByPlaceholderText("Tell me about your project, idea, or role...");

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(messageInput, { target: { value: "Valid message content" } });

    const submitBtn = screen.getByRole("button", { name: /Send Message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalled();
    });

    // Meaningful error alert must be visible
    expect(await screen.findByRole("alert")).toHaveTextContent(/Invalid Grant/i);
    // Success alert must NOT be present
    expect(screen.queryByRole("status")).toBeNull();

    // Form inputs must NOT be reset on failure
    expect((nameInput as HTMLInputElement).value).toBe("Test User");
  });
});

