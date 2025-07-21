import HeroSection from "@/components/ui/HeroSection";
import FeaturedCategories from "@/components/ui/FeaturedCategories";
import BestSellers from "@/components/ui/BestSellers";
import WhyChooseUs from "@/components/ui/WhyChooseUs";
import Testimonials from "@/components/ui/Testimonials";
import NewsletterCTA from "@/components/ui/NewsletterCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <BestSellers />
      <WhyChooseUs />
      <Testimonials />
      <NewsletterCTA />
    </>
  );
}
