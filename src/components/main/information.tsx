import Link from "next/link";

const Information = () => {
    return (  
        <div className="bg-white text-black font-grotsek py-10 flex flex-col items-center">
            <div className="text-center sm:text-3xl text-2xl font-semibold flex flex-col items-center">
                Thinkr is Live!
                <div className="text-base w-96 mt-2 text-[#737373] font-semibold">
                    Step into a world where ideas spark conversations. Join now and start thinking out loud!
                </div>
            </div>
            <div className="text-center sm:mt-2 mt-4 text-base w-96 sm:w-full self-center text-[#737373] font-semibold">
                Stay updated and dive deeper into insights—connect with us on Twitter <Link target="_blank" className="text-[#1a5a8b] font-bold" href={'https://x.com/ishyverma'}>(@ishyverma)</Link> and LinkedIn <Link target="_blank" className="text-[#1a5a8b] font-bold" href={'https://www.linkedin.com/in/ishyverma/'}>(Shyam Verma)</Link>.
            </div>
            <div className="text-center mt-20 flex flex-col items-center justify-center w-96">
                <div className="sm:text-3xl text-2xl font-bold">Redefining the Way You Learn.</div>
                <div className="sm:text-xl text-base sm:w-[900px] w-96 mt-2 text-[#737373] font-semibold">
                    Engage, interact, and truly understand like never before with our cutting-edge AI models, designed to personalize your learning journey and transform the way you absorb knowledge.
                </div>
            </div>
        </div>
    );
}
 
export default Information;