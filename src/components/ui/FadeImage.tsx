"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Rose } from "@/components/ui/Rose";

// Crossfades from the blur placeholder on load; skip for priority images so it never gates LCP.
export function FadeImage({ className = "", alt, onLoad, onError, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-sand" role="img" aria-label={alt}>
        <Rose variant="bloom" className="h-8 w-8 opacity-40" />
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      onError={(event) => {
        setErrored(true);
        onError?.(event);
      }}
      className={`transition-[opacity,transform,filter] duration-350 ease-out motion-reduce:transition-none ${
        loaded ? "scale-100 opacity-100 blur-0" : "scale-[1.03] opacity-0 blur-md"
      } ${className}`}
    />
  );
}
