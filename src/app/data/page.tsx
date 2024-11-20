import { NavBar } from "@/components/navbar";
import { DataMap } from "@/components/maps";
import AudioDataTable from "@/components/data-table";

export default async function DataPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search = await searchParams;

  const latitude = search?.latitude;
  const longitude = search?.longitude;
  const radius = search?.radius;

  let response;

  if (latitude && longitude && radius) {
    response = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `/audio?latitude=${latitude}&longitude=${longitude}&radius=${radius}`
    );
  } else {
    response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/audio");
  }

  const audioData = await response.json();

  return (
    <>
      <NavBar />
      <main>
        <DataMap
          data={audioData}
          circle={{
            latitude: parseFloat(latitude as string),
            longitude: parseFloat(longitude as string),
            radius: parseFloat(radius as string),
          }}
        />
        <div className="container mx-auto py-8 px-2">
          <AudioDataTable data={audioData} />
        </div>
      </main>
    </>
  );
}
