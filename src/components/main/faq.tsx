import Link from "next/link";
import FAQQuestions from "./faq-questions";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

const FAQ = () => {
    return (  
        <div className="bg-white font-grotsek flex flex-col items-center justify-center py-4">
            <div className="text-center text-black sm:text-4xl text-2xl font-semibold">
                FAQs
            </div>
            <div className="sm:w-[70vw] w-[90vw] py-4 space-y-4">
                <FAQQuestions 
                    question="How much does Thinkr cost to use?" 
                    answer="Thinkr offers a range of features for free, allowing you to explore AI-powered learning without barriers. For those looking for an enhanced experience, we'll soon introduce premium plans with advanced features like real-time Canvases, in-depth AI tutoring, and more. Stay tuned for updates!" 
                />
                <FAQQuestions 
                    question="How does Thinkr work?" 
                    answer="Thinkr leverages advanced AI to provide an interactive and personalized learning experience. Simply ask questions, explore concepts, and engage with our AI-powered models to gain a deeper understanding. Whether you're studying Math, Science, Coding, or Humanities, Thinkr adapts to your learning style, offering explanations, generating examples, and even creating real-time visualizations. With upcoming features like Canvases, you'll soon be able to draw, graph, and diagram your thoughts for a truly immersive experience." 
                />
            </div>
            <div className="text-[#737373] text-center font-semibold">
                <h1>Have more questions? <Link href={'https://x.com/ishyverma'} target="_blank" className="underline">Contact Us</Link></h1>
            </div>
            <div className="mt-8">
                <Link href={"/signin"}>
                    <Button size={"lg"} className="text-xl dark:text-white text-white bg-[#1a5a8b] hover:bg-[#1a5a8b]/90 font-grotsek" variant={"secondary"}>
                        Get Started <Send />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
 
export default FAQ;