"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AudioData } from "@/lib/types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function AudioDataMap({
  data,
  circle,
}: {
  data: AudioData[];
  circle?: {
    latitude: number;
    longitude: number;
    radius: number;
  };
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [activePoint, setActivePoint] = useState<AudioData>();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
    });

    if (!mapRef.current) return;
    const map = L.map(mapRef.current).setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      noWrap: true,
    }).addTo(map);

    data.forEach((audio) => {
      const marker = L.marker([audio.latitude, audio.longitude]).addTo(map);
      marker.bindPopup(`<b>${audio.filename}</b>`);
      marker.on("click", () => setActivePoint(audio));
      marker.on("popupclose", () => setActivePoint(undefined));
    });

    if (circle?.latitude && circle?.longitude && circle?.radius) {
      L.circle([circle.latitude, circle.longitude], {
        radius: circle.radius,
      }).addTo(map);

      map.setView([circle.latitude, circle.longitude], 15);
    }

    return () => {
      map.remove();
    };
  }, [data, circle]);

  const playAudio = async (id: string) => {
    if (playing) {
      audio?.pause();
      setPlaying(false);
      return;
    }

    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/audio/${id}?download=true`
    );
    const a = new Audio(res.url);
    a.play();
    a.addEventListener("ended", () => setPlaying(false));
    setPlaying(true);
    setAudio(a);
  };

  return (
    <>
      <div
        ref={mapRef}
        className="map-container mb-4"
        style={{ height: "500px" }}
      />
      {activePoint && (
        <Card className="mx-4">
          <CardHeader>
            <CardTitle>{activePoint.filename}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Latitude: {activePoint.latitude.toFixed(4)}</p>
            <p>Longitude: {activePoint.longitude.toFixed(4)}</p>
            <p>Loudness: {activePoint.loudness.toFixed(2)}</p>
            <div className="mt-2">
              {activePoint.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="mr-1">
                  {tag}
                </Badge>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => {
                if (playing) {
                  audio?.pause();
                  setPlaying(false);
                } else {
                  playAudio(activePoint.id);
                }
              }}
            >
              {playing ? "Stop" : "Play"}
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
