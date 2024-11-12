import AudioUploadForm from "@/components/upload";

export default function AudioUploadPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Upload New Audio</h1>
      <AudioUploadForm />
    </main>
  );
}
