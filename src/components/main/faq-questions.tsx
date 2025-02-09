'use client';

import { Cross, Plus } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

interface FAQQuestionsProps {
    question: string;
    answer: string;
}

const FAQQuestions = ({ question, answer }: FAQQuestionsProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (  
        <div className="text-black font-grotsek border p-4 border-[#868686]/30 shadow-sm rounded-2xl">
            <Collapsible>
                <CollapsibleTrigger className="w-full" onClick={() => {
                    setIsOpen(prev => !prev)
                }}>
                    <div className="flex w-full justify-between items-center hover:underline cursor-pointer">
                        <div className="sm:text-xl text-base font-semibold">
                            {question}
                        </div>
                        <div>
                            {isOpen ? <Plus className="rotate-45" /> : <Plus />}
                        </div>
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="mt-6">
                        {answer}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
 
export default FAQQuestions;