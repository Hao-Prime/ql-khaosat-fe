import React, { useContext } from 'react'

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
import Services from 'app/services';
import { ContentContext } from 'app/context/ContentContext';


const HomePage = () => {
    const { setContent } = useContext(ContentContext);;
    useEffect(() => {
        updateContent()
        Aos.init({
            duration: 1800,
            offset: 100,
            disable: "mobile",
        });
    }, []);
    async function updateContent() {
        try {

            const rs = await Services.getCauHinhService().getAll("", "home-detail-2", "");
            if (rs?.data) {
                let rsData = JSON.parse(rs.data?.value);
                console.log(rsData);
                setContent((content) => {


                    const getDefaultValue = (newValue, oldValue) =>
                        newValue !== null ? newValue : oldValue;

                    return {
                        nav: (rsData?.nav || content.nav || []).map((item, index) => ({
                            link: getDefaultValue(item?.link, content.nav?.[index]?.link),
                            icon: getDefaultValue(item?.icon, content.nav?.[index]?.icon)
                        })),
                        hero: {
                            title: getDefaultValue(rsData?.hero?.title, content.hero?.title),
                            firstName: getDefaultValue(rsData?.hero?.firstName, content.hero?.firstName),
                            LastName: getDefaultValue(rsData?.hero?.LastName, content.hero?.LastName),
                            btnText: getDefaultValue(rsData?.hero?.btnText, content.hero?.btnText),
                            image: getDefaultValue(rsData?.hero?.image, content.hero?.image),
                            hero_content: (rsData?.hero?.hero_content || content.hero?.hero_content || []).map((item, index) => ({
                                count: getDefaultValue(item?.count, content.hero?.hero_content?.[index]?.count),
                                text: getDefaultValue(item?.text, content.hero?.hero_content?.[index]?.text)
                            }))
                        },
                        skills: {
                            title: getDefaultValue(rsData?.skills?.title, content.skills?.title),
                            subtitle: getDefaultValue(rsData?.skills?.subtitle, content.skills?.subtitle),
                            skills_content: (rsData?.skills?.skills_content || content.skills?.skills_content || []).map((item, index) => ({
                                name: getDefaultValue(item?.name, content.skills?.skills_content?.[index]?.name),
                                para: getDefaultValue(item?.para, content.skills?.skills_content?.[index]?.para),
                                logo: getDefaultValue(item?.logo, content.skills?.skills_content?.[index]?.logo)
                            })),
                            icon: getDefaultValue(rsData?.skills?.icon, content.skills?.icon)
                        },
                        services: {
                            title: getDefaultValue(rsData?.services?.title, content.services?.title),
                            subtitle: getDefaultValue(rsData?.services?.subtitle, content.services?.subtitle),
                            service_content: (rsData?.services?.service_content || content.services?.service_content || []).map((item, index) => ({
                                title: getDefaultValue(item?.title, content.services?.service_content?.[index]?.title),
                                para: getDefaultValue(item?.para, content.services?.service_content?.[index]?.para),
                                logo: getDefaultValue(item?.logo, content.services?.service_content?.[index]?.logo)
                            }))
                        },
                        Projects: {
                            title: getDefaultValue(rsData?.Projects?.title, content.Projects?.title),
                            subtitle: getDefaultValue(rsData?.Projects?.subtitle, content.Projects?.subtitle),
                            image: getDefaultValue(rsData?.Projects?.image, content.Projects?.image),
                            project_content: (rsData?.Projects?.project_content || content.Projects?.project_content || []).map((item, index) => ({
                                title: getDefaultValue(item?.title, content.Projects?.project_content?.[index]?.title),
                                image: getDefaultValue(item?.image, content.Projects?.project_content?.[index]?.image)
                            }))
                        },
                        Testimonials: {
                            title: getDefaultValue(rsData?.Testimonials?.title, content.Testimonials?.title),
                            subtitle: getDefaultValue(rsData?.Testimonials?.subtitle, content.Testimonials?.subtitle),
                            testimonials_content: (rsData?.Testimonials?.testimonials_content || content.Testimonials?.testimonials_content || []).map((item, index) => ({
                                review: getDefaultValue(item?.review, content.Testimonials?.testimonials_content?.[index]?.review),
                                img: getDefaultValue(item?.img, content.Testimonials?.testimonials_content?.[index]?.img),
                                name: getDefaultValue(item?.name, content.Testimonials?.testimonials_content?.[index]?.name)
                            }))
                        },
                        Hireme: {
                            title: getDefaultValue(rsData?.Hireme?.title, content.Hireme?.title),
                            subtitle: getDefaultValue(rsData?.Hireme?.subtitle, content.Hireme?.subtitle),
                            image1: getDefaultValue(rsData?.Hireme?.image1, content.Hireme?.image1),
                            image2: getDefaultValue(rsData?.Hireme?.image2, content.Hireme?.image2),
                            para: getDefaultValue(rsData?.Hireme?.para, content.Hireme?.para),
                            btnText: getDefaultValue(rsData?.Hireme?.btnText, content.Hireme?.btnText)
                        },
                        Contact: {
                            title: getDefaultValue(rsData?.Contact?.title, content.Contact?.title),
                            subtitle: getDefaultValue(rsData?.Contact?.subtitle, content.Contact?.subtitle),
                            social_media: (rsData?.Contact?.social_media || content.Contact?.social_media || []).map((item, index) => ({
                                text: getDefaultValue(item?.text, content.Contact?.social_media?.[index]?.text),
                                icon: getDefaultValue(item?.icon, content.Contact?.social_media?.[index]?.icon),
                                link: getDefaultValue(item?.link, content.Contact?.social_media?.[index]?.link)
                            }))
                        },
                        Footer: {
                            text: getDefaultValue(rsData?.Footer?.text, content.Footer?.text)
                        }
                    };
                });
            }

        } catch (error) {
            console.error("Error fetching content:", error);
        }
    }
    return (
        <div className="">

            <Navbar />
            <Hero />
            <Skills />
            <Service />
            {/* <Projects /> */}
            {/* <Testimonials /> */}
            {/* <Hireme /> */}
            {/* <Contact /> */}
            <footer className="p-3 text-center">
                <p>VNPT Long An © Phát  triển 2024</p>
            </footer>
        </div>

    );
};

export default HomePage;
