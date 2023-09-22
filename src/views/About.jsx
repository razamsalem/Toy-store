import React, { useState } from "react";
import { GoogleMap } from "../cmps/GoogleMap";
import { ToyButton } from "../cmps/ToyButton";

import toyJoyTelAvivImage from '../assets/img/tel-aviv.jpg'
import toyJoyTokyoImage from '../assets/img/tokyo.jpeg'
import toyJoyMiamiImage from '../assets/img/miami.jpg'
import toyJoyLondonImage from '../assets/img/london.jpg'
import toyJoyMexicoImage from '../assets/img/mexico.jpeg'

export function About() {
    const [mapCenter, setMapCenter] = useState({ lat: 32.0853, lng: 34.7818 })

    function centerOnTelAviv() {
        setMapCenter({ lat: 32.0853, lng: 34.7818 })
    }

    function centerOnTokyo() {
        setMapCenter({ lat: 35.724158, lng: 139.720502 })
    }

    function centerOnMiami() {
        setMapCenter({ lat: 25.861681, lng: -80.191788 })
    }

    function centerOnLondon() {
        setMapCenter({ lat: 51.5072, lng: 0.1276 })
    }

    function centerOnMexico() {
        setMapCenter({ lat: 20.648775, lng: -87.083798 })
    }

    return (
        <section className="grid-container">
            <div className="about">
                <h1><span style={{ fontSize: '34px' }}><span style={{ color: '#333' }}>Toy</span>Joy</span></h1>

                <h1>Your Global Toy Wonderland</h1>
                

                <p>Welcome to ToyJoy, your ultimate destination for joy, wonder, and a world of toys! At ToyJoy, we believe in the power of play, imagination, and creating cherished memories that last a lifetime. With branches spanning across five continents, our mission is to spread happiness to every corner of the globe.</p>

                <p> Our Story Founded in the heart of Tel Aviv, ToyJoy embarked on a journey to redefine the way the world experiences toys. Over the years, we've grown into a global family of toy enthusiasts, each dedicated to curating the finest selection of toys from all over the world. From educational treasures to the latest trends, ToyJoy is your gateway to endless fun and discovery. </p>

                <h1>A World of Toys at Your Fingertips</h1>

                <p>With branches in Tel Aviv, Tokyo, Miami, London, and Mexico City, ToyJoy offers a diverse range of toys that cater to children of all ages and interests.Whether you're seeking the perfect gift for a birthday, holiday, or simply want to ignite your child's imagination, we have something for everyone. </p>

                <h1>Our Commitment to Quality</h1>

                <p>Quality and safety are at the heart of everything we do.We meticulously select toys from trusted brands, ensuring they meet the highest industry standards for safety and durability.When you shop at ToyJoy, you can have peace of mind knowing that your child's well-being is our top priority. </p>

                <h1> A Place for Everyone </h1>

                <p> ToyJoy isn't just a store; it's a place where families come together, friendships are forged, and dreams take flight.Our welcoming and knowledgeable staff are here to assist you, making your shopping experience memorable and stress - free. Community and Giving Back We believe in giving back to the communities we serve.ToyJoy actively engages in charitable initiatives to bring smiles to the faces of children in need.Through partnerships with local organizations, we strive to make the world a better place, one toy at a time.</p>

                <h1> Join the ToyJoy Family </h1>

                <p>At ToyJoy, we're more than just a toy store. We're a global community of parents, grandparents, caregivers, and children who share a common love for play and exploration.Join us on this exciting adventure, and let's create moments of joy together. Discover the magic of ToyJoy today.Visit one of our branches and experience the wonder of toys like never before.It's more than just shopping; it's an adventure waiting to unfold.ToyJoy - where imagination knows no bounds! </p>

                <div className="branch-cards">
                    <div className="branch-card">
                        <img src={toyJoyTelAvivImage} alt="ToyJoy Tel Aviv" />
                        <h3>Toy<span className="logo-clr">Joy</span> Tel Aviv</h3>
                        <p>Explore the wonders of our Tel Aviv branch, where imagination knows no bounds. We offer a wide selection of toys for all ages.</p>
                    </div>

                    <div className="branch-card">
                        <img src={toyJoyTokyoImage} alt="ToyJoy Tokyo" />
                        <h3>Toy<span className="logo-clr">Joy</span> Tokyo</h3>
                        <p>Discover the magic of ToyJoy in Tokyo. Our branch in Japan is filled with unique and innovative toys that will delight every child.</p>
                    </div>

                    <div className="branch-card">
                        <img src={toyJoyMiamiImage} alt="ToyJoy Miami" />
                        <h3>Toy<span className="logo-clr">Joy</span> Miami</h3>
                        <p>Visit our Miami branch and experience the joy of toy shopping. We have something special for every member of your family.</p>
                    </div>

                    <div className="branch-card">
                        <img src={toyJoyLondonImage} alt="ToyJoy London" />
                        <h3>Toy<span className="logo-clr">Joy</span> London</h3>
                        <p>ToyJoy London is where dreams come true. Explore our vast selection of toys, from classic favorites to the latest trends.</p>
                    </div>

                    <div className="branch-card">
                        <img src={toyJoyMexicoImage} alt="ToyJoy Mexico" />
                        <h3>Toy<span className="logo-clr">Joy</span> Mexico</h3>
                        <p>Join us in Mexico City at ToyJoy and experience the joy of play. Our branch is a place where families come together.</p>
                    </div>
                </div>

                <div className="map-container" >
                    <div className="map-buttons">
                        <ToyButton func={centerOnLondon} size={'small'} txt={'ToyJoy London'} marginBlock={'5px'} />
                        <ToyButton func={centerOnMiami} size={'small'} txt={'ToyJoy Miami'} marginBlock={'5px'} />
                        <ToyButton func={centerOnTelAviv} size={'small'} txt={'ToyJoy Tel Aviv'} marginBlock={'5px'} />
                        <ToyButton func={centerOnMexico} size={'small'} txt={'ToyJoy Mexico'} marginBlock={'5px'} />
                        <ToyButton func={centerOnTokyo} size={'small'} txt={'ToyJoy Tokyo'} marginBlock={'5px'} />
                    </div>
                    <GoogleMap centerMap={mapCenter} />
                </div >
            </div >

        </section>
    )
}