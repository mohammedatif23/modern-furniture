/* import Navbar from "../components/Navbar";
 */import Hero from "../components/Hero";
import Categories from "../components/Categories";
/* import FeaturedProducts from "../components/FeaturedProducts"; */
import BlogSection from "../components/BlogSection";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

export default function Home() {
  return (
    <>
{/*       <Navbar />
 */}      <Hero />
      <Categories />
      <WhyChooseUs />
      <BlogSection />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}