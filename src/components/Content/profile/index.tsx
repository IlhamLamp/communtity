import SocialProfileGroup from "@/components/Buttons/Social/SocialProfileGroup";

const ContentProfile: React.FC = () => {
    return (
        <section className="w-full overflow-hidden dark:bg-gray-900">
            <div className="w-full mx-auto">
                {/* <!-- User Cover IMAGE --> */}
                <img src="/assets/cover.jpg" alt="User Cover" className="w-full h-[10rem] lg:h-[14rem]" />

                {/* <!-- User Profile Image --> */}
                <div className="w-full mx-auto h-[5rem] flex justify-center">
                    <img src="/assets/avatar.png" alt="User Profile" className="rounded-full object-cover w-[8rem] h-[8rem] bottom-[4rem] lg:w-[10rem] lg:h-[10rem] lg:bottom-[6rem] border-2 border-Navy shadow-xl relative" />
                </div>

                <div className="lg:w-[90%] sm:w-[96%] mx-auto flex flex-col gap-4 justify-center items-center relative">
                    {/* <!-- FullName --> */}
                    <h1 className="text-center text-slate-800 text-4xl">Kamisato Ayaya</h1>
                    <h5 className="text-center text-slate-600 text-xl">DevOps Engineer</h5>
                    {/* <!-- About --> */}
                    <p className="w-full text-gray-700 text-md text-justify px-4">Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Quisquam debitis labore consectetur voluptatibus mollitia dolorem
                        veniam omnis ut quibusdam minima sapiente repellendus asperiores explicabo, eligendi odit, dolore
                        similique fugiat dolor, doloremque eveniet. Odit, consequatur. Ratione voluptate exercitationem hic
                        eligendi vitae animi nam in, est earum culpa illum aliquam. Atque aperiam et voluptatum voluptate
                        distinctio, nostrum hic voluptatibus nisi. Eligendi voluptatibus numquam maxime voluptatem labore
                        similique qui illo est magnam adipisci autem quisquam, quia incidunt excepturi, possimus odit
                        praesentium?</p>

                    {/* <!-- Social Links --> */}
                    <SocialProfileGroup />

                    {/* <!-- Cards --> */}
                    <div className="w-full flex gap-4 justify-center items-center mt-10">
                        {/* <!-- 1 --> */}
                        <div
                            className="lg:w-1/5 lg:h-32 sm:w-1/3 sm:h-[5rem] flex justify-center items-center rounded-sm text-center text-lg px-6 py-4 border-2 border-dashed border-gray-300 dark:text-white dark:border-gray-700">
                            27
                        </div>

                        {/* <!-- 2 --> */}
                        <div
                            className="lg:w-1/5 lg:h-32 sm:w-1/3 sm:h-[5rem] flex justify-center items-center rounded-sm text-center text-lg px-6 py-4 border-2 border-dashed border-gray-300 dark:text-white dark:border-gray-700">
                            50
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContentProfile;