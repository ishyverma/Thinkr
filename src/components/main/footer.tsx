'use client';

import { useTheme } from "next-themes";
import { LineShadowText } from "../magicui/line-shadow-text";
import Link from "next/link";

const Footer = () => {
    const theme = useTheme();

    return (  
        <div className="bg-white text-black font-grotsek flex justify-center items-center py-10 pt-20">
            <div className="w-[70vw] flex justify-between items-center">
                <div>
                    <LineShadowText className="italic text-2xl">Thinkr</LineShadowText>
                    <div className="text-xs text-[#737373] font-semibold mt-2">© 2025 Thinkr, Global</div>
                </div>
                <div className="text-[#737373] font-semibold space-y-4">
                    <div>
                        <Link className="hover:underline" href={'https://x.com/ishyverma'} target="_blank">Contact Us</Link>
                    </div>
                    <div>
                        <Link className="hover:underline" href={'/signup'} target="_blank">Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Footer;