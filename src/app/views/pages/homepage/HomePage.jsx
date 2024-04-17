import React from 'react'

import Hero from 'app/components/home-component/Hero'
import Skills from "app/components/home-component/Skills";
import Service from "app/components/home-component/Services";
import Projects from "app/components/home-component/Projects";
import Testimonials from "app/components/home-component/Testimonials";
import Hireme from "app/components/home-component/Hireme";
import Contact from 'app/components/home-component/Contact';
import { useEffect } from "react";
// Animation package
import Aos from "aos";
import "aos/dist/aos.css";
import Navbar from 'app/Layouts/Navbar';


const HomePage = () => {
    useEffect(() => {
        Aos.init({
            duration: 1800,
            offset: 100,
            disable: "mobile",
        });
    }, []);

    return (
        <div className="">

            <Navbar />
            <Hero />
            <Skills />
            <Service />
            <Projects />
            {/* <Testimonials /> */}
            <Hireme />
            <Contact />
            <footer className="p-3 text-center">
                <h6 className="mb-3">VNPT Long An</h6>
                <p>Trung tâm CNTT © Phiến triển 2024</p>
            </footer>
        </div>

    );
};

export default HomePage;
