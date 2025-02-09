import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const AvatarImageComp = () => {
    return (
        <Avatar className="bg-[#09090B]">
            <AvatarImage src="https://cdn.jsdelivr.net/gh/foyer-work/cdn-files@latest/models/gemini_1_5_flash.webp" />
            <AvatarFallback>Gemnini</AvatarFallback>
        </Avatar>
    );
}

export default AvatarImageComp;