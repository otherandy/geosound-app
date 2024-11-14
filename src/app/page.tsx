import AudioDataGlobe from "@/components/data-globe";
import AudioUploadForm from "@/components/upload";

export default function Home() {
  return (
    <main className="mt-8 mx-auto flex items-center flex-col gap-8">
      <AudioDataGlobe />
      <AudioUploadForm />
    </main>
  );
}
