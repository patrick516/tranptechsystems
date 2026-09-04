// components/sections/Services/ServiceIcon.tsx
"use client";

import { useState } from "react";
import { LucideIcon } from "lucide-react";

interface ServiceIconProps {
  cdnUrl?: string;
  fallback: LucideIcon;
  alt: string;
  size?: number;
}

export default function ServiceIcon({
  cdnUrl,
  fallback: Fallback,
  alt,
  size = 22,
}: ServiceIconProps) {
  const [failed, setFailed] = useState(false);

  if (!cdnUrl || failed) {
    return <Fallback size={size} strokeWidth={1.8} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={cdnUrl}
      alt={alt}
      width={size}
      height={size}
      onError={() => setFailed(true)}
    />
  );
}
