'use client';
import SocialProfileGroup from "@/components/Buttons/Social/SocialProfileGroup";
import ProfileInfoModal from "@/components/Modal/ProfileInfoModal";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const ContentProfile: React.FC<{ data: any }> = ({ data }) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <section className="w-full overflow-hidden">
            <div className="w-full mx-auto">
                <img src="/assets/cover.jpg" alt="User Cover" className="w-full h-[10rem] lg:h-[14rem]" />
                <div className="w-full mx-auto h-[5rem] flex justify-center">
                    <img src="/assets/avatar.png" alt="User Profile" className="rounded-full object-cover w-[8rem] h-[8rem] bottom-[4rem] lg:w-[10rem] lg:h-[10rem] lg:bottom-[6rem] border-2 border-Navy shadow-xl relative" />
                </div>
                <div className="lg:w-[90%] sm:w-[96%] mx-auto flex flex-col gap-4 justify-center items-center relative">
                    <div className="w-full flex justify-center relative">
                        <div id="profileNameRole">
                            <h1 className="text-center text-slate-800 text-4xl">{data?.first_name + " " + data?.last_name}</h1>
                            <h5 className="text-center text-slate-600 text-xl">{data?.role}</h5>
                        </div>
                        <div className="absolute top-0 right-0 p-2 cursor-pointer">
                            <FontAwesomeIcon icon={faCircleInfo} className="text-slate-600 text-2xl" onClick={toggleModal}/>
                        </div>
                    </div>
                    <p className="w-full text-gray-700 text-md text-justify px-4">{data?.about}</p>
                    <SocialProfileGroup data={data?.social_links} />
                    { isModalOpen && (
                        <ProfileInfoModal data={data} toggle={toggleModal} />
                    )}

                    {/* <div className="w-full flex gap-4 justify-center items-center mt-10">
                        <div
                            className="lg:w-1/5 lg:h-32 sm:w-1/3 sm:h-[5rem] flex justify-center items-center rounded-sm text-center text-lg px-6 py-4 border-2 border-dashed border-gray-300">
                            27
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
}

export default ContentProfile;