
import Features from "../components/Features.jsx";
import Navbar from "../components/Navbar.jsx";
import Review from "../components/Review.jsx";
import Footer from "../components/Footer.jsx";
import Service from "../components/Service.jsx";
import Hero from "../components/Hero.jsx";
import Steps from "../components/Steps.jsx";

const Home = () =>{
    return(
        <div className="flex flex-column items-center justify-content-center min-vh-100">
            <Navbar />
            <Hero />
            <Features />
            <Service/>
            <Steps/>
            <Review/>
            <Footer/>
        </div>
    )
}
export default Home;