import Hero2 from "./component/manifesto1";
import HeroSection from "./component/heroSection";
import Service1 from "./component/service1";
import GraphicSection from "./component/service2";
// import Service2 from "./components/service2";
import Service3 from "./component/service3";
import ServiceStack from "./component/servicesUI";
// import Testimonials from "./component/testimonials";
import WebShowcase from "./component/webShowcase";
import FAQSection from "./component/faq";



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center overflow-x-hidden">
      <div className="h-screen w-screen"></div>
      <div className="fixed inset-0"> <HeroSection /> </div>
      <Hero2 />
      <ServiceStack />
      <Service1 />
      <GraphicSection />
      <Service3 />
      <WebShowcase />
      <FAQSection />
    </div>
  );
}
