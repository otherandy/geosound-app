import AudioDataGlobe from "@/components/data-globe";
import AudioUploadForm from "@/components/upload";

export default async function Home() {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/audio");
  const audioData = await response.json();

  return (
    <main className="my-8 mx-auto flex items-center justify-center gap-8 flex-col xl:flex-row-reverse">
      <AudioDataGlobe data={audioData} />
      <div className="flex flex-col items-center gap-4">
        <AudioUploadForm />
      </div>
    </main>
  );
}
