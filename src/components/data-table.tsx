"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Sample data
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
    tags: [],
  },
];

export default function AudioDataTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = audioData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Audio Data Table</h1>
      <Input
        type="text"
        placeholder="Search..."
        className="max-w-sm mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Audio File</TableHead>
            <TableHead>Latitude</TableHead>
            <TableHead>Longitude</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.audio_file}</TableCell>
              <TableCell>{item.latitude.toFixed(4)}</TableCell>
              <TableCell>{item.longitude.toFixed(4)}</TableCell>
              <TableCell>
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="mr-1">
                    {tag}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert(`Playing ${item.audio_file}`)}
                >
                  Play
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
