"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

interface MapClientProps {
  userLocation?: { lat: number; lng: number } | null;
}

export default function MapClient({ userLocation }: MapClientProps) {
  return <Map userLocation={userLocation} />;
}

