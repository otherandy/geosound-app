"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data (same as before)
const audioData = [
  {
    id: 1,
    audio_file: "bird_chirping.mp3",
    latitude: 40.7128,
    longitude: -74.006,
    tags: ["nature", "bird", "morning"],
  },
  {
    id: 2,
    audio_file: "city_traffic.mp3",
    latitude: 34.0522,
    longitude: -118.2437,
    tags: ["urban", "noise", "cars"],
  },
  {
    id: 3,
    audio_file: "ocean_waves.mp3",
    latitude: 21.3069,
    longitude: -157.8583,
    tags: ["nature", "ocean", "relaxing"],
  },
  {
    id: 4,
    audio_file: "rainforest_ambience.mp3",
    latitude: -3.4653,
    longitude: -62.2159,
    tags: ["nature", "rainforest", "ambient"],
  },
  {
    id: 5,
    audio_file: "crowd_cheering.mp3",
    latitude: 51.5074,
    longitude: -0.1278,
    tags: ["event", "crowd", "excitement"],
  },
];

export default function AudioDataMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeAudio, setActiveAudio] = useState<(typeof audioData)[number]>();

  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
    });

    // Initialize map
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add markers for each audio file location
    audioData.forEach((audio) => {
      const marker = L.marker([audio.latitude, audio.longitude]).addTo(map);
      marker.bindPopup(`<b>${audio.audio_file}</b>`);
      marker.on("click", () => setActiveAudio(audio));
    });

    // Clean up on unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={mapRef}
        className="map-container mb-4"
        style={{ height: "500px" }}
      />
      {activeAudio && (
        <Card className="mx-4">
          <CardHeader>
            <CardTitle>{activeAudio.audio_file}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Latitude: {activeAudio.latitude.toFixed(4)}</p>
            <p>Longitude: {activeAudio.longitude.toFixed(4)}</p>
            <div className="mt-2">
              {activeAudio.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="mr-1">
                  {tag}
                </Badge>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => alert(`Playing ${activeAudio.audio_file}`)}
            >
              Play Audio
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
