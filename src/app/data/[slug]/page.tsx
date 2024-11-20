import { NavBar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/audio/" + slug
  );

  const data = await response.json();

  const source = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/audio/" + slug + "?download=true"
  );

  return (
    <>
      <NavBar />
      <main className="container p-8 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{data.filename}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <Label>Latitude</Label>
              <Input value={data.latitude} readOnly />
            </div>
            <div>
              <Label>Longitude</Label>
              <Input value={data.longitude} readOnly />
            </div>
            <div>
              <Label>Loudness</Label>
              <Input value={data.loudness} readOnly />
            </div>
            <div>
              <Label>Tags</Label>
              <div className="mt-1">
                {data.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="mr-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <audio controls>
              <source src={source.url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
