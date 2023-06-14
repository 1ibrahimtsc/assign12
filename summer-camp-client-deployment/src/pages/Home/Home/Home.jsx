import { Helmet } from "react-helmet-async";
import SliderHome from "../Slider/SliderHome";
import Popularclasses from "../Popularclasses/Popularclasses";
import Popularinstructors from "../Popularinstructors/Popularinstructors";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Summer Camp School | Home</title>
      </Helmet>
      <SliderHome></SliderHome>
      <Popularclasses></Popularclasses>
      <Popularinstructors></Popularinstructors>

      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
