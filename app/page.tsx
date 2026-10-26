import Carousel from "./components/caresoul";
import FeaturesSection from "./components/features";
import NewArrivals from "./components/arrivals";
import MidPageBanner from "./components/banner";
import AboutSection from "./components/aboutsection";

export default function Home() {
  return (
   <div>
    <Carousel/>
     <FeaturesSection/>
     <AboutSection/>
     <NewArrivals/>
     <MidPageBanner/> 
   </div>
  );
}
