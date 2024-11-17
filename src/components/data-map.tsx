"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioData } from "@/lib/types";

export default function AudioDataMap({ data }: { data: AudioData[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeAudio, setActiveAudio] = useState<AudioData>();

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
    data.forEach((audio) => {
      const marker = L.marker([audio.latitude, audio.longitude]).addTo(map);
      marker.bindPopup(`<b>${audio.file}</b>`);
      marker.on("click", () => setActiveAudio(audio));
    });

    // Clean up on unmount
    return () => {
      map.remove();
    };
  }, [data]);

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
            <CardTitle>{activeAudio.file}</CardTitle>
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
              onClick={() => alert(`Playing ${activeAudio.file}`)}
            >
              Play Audio
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
