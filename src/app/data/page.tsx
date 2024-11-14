import AudioDataMap from "@/components/data-map";
import AudioDataTable from "@/components/data-table";

export default function AudioDataPage() {
  return (
    <main>
      <AudioDataMap />
      <div className="container mx-auto pt-8 px-2">
        <AudioDataTable />
      </div>
    </main>
  );
}
