'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import ChatImage from "@/image/Thinkr One.png";
import Image from "next/image";
import { BorderBeam } from "../magicui/border-beam";

const Features = () => {
    return (  
        <div className="flex items-center justify-center py-5 bg-white text-black font-grotsek">
            <div className="w-[90vw] bg-[#F9FAFB] p-10 rounded-xl">
                <div className="flex justify-between ">
                    <div className="">
                        <Collapsible>
                            <div className="sm:w-[500px] w-96 bg-[#e6e6f4]/60 p-5 rounded-lg cursor-pointer">
                                <CollapsibleTrigger>
                                    <div className="font-bold sm:text-2xl text-base text-[#1a5a8b]">AI-Powered Learning, Redefined.</div>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="mt-4">
                                        Thinkr&apos;s advanced AI adapts to your needs, making learning interactive, intuitive, and deeply personalized—whether it&apos;s Math, Science, Coding, or beyond.
                                    </div>
                                </CollapsibleContent>
                            </div>
                        </Collapsible>
                        <Collapsible>
                            <div className="max-w-[500px] bg-[#e6e6f4]/60 p-5 rounded-lg cursor-pointer mt-5">
                                <CollapsibleTrigger>
                                    <div className="font-bold sm:text-2xl text-base text-[#1a5a8b]">What&apos;s Next?</div>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="mt-4">
                                        Using Canvases, you&apos;ll be able to draw sketches, create graphs, and develop diagrams in real-time, taking personalized learning to the next level.
                                    </div>
                                </CollapsibleContent>
                            </div>
                        </Collapsible>
                    </div>
                    <div className="relative sm:flex hidden">
                        <Image className="rounded-lg" width={600} alt="Thinkr-Chat" src={ChatImage} />
                        <BorderBeam borderWidth={3} className="rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Features;