import Hero_person from "app/assets/images/Hero/person.png";

import figma from "app/assets/images/Skills/figma.png";
import sketch from "app/assets/images/Skills/sketch.png";
import ps from "app/assets/images/Skills/ps.png";
import reactjs from "app/assets/images/Skills/react.png";
import nodejs from "app/assets/images/Skills/node.png";
import python from "app/assets/images/Skills/python.png";

import services_logo1 from "app/assets/images/Services/logo1.png";
import services_logo2 from "app/assets/images/Services/logo2.png";
import services_logo3 from "app/assets/images/Services/logo3.png";

import project1 from "app/assets/images/projects/img1.png";
import project2 from "app/assets/images/projects/img2.png";
import project3 from "app/assets/images/projects/img3.png";
import person_project from "app/assets/images/banner/web_developing.gif";

import avatar1 from "app/assets/images/Testimonials/avatar1.png";
import avatar2 from "app/assets/images/Testimonials/avatar2.png";
import avatar3 from "app/assets/images/Testimonials/avatar3.png";
import avatar4 from "app/assets/images/Testimonials/avatar4.png";

import Hireme_person from "app/assets/images/Hireme/person.png";
import Hireme_person2 from "app/assets/images/Hireme/person2.png";

import hoa01 from "app/assets/images/banner/hoa-1.jpg";
import hoa02 from "app/assets/images/banner/hoa-2.jpg";
import hoa04 from "app/assets/images/banner/hoa-4.jpg";

// import icons from react-icons
import { GrMail } from "react-icons/gr";
import { MdArrowForward, MdCall } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
import { TbSmartHome } from "react-icons/tb";
import { BiUser } from "react-icons/bi";
import { RiServiceLine, RiProjectorLine } from "react-icons/ri";
import { MdOutlinePermContactCalendar } from "react-icons/md";


import React, { useEffect, useState, createContext } from "react";

export const ContentContext = createContext();
export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState({
        nav: [
            {
                link: "",
                icon: TbSmartHome,
            },
            {
                link: "",
                icon: BiUser,
            },
            {
                link: "",
                icon: RiServiceLine,
            },
            {
                link: "",
                icon: RiProjectorLine,
            },
            {
                link: "",
                icon: MdOutlinePermContactCalendar,
            },
        ],
        hero: {
            title: "",
            firstName: "",
            LastName: "",
            btnText: "",
            image: Hero_person,
            hero_content: [
                {
                    count: "",
                    text: "",
                },
                {
                    count: "",
                    text: "",
                },
            ],
        },
        skills: {
            title: "",
            subtitle: "",
            skills_content: [
                {
                    name: "",
                    para: "",
                    logo: figma,
                },
                {
                    name: "",
                    para: "",
                    logo: nodejs,
                },
                {
                    name: "",
                    para: "",
                    logo: ps,
                },
                {
                    name: "",
                    para: "",
                    logo: reactjs,
                },
                {
                    name: "",
                    para: "",
                    logo: sketch,
                },
                {
                    name: "",
                    para: "",
                    logo: python,
                },
            ],
            icon: MdArrowForward,
        },
        services: {
            title: "",
            subtitle: "",
            service_content: [
                {
                    title: "",
                    para: "",
                    logo: services_logo1,
                },
                {
                    title: "",
                    para: "",
                    logo: services_logo2,
                },
                {
                    title: "",
                    para: "",
                    logo: services_logo3,
                },
            ],
        },
        Projects: {
            title: "",
            subtitle: "",
            image: person_project,
            project_content: [
                {
                    title: "",
                    image: hoa01,
                },
                {
                    title: "",
                    image: hoa02,
                },
                {
                    title: "",
                    image: hoa04,
                },
            ],
        },
        Testimonials: {
            title: "",
            subtitle: "",
            testimonials_content: [
                {
                    review: "",
                    img: avatar1,
                    name: "",
                },
                {
                    review: "",
                    img: avatar2,
                    name: "",
                },
                {
                    review: "",
                    img: avatar3,
                    name: "",
                },
                {
                    review: "",
                    img: avatar4,
                    name: "",
                },
            ],
        },
        Hireme: {
            title: "",
            subtitle: "",
            image1: Hireme_person,
            image2: Hireme_person2,
            para: "",
            btnText: "",
        },
        Contact: {
            title: "",
            subtitle: "",
            social_media: [
                {
                    text: "",
                    icon: GrMail,
                    link: "",
                },
                {
                    text: "",
                    icon: MdCall,
                    link: "",
                },
                {
                    text: "",
                    icon: BsInstagram,
                    link: "",
                },
            ],
        },
        Footer: {
            text: "",
        },
    }
    );
    return (
        <ContentContext.Provider
            value={{
                content,
                setContent
            }}
        >
            {children}
        </ContentContext.Provider>
    );
};
