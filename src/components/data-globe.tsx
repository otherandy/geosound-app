"use client";

import Globe from "react-globe.gl";
import type { AudioData } from "@/lib/types";

export default function AudioDataGlobe({ data }: { data: AudioData[] }) {
  const ringsData = data.map((audio) => ({
    lat: audio.latitude,
    lng: audio.longitude,
    maxR: audio.loudness,
  }));

  return (
    <Globe
      globeImageUrl="/assets/3d/texture_earth.jpg"
      backgroundColor="white"
      ringsData={ringsData}
      ringMaxRadius={"maxR"}
      width={600}
      height={600}
    />
  );
}
