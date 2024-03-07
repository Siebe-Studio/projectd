import Link from "next/link";
import { Button } from "~/components/ui/button";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <p className="text-3xl">Dashboard</p>
      <Button>
        <Link href={`/dashboard/producten`}>producten</Link>
      </Button>
    </main>
  );
}
