"use client";

import Globe from "react-globe.gl";

// Sample data with added loudness
const audioData = [
  {
    id: 1,
    audio_file: "bird_chirping.mp3",
    latitude: 40.7128,
    longitude: -74.006,
    tags: ["nature", "bird", "morning"],
    loudness: 0.3,
  },
  {
    id: 2,
    audio_file: "city_traffic.mp3",
    latitude: 34.0522,
    longitude: -118.2437,
    tags: ["urban", "noise", "cars"],
    loudness: 0.8,
  },
  {
    id: 3,
    audio_file: "ocean_waves.mp3",
    latitude: 21.3069,
    longitude: -157.8583,
    tags: ["nature", "ocean", "relaxing"],
    loudness: 0.5,
  },
  {
    id: 4,
    audio_file: "rainforest_ambience.mp3",
    latitude: -3.4653,
    longitude: -62.2159,
    tags: ["nature", "rainforest", "ambient"],
    loudness: 0.4,
  },
  {
    id: 5,
    audio_file: "crowd_cheering.mp3",
    latitude: 51.5074,
    longitude: -0.1278,
    tags: ["event", "crowd", "excitement"],
    loudness: 0.9,
  },
];

export default function AudioDataGlobe() {
  const ringsData = audioData.map((audio) => ({
    lat: audio.latitude,
    lng: audio.longitude,
    maxR: audio.loudness * 10,
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
