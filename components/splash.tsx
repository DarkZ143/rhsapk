"use client";

import { useEffect, useState } from "react";
import { BrandLoader } from "./brand-loader";

const MIN_VISIBLE_MS = 700; // measured from navigation start
const MAX_VISIBLE_MS = 2500;
const FADE_MS = 400;

/** First-load splash: rendered in the static HTML, fades out once the page has loaded. */
export function Splash() {
  const [state, setState] = useState<"shown" | "leaving" | "gone">("shown");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const leave = () => {
      clearTimeout(timer);
      timer = setTimeout(
        () => setState("leaving"),
        Math.max(0, MIN_VISIBLE_MS - performance.now()),
      );
    };
    const cap = setTimeout(() => setState("leaving"), MAX_VISIBLE_MS);
    if (document.readyState === "complete") leave();
    else window.addEventListener("load", leave, { once: true });
    return () => {
      clearTimeout(timer);
      clearTimeout(cap);
      window.removeEventListener("load", leave);
    };
  }, []);

  useEffect(() => {
    if (state !== "leaving") return;
    const t = setTimeout(() => setState("gone"), FADE_MS);
    return () => clearTimeout(t);
  }, [state]);

  if (state === "gone") return null;

  return (
    <div
      aria-hidden={state === "leaving"}
      className={`splash fixed inset-0 z-100 grid place-items-center bg-porcelain transition-opacity duration-400 ${
        state === "leaving" ? "pointer-events-none opacity-0" : ""
      }`}
    >
      <BrandLoader />
    </div>
  );
}
