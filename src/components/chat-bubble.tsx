import { cva } from "class-variance-authority";
import Markdown from "./mardown";

interface ChatBubbleProps {
    sentBy: "User" | "AI",
    message: string | string[];
}

const chatBubble = cva(["rounded"], {
    variants: {
        intent: {
            user: ["flex p-5 rounded-2xl w-auto max-w-lg flex justify-self-end dark:bg-[#171717] bg-[#D4D4D8] dark:text-white text-black mt-5"],
            ai: ["mt-2"]
        }
    }
})

const ChatBubble = ({ sentBy, message }: ChatBubbleProps) => {
    return ( 
        <div className={`flex ${sentBy === 'User' ? "justify-self-end" : ""}`}>
            <div className="flex gap-4">
                <div className={`${sentBy === 'User' ? chatBubble({ intent: "user" }) : chatBubble({ intent: "ai" })}`}>
                {sentBy === "AI" && <div className="mt-2"></div>}
                    <Markdown text={`${message}`} />
                </div>
            </div>
        </div>
    );
}
 
export default ChatBubble;