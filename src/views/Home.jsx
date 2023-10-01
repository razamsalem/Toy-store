import { ToyChart } from "../cmps/ToyChart";
import toyJoyTelAvivImage from '../assets/img/tel-aviv.jpg';
import { Link } from "react-router-dom";

export function Home() {
    return (
        <section className="grid-container">
            {/* <div className="home-image">
                <img src={toyJoyTelAvivImage} alt="ToyJoy Tel Aviv branch" />
            </div> */}
            <div className="home">
                <div className="home-content">
                    <h1>Welcome to <span className="logo-clr">ToyJoy</span></h1>
                    <h4>Experience the Magic of Toys!</h4>
                    <p>At <span className="logo-clr">ToyJoy</span>, we believe that toys have the power to spark imagination, create memories, and bring joy to people of all ages. Explore our wide range of toys that cater to every interest and age group.</p>
                    <div className="card">
                        <h3>Why Toy<span className="logo-clr">Joy</span>?</h3>
                        <p>At ToyJoy, you can enjoy a wide variety of toys:</p>
                        <ul className="clean-list">
                            <li><span className="logo-clr">Unique</span>  and Innovative Toys</li>
                            <li><span className="logo-clr">Quality</span> and Safety Assured</li>
                            <li><span className="logo-clr">Expertly</span> Curated Selection</li>
                            <li><span className="logo-clr">Global</span> Community of Toy Enthusiasts</li>
                            <li><span className="logo-clr">Exceptional</span> Customer Service</li>
                        </ul>
                        <div className="app-info-display">
                            <ToyChart />
                        </div>
                    </div>
                    <p>Discover why ToyJoy is the ultimate destination for toy enthusiasts. Join our global community and experience the joy of play like never before.</p>
                    <div className="link-button">
                        <Link className="about-link" to="/about">Learn More</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
