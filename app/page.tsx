import Hero2 from "./component/manifesto1";
import HeroSection from "./component/heroSection";
import Service1 from "./component/service1";
// import GraphicSection from "./component/service2";
import Service3 from "./component/service3";
import ServiceStack from "./component/servicesUI";
// import WebShowcase from "./component/webShowcase";
import FAQSection from "./component/faq";
import SampleTestimonials from "./extraAnimations/sampletestimonials";
import HeroLoopBoxes from "./component/heroUI";


export default function Home() {
  return (
    <div className=" bg-blue-500 ">
      <div className="h-screen w-screen"></div>
      <div className="fixed inset-0"><HeroSection /></div>
      <div className="md:h-60 h-[100px] w-full bg-blue-500 overflow-hidden [clip-path:polygon(0_50%,100%_0,100%_100%,0_100%)] -mb-[2px]"></div>
      <Hero2 />
      <ServiceStack />
      {/* <div className="relative w-screen bg-blue-200">
        <div className="h-40 w-screen bg-noise [clip-path:polygon(100%_80%,100%_0,0_0,0_10%)]"></div>
      </div> */}
      <HeroLoopBoxes />
      <Service1 />
      {/* <GraphicSection /> */}
      <Service3 />
      {/* <WebShowcase /> */}
      <SampleTestimonials />
      <FAQSection />
    </div>
  );
}
