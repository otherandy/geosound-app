import AudioDataTable from "@/components/data-table";
import { DataMap } from "@/components/maps";

export default async function AudioDataPage() {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/audio");
  const audioData = await response.json();

  return (
    <main>
      <DataMap data={audioData} />
      <div className="container mx-auto py-8 px-2">
        <AudioDataTable data={audioData} />
      </div>
    </main>
  );
}
