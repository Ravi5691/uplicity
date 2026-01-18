import Hero2 from "./component/her02";
import HeroSection from "./component/heroSection";
import Service1 from "./component/service1";
import GraphicSection from "./component/service2";
// import Service2 from "./components/service2";
import Service3 from "./component/service3";
import ServiceStack from "./component/servicesUI";
import Testimonials from "./component/testimonials";
import WebShowcase from "./component/webShowcase";



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto hide-scroll">
      <HeroSection />
      <Hero2/>
      <div className="h-[20vh] w-screen bg-noise"></div>
      <ServiceStack />
      <div className="h-[20vh] w-screen bg-noise"></div>
      <Service1 />
      <div className="h-[70vh] w-screen"></div>
      <div className="h-[10vh] w-screen bg-noise"></div>
      <GraphicSection/>
      <div className="h-[20vh] w-screen bg-noise"></div>
      <Service3 />
      <WebShowcase />
      <div className="h-[20vh] w-screen bg-noise"></div>
      <Testimonials/>
    </div>
  );
}
