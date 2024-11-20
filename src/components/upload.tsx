"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function AudioUploadForm() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<[number, number]>([31.86, -116.6]);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    const target = e.target as HTMLFormElement;
    const file = (target.elements.namedItem("file") as HTMLInputElement)
      .files?.[0];

    if (!file) {
      toast({
        title: "Error",
        description: "Please select an audio file to upload.",
        variant: "destructive",
      });
      setIsUploading(false);
      return;
    }

    const latitude = (target.elements.namedItem("latitude") as HTMLInputElement)
      .value;
    const longitude = (
      target.elements.namedItem("longitude") as HTMLInputElement
    ).value;
    const tags = (target.elements.namedItem("tags") as HTMLInputElement).value;

    const formData = new FormData();
    formData.append("audio", file);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("tags", tags);

    try {
      await fetch(process.env.NEXT_PUBLIC_API_URL + "/audio", {
        method: "POST",
        body: formData,
      });

      toast({
        title: "Success",
        description: "Audio file uploaded successfully!",
        action: <ToastAction altText="View uploads">View uploads</ToastAction>,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload audio file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

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
    const map = L.map(mapRef.current).setView(position, 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(position).addTo(map);
    map.on("click", (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    });

    return () => {
      map.remove();
    };
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md p-6 bg-white rounded-lg shadow-md min-w-96"
    >
      <h2 className="text-2xl font-bold mb-6">Upload Audio File</h2>
      <div>
        <Label htmlFor="file">Audio File</Label>
        <Input
          id="file"
          type="file"
          accept="audio/*"
          required
          className="mt-1"
        />
      </div>
      <div
        ref={mapRef}
        className="map-container mb-4"
        style={{ height: "300px" }}
      />
      <div>
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          id="latitude"
          type="number"
          step="any"
          min={-90}
          max={90}
          value={position[0]}
          onChange={(e) => setPosition([+e.target.value, position[1]])}
          required
          placeholder="Enter latitude"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          id="longitude"
          type="number"
          step="any"
          min={-180}
          max={180}
          value={position[1]}
          onChange={(e) => setPosition([position[0], +e.target.value])}
          required
          placeholder="Enter longitude"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="tags">Tags</Label>
        <Textarea
          id="tags"
          placeholder="Enter tags (comma-separated)"
          className="mt-1"
        />
      </div>
      <Button type="submit" className="w-full" disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload Audio"}
      </Button>
    </form>
  );
}
