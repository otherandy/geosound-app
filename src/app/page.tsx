import AudioDataGlobe from "@/components/data-globe";
import AudioUploadForm from "@/components/upload";

export default async function Home() {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/audio");
  const audioData = await response.json();

  return (
    <main className="mb-8 mx-auto flex items-center flex-col gap-8">
      <AudioDataGlobe data={audioData} />
      <AudioUploadForm />
    </main>
  );
}
