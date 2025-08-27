import { BenefitsSection } from "../../components/benefits-section";
import { EarlyAccessSection } from "../../components/early-access-section";
import { FooterSection } from "../../components/footer-section";
import { HeroSection } from "../../components/hero-section";
import { HowItWorksSection } from "../../components/how-it-works-section";
import Navbar from "../../components/navbar";
import { TestimonialsSection } from "../../components/testimonials-sections";
import "./globals.css"; 


export default function Home() {
  return (
     <main className="min-h-screen ">
      <Navbar />

       <header>
        <HeroSection />
      </header>
      
      <section aria-label="Benefits and features">
        <BenefitsSection />
      </section>
      
      <section aria-label="How our process works">
        <HowItWorksSection />
      </section>
      
      <section aria-label="Early access signup">
        <EarlyAccessSection />
      </section>
      
      <section aria-label="Success stories and testimonials">
        <TestimonialsSection />
      </section>
      
      <FooterSection />
      
    </main>
  );
}