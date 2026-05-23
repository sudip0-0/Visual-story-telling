"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function registerGsap(): typeof gsap {
  if (typeof window === "undefined") {
    return gsap;
  }

  if (!isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }

  return gsap;
}

export function isGsapRegistered(): boolean {
  return isRegistered;
}
