'use client';

import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import { LineShadowText } from "../magicui/line-shadow-text";
import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { House, LogOut, User } from "lucide-react";

const Navbar = () => {
    const { data: session, status } = useSession()
    const theme = useTheme();
    const shadowColor = theme.resolvedTheme === "dark" ? "black" : "white";

    return (  
        <div className="flex justify-center items-center mt-3 text-black font-grotsek fixed top-1 sm:left-[15%] left-[7%] border border-[#919191]/30 rounded-lg z-40">
            <div className="sm:w-[70vw] w-[84vw] bg-white h-14 rounded-lg flex justify-between items-center px-4">
                <div className="cursor-pointer">
                    <LineShadowText className="italic text-2xl font-bold" shadowColor={shadowColor}>
                        Thinkr
                    </LineShadowText>
                </div>
                <div className="flex gap-4 items-center">
                    {status === 'authenticated' && <div className="cursor-pointer text-base hover:text-black text-[#838383] font-bold">
                        <Link href="/thread">
                            Enter
                        </Link>
                    </div>}
                    <div>
                        {status === 'authenticated' 
                        ? 
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar className="cursor-pointer hover:scale-110 transition-all duration-200 text-white items-center justify-center flex w-full h-full">
                                    <AvatarFallback className="flex items-center w-8 h-8 rounded-full justify-center bg-[#455964]">
                                        {session?.user.username[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white text-[#455964] border-[#455964]/50 w-60 mr-10">
                                <DropdownMenuItem className="cursor-pointer">
                                    <User /> Profile
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-[#455964]/50" />
                                <DropdownMenuItem className="cursor-pointer">
                                    <House />Home
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" onClick={() => {
                                    signOut()
                                }}>
                                    <LogOut />Log Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        :
                        <div className="cursor-pointer text-base hover:text-black text-[#838383] font-bold">
                            <Link href={'/signin'} target="_blank">Login</Link>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;