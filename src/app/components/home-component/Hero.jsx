// import content
import { useEffect, useState, useContext } from "react";
// import { content } from "../../views/pages/homepage/Content";
import { Input } from 'antd';
import { ContentContext } from "app/context/ContentContext";
// import { content } from "app/views/pages/homepage/Content";
const { Search } = Input;
const Hero = () => {
    const { content } = useContext(ContentContext);
    const [keyForm, setKeyForm] = useState()
    return (
        <section id="home" className="overflow-hidden">
            <div className="min-h-screen relative flex md:flex-row flex-col-reverse md:items-end justify-center items-center">

                <div
                    data-aos="slide-left"
                    data-aos-delay="1200"
                    className="absolute h-full md:w-4/12 w-8/12 top-0 right-0 bg-primaryLinear bottom-0 -z-10"
                >
                    <h1 className="rotate-90 absolute top-[30%] right-[-15%] text-[#EAF2FA]">
                        {content?.hero?.firstName}{" "}
                        <span className="text-dark_primary">{content?.hero?.LastName}</span>
                    </h1>
                </div>

                {/* first col */}
                <div className="pb-16 px-6 pt-5" data-aos="fade-down">
                    {/* <div className="pb-3 div-key-form" data-aos="fade-down">
                       
                    </div> */}
                    <div ><span></span>
                        <div className="div-key-form"><span>
                            <Input size="large"
                                className="input-key-form"
                                placeholder="Nhập mã khảo sát"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        window.location.href = "/khao-sat?key=" + keyForm
                                    }
                                }}
                                onChange={(e) => setKeyForm(e?.target?.value)}
                            />
                        </span></div>
                    </div>
                    <p className="h2-title">{content?.hero?.title}</p>
                    <br />
                    <div className="flex justify-end">
                        <button className="btn btn-create-bieumau" onClick={() => { window.location.href = "/quan-tri/dashboard" }}>{content?.hero?.btnText}</button>
                    </div>
                    <div className="flex flex-col gap-10 mt-10">
                        {content?.hero?.hero_content.map((content, i) => (
                            <div
                                key={i}
                                data-aos="fade-down"
                                data-aos-delay={i * 300}
                                className={`flex items-center w-80 gap-5
                                ${i === 1 && " flex-row-reverse text-right"}  `}
                            >
                                <h3>{content.count}</h3>
                                <p>{content.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* sec col */}
                <div className="md:h-[37rem] h-96">
                    <img
                        src={content?.hero?.image}
                        data-aos="slide-up"
                        alt="..."
                        className="h-full object-cover img-animazom"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
