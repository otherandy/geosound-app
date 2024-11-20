"use client";

import Globe from "react-globe.gl";
import type { AudioData } from "@/lib/types";

export default function AudioDataGlobe({ data }: { data: AudioData[] }) {
  const gData = data.map((audio) => ({
    lat: audio.latitude,
    lng: audio.longitude,
    weight: audio.loudness,
  }));

  return (
    <Globe
      globeImageUrl="/assets/3d/texture_earth.jpg"
      backgroundColor="white"
      width={550}
      height={550}
      heatmapsData={[gData]}
      heatmapPointLat="lat"
      heatmapPointLng="lng"
      heatmapPointWeight="weight"
      heatmapTopAltitude={0.5}
      heatmapsTransitionDuration={3000}
      pointerEventsFilter={(obj) => obj.type === "Feature"}
    />
  );
}
