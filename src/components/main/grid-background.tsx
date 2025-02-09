'use client';

import React from "react";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { LineShadowText } from "../magicui/line-shadow-text";
import { useTheme } from "next-themes";

export function GridBackgroundDemo() {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "black" : "white";

  return (
    <div className="h-[40rem] w-full dark:bg-white bg-white dark:bg-grid-black/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="text-center">
        <p className="text-4xl sm:text-7xl font-bold relative z-20 text-black py-8 font-grotsek">
          Think. Share.
          <LineShadowText className="italic ml-3" shadowColor={shadowColor} >
            Evolve.
          </LineShadowText>
        </p>
        <span className="text-black -mt-2">A platform built for thinkers, creators, and visionaries like you.</span>
        <div className="mt-10 text-white">
          <Button size={"lg"} className="text-xl dark:text-white text-white bg-[#1a5a8b] hover:bg-[#1a5a8b]/90 font-grotsek" variant={"secondary"}>
            Get Started <Send />
          </Button>
        </div>
      </div>
    </div>
  );
}
