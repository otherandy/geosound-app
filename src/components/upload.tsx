"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";

export default function AudioUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [tags, setTags] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // Validate inputs
    if (!file || !latitude || !longitude || !tags) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsUploading(false);
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("audio", file);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("tags", tags);

    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // If the upload is successful, show a success toast
      toast({
        title: "Success",
        description: "Audio file uploaded successfully!",
        action: <ToastAction altText="View uploads">View uploads</ToastAction>,
      });

      // Reset form
      setFile(null);
      setLatitude("");
      setLongitude("");
      setTags("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // If there's an error, show an error toast
      toast({
        title: "Error",
        description: "Failed to upload audio file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">Upload Audio File</h2>

      <div>
        <Label htmlFor="audio-file">Audio File</Label>
        <Input
          id="audio-file"
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          id="latitude"
          type="number"
          step="any"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
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
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Enter longitude"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="tags">Tags</Label>
        <Textarea
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
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
