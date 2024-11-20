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
import type { AudioData } from "@/lib/types";
import Link from "next/link";

export default function AudioDataTable({ data }: { data: AudioData[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(
    null
  );

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const playAudio = async (id: string) => {
    if (playingAudio) {
      playingAudio.pause();
      setPlayingAudio(null);
      return;
    }

    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/audio/${id}?download=true`
    );

    const a = new Audio(res.url);
    a.play();
    a.addEventListener("ended", () => {
      setPlayingAudio(null);
    });
    setPlayingAudio(a);
  };

  return (
    <>
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
            <TableHead>Audio File</TableHead>
            <TableHead>Latitude</TableHead>
            <TableHead>Longitude</TableHead>
            <TableHead>Loudness</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Link href={"data/" + item.id} className="hover:underline">
                  {item.filename}
                </Link>
              </TableCell>
              <TableCell>{item.latitude.toFixed(6)}</TableCell>
              <TableCell>{item.longitude.toFixed(6)}</TableCell>
              <TableCell>{item.loudness.toFixed(2)}</TableCell>
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
                  onClick={() => playAudio(item.id)}
                >
                  {playingAudio && playingAudio.src.includes(item.id)
                    ? "Stop"
                    : "Play"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
