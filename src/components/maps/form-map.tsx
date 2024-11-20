"use client";

import { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function FormMap({
  position,
  setPosition,
}: {
  position: [number, number];
  setPosition: (position: [number, number]) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(12);

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
    const map = L.map(mapRef.current).setView(position, zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      noWrap: true,
    }).addTo(map);

    L.marker(position).addTo(map);
    map.on("click", (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      setZoom(map.getZoom());
    });

    return () => {
      map.remove();
    };
  });

  return (
    <div
      ref={mapRef}
      className="map-container mb-4"
      style={{ height: "300px" }}
    />
  );
}
